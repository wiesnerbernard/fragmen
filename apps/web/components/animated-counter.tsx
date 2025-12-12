'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  countDown?: boolean;
}

export function AnimatedCounter({
  value,
  suffix = '',
  duration = 2,
  countDown = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(countDown ? 100 : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(
    () =>
      springValue.on('change', latest => {
        if (ref.current) {
          ref.current.textContent =
            Math.floor(latest).toLocaleString() + suffix;
        }
      }),
    [springValue, suffix]
  );

  return <motion.div ref={ref} />;
}

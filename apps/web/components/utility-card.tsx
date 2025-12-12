'use client';

import { FavoriteButton } from '@/components/favorite-button';
import { Badge } from '@/components/ui/badge';
import { STATUS_VARIANTS, UTILITY_STATUS } from '@/config/utility-status';
import type { RegistryItem } from '@/lib/registry';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface UtilityCardProps {
  item: RegistryItem;
  showCategory?: boolean;
}

export function UtilityCard({ item, showCategory = true }: UtilityCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        href={`/utilities/${item.slug}`}
        className="group block rounded-lg border border-border/60 bg-background p-5 transition-all hover:bg-secondary/40 hover:shadow-lg"
      >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {showCategory && (
            <span className="inline-flex items-center rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
              {item.category}
            </span>
          )}
          {UTILITY_STATUS[item.slug as keyof typeof UTILITY_STATUS] && (
            <Badge
              variant={
                STATUS_VARIANTS[
                  UTILITY_STATUS[item.slug as keyof typeof UTILITY_STATUS]
                ]
              }
            >
              {UTILITY_STATUS[item.slug as keyof typeof UTILITY_STATUS]}
            </Badge>
          )}
        </div>
        <FavoriteButton slug={item.slug} />
      </div>
      <h3 className="mb-2 text-lg font-semibold group-hover:text-foreground transition-colors">
        {item.name}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {item.description || 'No description available'}
      </p>
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="inline-block rounded-full bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      </Link>
    </motion.div>
  );
}

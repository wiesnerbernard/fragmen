import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Icon generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'system-ui',
        }}
      >
        F
      </div>
    ),
    {
      ...size,
    }
  );
}

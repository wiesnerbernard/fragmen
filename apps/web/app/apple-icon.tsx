import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// Apple icon generation (for iOS home screen)
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 90,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'system-ui',
        borderRadius: '20%',
      }}
    >
      F
    </div>,
    {
      ...size,
    }
  );
}

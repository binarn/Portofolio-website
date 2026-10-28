import React from 'react';

interface AsteriskLogoProps {
  color?: 'black' | 'white' | 'orange';
  size?: number | string;
  className?: string;
  interactive?: boolean;
}

export const AsteriskLogo: React.FC<AsteriskLogoProps> = ({
  color = 'white',
  size = 48,
  className = '',
  interactive = false,
}) => {
  // Use the exact asset paths uploaded by the user
  const assetSrc =
    color === 'black'
      ? '/assets/aistudio/logo_black_7cdc4874.png'
      : '/assets/aistudio/logo_27f2efb4.png';

  return (
    <div
      className={`inline-flex items-center justify-center transition-transform duration-300 ${
        interactive ? 'hover:scale-105 active:scale-95 cursor-pointer' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={assetSrc}
        alt="Binar Najmuddin Asterisk Logo"
        className={`w-full h-full object-contain select-none ${
          color === 'orange' ? 'filter hue-rotate-15 contrast-125' : ''
        }`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/images/floral_fallback.svg',
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // Normalize any leftover /src/assets paths to public /images paths defensively
  const getNormalizedSrc = (inputSrc?: string) => {
    if (!inputSrc) return fallbackSrc;
    if (inputSrc.includes('hero_luxury_floral')) return '/images/hero/hero_luxury_floral.jpg';
    if (inputSrc.includes('product_rose_bouquet')) return '/images/bouquets/rose_bouquet.jpg';
    if (inputSrc.includes('product_sunflower_bouquet')) return '/images/bouquets/sunflower_bouquet.jpg';
    if (inputSrc.includes('product_chocolate_hamper')) return '/images/hampers/chocolate_hamper.jpg';
    if (inputSrc.includes('craft_studio_anya')) return '/images/gallery/craft_studio_anya.jpg';
    if (inputSrc.includes('image_cab25869.png') || inputSrc.includes('logo')) return '/images/branding/logo.png';
    return inputSrc;
  };

  const currentSrc = hasError ? fallbackSrc : getNormalizedSrc(src);

  return (
    <img
      src={currentSrc}
      alt={alt || 'Blooms by Anya'}
      className={className}
      onError={(e) => {
        if (!hasError) {
          setHasError(true);
        }
        if (onError) onError(e);
      }}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};

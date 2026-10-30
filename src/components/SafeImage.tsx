import React, { useState } from 'react';
import { BRAND_CONFIG } from '../config/brand';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  showFallbackBadge?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Blooms by Anya Arrangement',
  className = '',
  fallbackSrc = BRAND_CONFIG.assets.fallback,
  showFallbackBadge = false,
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
    }
    if (onError) {
      onError(e);
    }
  };

  const currentSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading shimmer placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#F7F1E7] animate-pulse" />
      )}

      <img
        {...props}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded || hasError ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        referrerPolicy="no-referrer"
      />

      {hasError && showFallbackBadge && (
        <div className="absolute bottom-2 right-2 bg-[#303A2B]/80 text-[#D8C8A5] text-[10px] px-2 py-0.5 rounded backdrop-blur-xs font-mono">
          Handcrafted
        </div>
      )}
    </div>
  );
};

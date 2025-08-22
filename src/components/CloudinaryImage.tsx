import React, { useState, useEffect } from 'react';
import { getImageUrl, getPublicIdFromUrl } from '../utils/cloudinary';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  crop?: 'fill' | 'crop' | 'scale' | 'thumb' | 'fit';
  quality?: number | 'auto';
  loading?: 'lazy' | 'eager';
  placeholder?: boolean;
  sizes?: string;
  effect?: string;
  fallbackSrc?: string;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * CloudinaryImage component for optimized image loading from Cloudinary
 * 
 * Usage examples:
 * 1. With direct Cloudinary URL:
 *    <CloudinaryImage src="https://res.cloudinary.com/dedmtl2ze/image/upload/v1234567890/portfolio/image.jpg" alt="Description" />
 * 
 * 2. With public ID:
 *    <CloudinaryImage src="portfolio/image" alt="Description" width={500} height={300} crop="fill" />
 * 
 * 3. With responsive sizing:
 *    <CloudinaryImage 
 *      src="portfolio/image" 
 *      alt="Description" 
 *      sizes="(max-width: 768px) 100vw, 50vw" 
 *      placeholder={true} 
 *    />
 */
const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  crop = 'fill',
  quality = 'auto',
  loading = 'lazy',
  placeholder = false,
  sizes = '100vw',
  effect,
  fallbackSrc = '/images/placeholder.svg'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Determine if the source is a full URL or just a public ID
  const isFullUrl = src.startsWith('http');
  const publicId = isFullUrl ? getPublicIdFromUrl(src) : src;
  
  // Generate responsive image srcset for different viewport widths
  const generateSrcSet = () => {
    if (!publicId) return '';
    
    const breakpoints = [320, 640, 768, 1024, 1280, 1536, 1920];
    return breakpoints
      .map(bpWidth => {
        const url = getImageUrl(publicId, { 
          width: bpWidth, 
          height: height ? Math.round(height * (bpWidth / (width || 1000))) : undefined,
          crop, 
          quality, 
          effect,
          loading
        });
        return `${url} ${bpWidth}w`;
      })
      .join(', ');
  };
  
  // Get the base image URL with low quality placeholder if needed
  const baseImageUrl = publicId ? 
    getImageUrl(publicId, { 
      width, 
      height, 
      crop, 
      quality, 
      effect,
      loading,
      placeholder: placeholder && !isLoaded
    }) : '';
    
  // Handle image load error
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load Cloudinary image:', src);
    setError(true);
    if (fallbackSrc) {
      (e.target as HTMLImageElement).src = fallbackSrc;
    }
  };

  // Add support for onLoad callback
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    // Forward onLoad event if provided as prop
    if (props.onLoad) {
      props.onLoad(e);
    }
  };

  return (
    <img
      src={error ? fallbackSrc : baseImageUrl}
      srcSet={!error ? generateSrcSet() : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${!isLoaded && placeholder ? 'blur-sm' : ''}`}
      loading={loading}
      decoding="async"
      fetchPriority={loading === 'eager' ? 'high' : 'auto'}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default CloudinaryImage;
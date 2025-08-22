/**
 * Utility functions to help optimize images across the application
 */

/**
 * Converts a regular image URL to a Cloudinary URL if it's not already one
 * @param url Original image URL
 * @param options Options for Cloudinary transformation
 * @returns Optimized Cloudinary URL or original URL if conversion not possible
 */
export const optimizeImageUrl = (url: string, options: {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: string;
} = {}): string => {
  // If already a Cloudinary URL, return as is
  if (url.includes('res.cloudinary.com')) {
    return url;
  }
  
  // For local images, we can't directly use Cloudinary without uploading
  // But we can apply some best practices
  if (url.startsWith('/')) {
    // For local images, we can't do much without uploading to Cloudinary
    // Return the original URL
    return url;
  }
  
  // For external images, we could potentially use Cloudinary fetch URLs
  // but this requires proper Cloudinary configuration and may have limitations
  return url;
};

/**
 * Determines if an image should be lazy loaded based on its position
 * @param index Position index of the image in a list
 * @param threshold Number of images to eagerly load before lazy loading
 * @returns 'eager' or 'lazy' loading strategy
 */
export const getLoadingStrategy = (index: number, threshold: number = 3): 'eager' | 'lazy' => {
  return index < threshold ? 'eager' : 'lazy';
};

/**
 * Generates appropriate sizes attribute for responsive images
 * @param containerClass The CSS class of the container
 * @returns Sizes attribute string
 */
export const getResponsiveSizes = (containerClass: string): string => {
  switch (containerClass) {
    case 'full-width':
      return '100vw';
    case 'half-width':
      return '(max-width: 768px) 100vw, 50vw';
    case 'third-width':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'quarter-width':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw';
    default:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
};
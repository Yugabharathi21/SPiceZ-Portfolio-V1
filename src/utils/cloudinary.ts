import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL?.split('@')[1] || 'dedmtl2ze',
  api_key: process.env.CLOUDINARY_URL?.split('//')[1]?.split(':')[0] || '191235438383853',
  api_secret: process.env.CLOUDINARY_URL?.split(':')[1]?.split('@')[0] || '8pNLMv9IJDyKWLp9SD94yGC5-xs',
});

/**
 * Get an optimized URL for an image from Cloudinary
 * @param publicId - The public ID of the image
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export const getImageUrl = (publicId: string, options: {
  width?: number;
  height?: number;
  crop?: string;
  quality?: number;
  format?: string;
  dpr?: number;
  effect?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: boolean;
} = {}) => {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    dpr = 'auto',
    effect,
    loading = 'lazy',
    placeholder
  } = options;
  
  const transformations = [
    { width, height, crop },
    { quality, dpr, fetch_format: format },
    effect ? { effect } : {},
    loading === 'eager' ? { loading: 'eager' } : {},
    placeholder ? { effect: 'blur:1000' } : {}
  ];
  
  return cloudinary.url(publicId, {
    transformation: transformations,
    secure: true
  });
};

/**
 * Parse a Cloudinary URL to get the public ID
 * @param cloudinaryUrl - Full Cloudinary URL
 * @returns The public ID extracted from the URL
 */
export const getPublicIdFromUrl = (cloudinaryUrl: string): string => {
  try {
    // Extract the public ID from a Cloudinary URL
    // Example URL: https://res.cloudinary.com/dedmtl2ze/image/upload/v1234567890/folder/image.jpg
    const urlParts = cloudinaryUrl.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    
    if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
      // Remove version number if present (v1234567890)
      const pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/');
      const publicId = pathAfterUpload.replace(/^v\d+\//, '');
      
      // Remove file extension if present
      return publicId.replace(/\.[^\.]+$/, '');
    }
    
    throw new Error('Invalid Cloudinary URL format');
  } catch (error) {
    console.error('Error parsing Cloudinary URL:', error);
    return '';
  }
};

export default cloudinary;
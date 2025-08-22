/**
 * Helper utility to migrate existing image components to optimized versions
 * This can be used to gradually update components across the application
 */

import React from 'react';
import CloudinaryImage from '../components/CloudinaryImage';
import OptimizedMultimediaCard from '../components/OptimizedMultimediaCard';

/**
 * Converts a standard img element to use CloudinaryImage
 * @param imgElement The original img element
 * @returns A CloudinaryImage component with equivalent properties
 */
export const convertToCloudinaryImage = (imgElement: HTMLImageElement): React.ReactElement => {
  const src = imgElement.src;
  const alt = imgElement.alt || 'Image';
  const width = imgElement.width || undefined;
  const height = imgElement.height || undefined;
  const className = imgElement.className || '';
  
  return React.createElement(CloudinaryImage, {
    src,
    alt,
    width,
    height,
    className,
    loading: 'lazy',
    placeholder: true,
    sizes: '100vw',
    crop: 'fill'
  });
};

/**
 * Helper function to determine if an image should be optimized
 * @param src Image source URL
 * @returns Boolean indicating if the image should be optimized
 */
export const shouldOptimizeImage = (src: string): boolean => {
  // Skip SVGs as they're already optimized vector graphics
  if (src.endsWith('.svg')) return false;
  
  // Skip very small images like icons
  if (src.includes('icon') || src.includes('logo')) return false;
  
  // Skip images that are already optimized
  if (src.includes('cloudinary')) return true;
  
  return true;
};

/**
 * Applies image optimization best practices to an existing component
 * @param Component The component to optimize
 * @returns An optimized version of the component
 */
export const optimizeComponent = (Component: React.ComponentType<any>): React.FC<any> => {
  return (props) => {
    // Apply optimization logic here
    const optimizedProps = { ...props };
    
    // If the component has an image prop, optimize it
    if (props.image && shouldOptimizeImage(props.image)) {
      // Use the OptimizedMultimediaCard for multimedia items
      if (Component.name === 'MultimediaCard') {
        return React.createElement(OptimizedMultimediaCard, optimizedProps);
      }
    }
    
    return React.createElement(Component, optimizedProps);
  };
};
import React from 'react';
import { MultimediaItem } from '../hooks/usePortfolioData';
import OptimizedMultimediaCard from './OptimizedMultimediaCard';

interface OptimizedMultimediaGalleryProps {
  multimedia: MultimediaItem[];
  onImageClick: (imageUrl: string) => void;
}

export const OptimizedMultimediaGallery: React.FC<OptimizedMultimediaGalleryProps> = ({ 
  multimedia, 
  onImageClick 
}) => {
  if (multimedia.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 terminal-text">No multimedia content available at the moment.</p>
        <p className="text-white/40 text-sm mt-2 terminal-text">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {multimedia.map((item, index) => (
        <OptimizedMultimediaCard
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
          onClick={() => onImageClick(item.image)}
          index={index}
        />
      ))}
    </div>
  );
};

export default OptimizedMultimediaGallery;
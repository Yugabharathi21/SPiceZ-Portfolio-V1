import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CloudinaryImage from './CloudinaryImage';
import { getLoadingStrategy, getResponsiveSizes } from '../utils/imageOptimizer';

interface OptimizedMultimediaCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
  index?: number;
}

const OptimizedMultimediaCard: React.FC<OptimizedMultimediaCardProps> = ({ 
  title, 
  description, 
  image, 
  onClick,
  index = 0
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const loadingStrategy = getLoadingStrategy(index);
  const sizes = getResponsiveSizes('third-width');

  return (
    <motion.div
      className="terminal-window overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="relative aspect-video w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin"></div>
          </div>
        )}
        
        <CloudinaryImage
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={loadingStrategy}
          sizes={sizes}
          crop="fill"
          placeholder={true}
          fallbackSrc="/images/multimedia/placeholder.svg"
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-medium mb-1 terminal-text">{title}</h3>
          <p className="text-white/80 text-sm terminal-text line-clamp-2">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OptimizedMultimediaCard;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MultimediaItem } from '../hooks/usePortfolioData';

interface MultimediaCardProps {
  item: MultimediaItem;
  index: number;
  onImageClick: (imageUrl: string) => void;
}

const MultimediaCard: React.FC<MultimediaCardProps> = ({ item, index, onImageClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="terminal-window overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300"
      onClick={() => onImageClick(item.image)}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/multimedia/placeholder.svg';
            setImageLoaded(true);
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-medium mb-1 terminal-text text-sm">{item.title}</h3>
          <p className="text-white/80 text-xs terminal-text line-clamp-2">{item.description}</p>
        </div>
        
        {/* Click indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 bg-emerald-400/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-emerald-400 text-xs">+</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface MultimediaGalleryProps {
  multimedia: MultimediaItem[];
  onImageClick: (imageUrl: string) => void;
}

export const MultimediaGallery: React.FC<MultimediaGalleryProps> = ({ multimedia, onImageClick }) => {
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
        <MultimediaCard
          key={index}
          item={item}
          index={index}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  );
};

export default MultimediaCard;

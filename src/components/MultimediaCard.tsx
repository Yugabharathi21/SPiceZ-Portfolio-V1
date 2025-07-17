import { motion } from 'framer-motion';

interface MultimediaCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

const MultimediaCard = ({ title, description, image, onClick }: MultimediaCardProps) => {
  return (
    <motion.div
      className="terminal-window overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="relative aspect-video w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.log('🖼️ Multimedia image failed to load:', target.src);
            // Use placeholder if image fails to load
            target.src = '/images/multimedia/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-medium mb-1 terminal-text">{title}</h3>
          <p className="text-white/80 text-sm terminal-text line-clamp-2">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MultimediaCard; 
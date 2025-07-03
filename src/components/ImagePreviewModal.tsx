import { FC, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ImagePreviewModalProps {
  image: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreviewModal: FC<ImagePreviewModalProps> = memo(({ image, title, isOpen, onClose }) => {
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full bg-black/50 p-2 rounded-lg overflow-hidden"
          >
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-auto object-contain rounded"
              onError={() => {
                console.warn('Failed to load image in preview modal:', image);
                // Image will show broken image icon, which is fine for preview
              }}
            />
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 rounded-full p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              aria-label="Close preview"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ImagePreviewModal.displayName = 'ImagePreviewModal';

export default ImagePreviewModal; 
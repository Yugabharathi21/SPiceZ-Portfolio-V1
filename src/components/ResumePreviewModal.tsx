import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumePreviewModal = ({ isOpen, onClose }: ResumePreviewModalProps) => {
  const resumeImagePath = '/documents/resume.jpg';
  const resumePdfPath = '/documents/resume.pdf';
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdfPath;
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-black/50 rounded-lg overflow-hidden terminal-window flex flex-col ${isFullscreen
                ? 'fixed inset-0 m-0'
                : 'w-full h-full md:h-[90vh] md:w-[90vw] max-w-7xl m-0 md:m-4'
              }`}
          >
            {/* Terminal Header */}
            <div className="absolute top-0 left-0 w-full h-8 bg-black/50 border-b border-white/10 flex items-center justify-between px-4 z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-white/50 text-xs ml-4 terminal-text">resume@user:~$ display resume.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="text-white/80 hover:text-white p-1 rounded-full transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white p-1 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="flex-1 mt-8 p-4 overflow-hidden flex flex-col items-center">
              <div className="w-full h-full bg-white/5 rounded-lg overflow-hidden flex flex-col items-center justify-center relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="animate-pulse text-emerald-400">Loading preview...</div>
                  </div>
                )}

                <img
                  src={resumeImagePath}
                  alt="Resume Preview"
                  onLoad={() => setImageLoaded(true)}
                  className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 flex justify-end gap-4 border-t border-white/10 bg-black/30">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all rounded-md"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download PDF</span>
              </button>
              <a
                href={resumeImagePath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all rounded-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Open in New Tab</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumePreviewModal; 
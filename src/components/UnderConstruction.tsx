import { motion } from 'framer-motion';
import { Terminal, Construction, Github, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const UnderConstruction = () => {
  const [text, setText] = useState('');
  const fullText = '[system@local] Initializing portfolio system...';
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setText(currentText);
        currentIndex++;
        setTimeout(typeText, 50);
      } else {
        setTimeout(() => setShowContent(true), 500);
      }
    };

    typeText();
  }, []);

  return (
    <div className="min-h-screen bg-black pixel-bg flex items-center justify-center p-4">
      <motion.div
        className="terminal-window w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal Header */}
        <div className="h-8 bg-black/50 border-b border-white/10 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="text-white/50 text-xs ml-4 terminal-text">maintenance@user:~</span>
        </div>

        <div className="p-6 space-y-4">
          {/* Initial Loading Text */}
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 terminal-text">{text}</span>
            <span className="animate-pulse">▊</span>
          </div>

          {/* Content that appears after typing */}
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* ASCII Art */}
              <pre className="text-emerald-400/80 text-xs sm:text-sm font-mono leading-tight">
                {`
_______     _______     ____     _______     _______     _______
7     7     7     7     7  7     7     7     7     7     7     7
|  ___!     |  -  |     |  |     |  ___!     |  ___!     !___  |
!__   7     |  ___!     |  |     |  7___     |  __|_     |   __!
7     |     |  7        |  |     |     7     |     7     |     7
!_____!     !__!        !__!     !_____!     !_____!     !_____!
                                                                
`}
              </pre>

              {/* Status Messages */}
              <div className="space-y-2 terminal-text">
                <div className="flex items-center gap-2 text-white/70">
                  <Construction className="w-4 h-4 text-yellow-500" />
                  <span>System Status: Under Maintenance</span>
                </div>
                <p className="text-white/60">
                  <span className="text-emerald-400">$</span> Upgrading portfolio components...
                </p>
                <p className="text-white/60">
                  <span className="text-emerald-400">$</span> Expected completion: Coming Soon™
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-400/50"
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
                <p className="text-white/40 text-sm terminal-text text-right">System upgrade: 70%</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 pt-4">
                <p className="text-white/60 terminal-text">Meanwhile, you can reach me at:</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    target="_self"
                    rel="noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:email@example.com"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Fun Terminal Commands */}
              <div className="space-y-2 pt-4">
                <p className="text-white/40 terminal-text">Try running:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="terminal-badge">
                    <span className="text-emerald-400">$</span> npm run patience
                  </span>
                  <span className="terminal-badge">
                    <span className="text-emerald-400">$</span> sudo make coffee
                  </span>
                </div>
              </div>

              {/* Footer Message */}
              <p className="text-xs text-white/40 terminal-text pt-4">
                [Process running] - Estimated time remaining: Soon™
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction; 
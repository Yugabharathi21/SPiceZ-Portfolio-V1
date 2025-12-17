import { motion } from 'framer-motion';
import React from 'react';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiSharp,
  SiHtml5,
  SiCss3,
  SiLua,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiGit
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// Language logos mapping
const languages = [
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Java', icon: FaJava, color: '#007396' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'C#', icon: SiSharp, color: '#239120' },
  { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss3, color: '#1572B6' },
  { name: 'Lua', icon: SiLua, color: '#2C2D72' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Git', icon: SiGit, color: '#F05032' }
];

// Duplicate for seamless loop
const allLanguages = [...languages, ...languages];

const LanguagesMarquee: React.FC = () => {
  return (
    <div className="relative w-full py-8 overflow-hidden bg-gradient-to-r from-black via-neutral-900/95 to-black border-y border-white/5">
      {/* Glass grain effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-40 mix-blend-overlay"></div>

      {/* Fade overlay */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

      {/* Marquee content */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap px-8"
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }
          }}
        >
          {allLanguages.map((lang, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-12 h-12 flex items-center justify-center p-2 bg-neutral-900/50 rounded-xl border border-white/5 group-hover:border-emerald-500/30 transition-all duration-300 group-hover:bg-neutral-800/80 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <lang.icon
                  className="w-full h-full transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
                  style={{ color: lang.color }} // Note: color will only apply when grayscale is removed via CSS if we use currentcolor, but here we set explicit color. 
                // To make grayscale work we can rely on parent class or just toggle color. 
                // Let's use specific logic or just let the group-hover work. 
                // Actually simplest is forcing the color on hover.
                />
              </div>
              <span className="text-xs font-mono text-neutral-500 group-hover:text-emerald-400 transition-colors mt-3 tracking-wider">{lang.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LanguagesMarquee;

import { motion } from 'framer-motion';
import React from 'react';

// Import language logos
const languages = [
  { name: 'TypeScript', logo: '/node_modules/programming-languages-logos/src/typescript/typescript.svg' },
  { name: 'JavaScript', logo: '/node_modules/programming-languages-logos/src/javascript/javascript.svg' },
  { name: 'Python', logo: '/node_modules/programming-languages-logos/src/python/python.svg' },
  { name: 'Java', logo: '/node_modules/programming-languages-logos/src/java/java.svg' },
  { name: 'C++', logo: '/node_modules/programming-languages-logos/src/cpp/cpp.svg' },
  { name: 'C#', logo: '/node_modules/programming-languages-logos/src/csharp/csharp.svg' },
  { name: 'HTML', logo: '/node_modules/programming-languages-logos/src/html/html.svg' },
  { name: 'CSS', logo: '/node_modules/programming-languages-logos/src/css/css.svg' },
  { name: 'Lua', logo: '/node_modules/programming-languages-logos/src/lua/lua.svg' },
  { name: 'TypeScript', logo: '/node_modules/programming-languages-logos/src/typescript/typescript.svg' },
  { name: 'JavaScript', logo: '/node_modules/programming-languages-logos/src/javascript/javascript.svg' },
  { name: 'Python', logo: '/node_modules/programming-languages-logos/src/python/python.svg' },
  { name: 'Java', logo: '/node_modules/programming-languages-logos/src/java/java.svg' },
  { name: 'C++', logo: '/node_modules/programming-languages-logos/src/cpp/cpp.svg' },
  { name: 'C#', logo: '/node_modules/programming-languages-logos/src/csharp/csharp.svg' },
  { name: 'HTML', logo: '/node_modules/programming-languages-logos/src/html/html.svg' },
  { name: 'CSS', logo: '/node_modules/programming-languages-logos/src/css/css.svg' },
  { name: 'Lua', logo: '/node_modules/programming-languages-logos/src/lua/lua.svg' },
  { name: 'TypeScript', logo: '/node_modules/programming-languages-logos/src/typescript/typescript.svg' },
  { name: 'JavaScript', logo: '/node_modules/programming-languages-logos/src/javascript/javascript.svg' },
  { name: 'Python', logo: '/node_modules/programming-languages-logos/src/python/python.svg' },
  { name: 'Java', logo: '/node_modules/programming-languages-logos/src/java/java.svg' },
  { name: 'C++', logo: '/node_modules/programming-languages-logos/src/cpp/cpp.svg' },
  { name: 'C#', logo: '/node_modules/programming-languages-logos/src/csharp/csharp.svg' },
  { name: 'HTML', logo: '/node_modules/programming-languages-logos/src/html/html.svg' },
  { name: 'CSS', logo: '/node_modules/programming-languages-logos/src/css/css.svg' },
  { name: 'Lua', logo: '/node_modules/programming-languages-logos/src/lua/lua.svg' }
];

const LanguagesMarquee: React.FC = () => {
  return (
    <div className="relative w-full py-4 overflow-hidden bg-gradient-to-r from-black via-neutral-900/95 to-black">
      {/* Glass grain effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-40 mix-blend-overlay"></div>
      
      {/* Fade overlay */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
      
      {/* Marquee content */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }
          }}
        >
          {/* First set of logos */}
          {languages.map((lang, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center p-1 bg-neutral-900/50 rounded-lg">
                <img 
                  src={lang.logo} 
                  alt={`${lang.name} logo`} 
                  className="w-8 h-8 object-contain filter brightness-90 hover:brightness-110 transition-all"
                />
              </div>
              <span className="text-[10px] font-mono text-neutral-400/80 hover:text-neutral-300 transition-colors mt-1">{lang.name}</span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {languages.map((lang, index) => (
            <div key={`duplicate-${index}`} className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center p-1 bg-neutral-900/50 rounded-lg">
                <img 
                  src={lang.logo} 
                  alt={`${lang.name} logo`} 
                  className="w-8 h-8 object-contain filter brightness-90 hover:brightness-110 transition-all"
                />
              </div>
              <span className="text-[10px] font-mono text-neutral-400/80 hover:text-neutral-300 transition-colors mt-1">{lang.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LanguagesMarquee;

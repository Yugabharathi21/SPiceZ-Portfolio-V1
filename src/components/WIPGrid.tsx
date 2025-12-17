import React from 'react';
import { motion } from 'framer-motion';
import { Github, Clock, Code } from 'lucide-react';
import { WIPProject } from '../hooks/usePortfolioData';

interface WIPCardProps {
  project: WIPProject;
  index: number;
}

const WIPCard: React.FC<WIPCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="terminal-window overflow-hidden group relative"
    >
      {/* WIP Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 py-1 flex items-center gap-2">
          <Clock className="w-3 h-3 text-yellow-400" />
          <span className="text-yellow-400 text-xs font-medium terminal-text">WIP</span>
        </div>
      </div>

      {/* Terminal Header */}
      <div className="absolute top-0 left-0 w-full h-6 bg-black/50 border-b border-white/10 flex items-center px-3 z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-white/50 text-xs ml-3 terminal-text">
          wip@user:~$ progress {project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
        </span>
      </div>

      {/* Project Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.log('🖼️ WIP image failed to load:', target.src);
            // If GitHub raw URL fails, use placeholder directly
            if (!target.src.includes('placeholder')) {
              target.src = '/images/project/placeholder.svg';
              console.log('🔄 Using WIP placeholder');
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Progress overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white text-xl font-medium line-clamp-1 flex-1">{project.title}</h3>
        </div>

        <p className="text-white/70 text-sm mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="text-xs px-2 py-1 rounded-sm bg-yellow-900/20 text-yellow-400 border border-yellow-400/20 terminal-text"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-xs terminal-text">Development Progress</span>
            <span className="text-yellow-400 text-xs terminal-text">In Progress</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-yellow-400 transition-colors duration-200 group/link"
            >
              <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-200" />
              <span className="text-sm terminal-text">View Progress</span>
            </a>
          )}
          <div className="flex items-center gap-2 text-white/60">
            <Code className="w-4 h-4" />
            <span className="text-sm terminal-text">Coming Soon</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface WIPGridProps {
  wipProjects: WIPProject[];
}

export const WIPGrid: React.FC<WIPGridProps> = ({ wipProjects }) => {
  // Safety check to ensure wipProjects is always an array
  const safeWipProjects = Array.isArray(wipProjects) ? wipProjects : [];

  if (safeWipProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 terminal-text">No work-in-progress projects at the moment.</p>
        <p className="text-white/40 text-sm mt-2 terminal-text">Stay tuned for upcoming projects!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {safeWipProjects.map((project, index) => (
        <WIPCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default WIPCard;
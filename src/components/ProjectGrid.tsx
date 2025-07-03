import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../hooks/usePortfolioData';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="terminal-window overflow-hidden group"
      whileHover={{ scale: 1.02 }}
    >
      {/* Terminal Header */}
      <div className="absolute top-0 left-0 w-full h-6 bg-black/50 border-b border-white/10 flex items-center px-3 z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-white/50 text-xs ml-3 terminal-text">
          project@ybj:~$ view {project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
        </span>
      </div>

      {/* Project Image */}
      <div className="relative aspect-video w-full">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-project.png';
          }}
        />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-white text-xl font-medium mb-2">{project.title}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="text-xs px-2 py-1 rounded-sm bg-emerald-900/20 text-emerald-400 border border-emerald-400/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 terminal-text">No projects available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default ProjectCard;

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
}

const ProjectCard = ({ title, description, image, githubUrl, liveUrl, technologies }: ProjectCardProps) => {
  return (
    <motion.div
      className="terminal-window overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Terminal Header */}
      <div className="absolute top-0 left-0 w-full h-6 bg-black/50 border-b border-white/10 flex items-center px-3 z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-white/50 text-xs ml-3 terminal-text">project@user:~$ view {title.toLowerCase().replace(/\s+/g, '-')}</span>
      </div>

      {/* Project Image */}
      <div className="relative aspect-video w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.log('🖼️ Project image failed to load:', target.src);
            // Use placeholder if image fails to load
            target.src = '/images/project/placeholder.svg';
          }}
        />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-white text-xl font-medium mb-2">{title}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-sm bg-emerald-900/20 text-emerald-400 border border-emerald-400/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
          {liveUrl && (
            <a
              href={liveUrl}
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

export default ProjectCard; 
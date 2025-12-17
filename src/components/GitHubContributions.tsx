import React from 'react';
import { motion } from 'framer-motion';
import { Github, GitBranch, Star, GitFork, Calendar, ExternalLink, Code } from 'lucide-react';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_contributions?: number;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

const GitHubContributions: React.FC = () => {
  // Mock data for GitHub stats
  const stats: GitHubStats = {
    public_repos: 24,
    followers: 156,
    following: 32,
    total_contributions: 1845
  };

  const repos: Repository[] = [
    {
      id: 1,
      name: "portfolio-v2",
      description: "A modern, cyberpunk-themed portfolio website built with React and Tailwind CSS.",
      html_url: "#",
      language: "TypeScript",
      stargazers_count: 45,
      forks_count: 12,
      updated_at: "2024-03-15T10:00:00Z",
      topics: ["react", "tailwindcss", "framer-motion"]
    },
    {
      id: 2,
      name: "ai-code-assistant",
      description: "VS Code extension that uses AI to suggest code improvements and refactoring.",
      html_url: "#",
      language: "TypeScript",
      stargazers_count: 128,
      forks_count: 34,
      updated_at: "2024-03-10T14:30:00Z",
      topics: ["vscode-extension", "ai", "openai"]
    },
    {
      id: 3,
      name: "ecommerce-api",
      description: "Scalable REST API for e-commerce platforms using Node.js and PostgreSQL.",
      html_url: "#",
      language: "JavaScript",
      stargazers_count: 89,
      forks_count: 23,
      updated_at: "2024-03-05T09:15:00Z",
      topics: ["nodejs", "express", "postgresql"]
    },
    {
      id: 4,
      name: "algo-visualizer",
      description: "Interactive visualization of common sorting and graph algorithms.",
      html_url: "#",
      language: "React",
      stargazers_count: 210,
      forks_count: 56,
      updated_at: "2024-02-28T16:45:00Z",
      topics: ["algorithms", "visualization", "education"]
    },
    {
      id: 5,
      name: "weather-cli",
      description: "Command-line tool to fetch weather forecasts for any location.",
      html_url: "#",
      language: "Go",
      stargazers_count: 67,
      forks_count: 8,
      updated_at: "2024-02-20T11:20:00Z",
      topics: ["cli", "golang", "weather"]
    },
    {
      id: 6,
      name: "chat-app-realtime",
      description: "Real-time chat application using WebSocket and Redis.",
      html_url: "#",
      language: "Python",
      stargazers_count: 95,
      forks_count: 18,
      updated_at: "2024-02-15T13:10:00Z",
      topics: ["websocket", "redis", "django"]
    }
  ];

  const username = 'octocat';
  const loading = false;
  const error = null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C++': '#f34b7d',
      'C#': '#239120',
      'HTML': '#e34c26',
      'CSS': '#1572B6',
      'Lua': '#000080',
      'React': '#61dafb',
    };
    return colors[language] || '#8b949e';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section id="github" className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Github className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <span className="ml-4 text-white/60 terminal-text">Fetching GitHub data...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-400/30 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <Github className="w-6 h-6" />
              <span className="text-lg terminal-text">GitHub Connection Failed</span>
            </div>
            <p className="text-red-300/80 terminal-text">{error}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative">
      <div className="">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-emerald-400 text-lg">$</span>
            <h2 className="text-3xl font-bold text-white">GitHub Activity</h2>
            <span className="animate-pulse text-emerald-400/50">▊</span>
          </div>
          <p className="text-white/60 terminal-text">Open source contributions and repository showcase</p>
        </motion.div>

        {/* Compact Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <motion.div variants={itemVariants} className="group">
            <div className="p-4 bg-black/60 backdrop-blur-sm border border-neutral-800 rounded-xl hover:border-emerald-400/40 transition-all duration-300 hover:bg-black/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-400/10 rounded-lg">
                  <Github className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs terminal-text">Repos</p>
                  <p className="text-xl font-bold text-white">{stats?.public_repos || 0}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <div className="p-4 bg-black/60 backdrop-blur-sm border border-neutral-800 rounded-xl hover:border-blue-400/40 transition-all duration-300 hover:bg-black/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-400/10 rounded-lg">
                  <Star className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs terminal-text">Followers</p>
                  <p className="text-xl font-bold text-white">{stats?.followers || 0}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <div className="p-4 bg-black/60 backdrop-blur-sm border border-neutral-800 rounded-xl hover:border-purple-400/40 transition-all duration-300 hover:bg-black/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-400/10 rounded-lg">
                  <GitBranch className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs terminal-text">Following</p>
                  <p className="text-xl font-bold text-white">{stats?.following || 0}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Compact Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="p-6 bg-black/80 backdrop-blur-sm border border-neutral-800 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-400/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Contributions</h3>
                  <p className="text-white/50 text-sm terminal-text">Past year activity</p>
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 transition-all duration-300 rounded-lg border border-emerald-400/20 text-sm"
              >
                <span className="terminal-text">View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
            <div className="bg-black/50 p-4 rounded-xl overflow-x-auto border border-neutral-900">
              <img
                src={`https://ghchart.rshah.org/00ff41/${username}`}
                alt="GitHub Contribution Graph"
                className="w-full h-auto max-w-none filter brightness-90"
                style={{ minWidth: '700px' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Compact Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-400/10 rounded-lg">
              <Code className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Recent Repositories</h3>
              <p className="text-white/50 terminal-text text-sm">Latest projects and contributions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.slice(0, 3).map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="h-full p-4 bg-black/80 backdrop-blur-sm border border-neutral-800 rounded-xl hover:border-emerald-400/30 transition-all duration-300 hover:bg-black/90">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="p-1.5 bg-emerald-400/10 rounded-lg">
                        <Github className="w-3 h-3 text-emerald-400" />
                      </div>
                      <h4 className="text-white font-medium terminal-text group-hover:text-emerald-400 transition-colors duration-300 truncate text-sm">
                        {repo.name}
                      </h4>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-emerald-400 transition-colors duration-300 flex-shrink-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </motion.a>
                  </div>

                  <p className="text-white/60 text-xs terminal-text mb-4 line-clamp-2 leading-relaxed">
                    {repo.description || 'No description available'}
                  </p>

                  {/* Compact Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          ></div>
                          <span className="text-white/50 terminal-text text-xs">{repo.language}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-yellow-400/70">
                        <Star className="w-2.5 h-2.5" />
                        <span className="terminal-text">{repo.stargazers_count}</span>
                      </div>

                      <div className="flex items-center gap-1 text-blue-400/70">
                        <GitFork className="w-2.5 h-2.5" />
                        <span className="terminal-text">{repo.forks_count}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-white/30">
                      <Calendar className="w-2.5 h-2.5" />
                      <span className="terminal-text text-xs">{formatDate(repo.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GitHubContributions;

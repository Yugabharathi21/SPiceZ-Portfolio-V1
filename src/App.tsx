import { useState, useCallback, memo, lazy, Suspense } from 'react';
import { Terminal, Gamepad2, Image, Youtube, Mail, Github, Car, Palette, Menu, X, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from './styles/animations';
import LoadingFallback from './components/LoadingFallback';
import ImagePreviewModal from './components/ImagePreviewModal';
import ResumePreviewModal from './components/ResumePreviewModal';
import SkillCard from './components/SkillCard';
import UnderConstruction from './components/UnderConstruction';
import { usePortfolioData } from './hooks/usePortfolioData';
import ProjectCard from './components/ProjectCard';
import MultimediaCard from './components/MultimediaCard';
import { WIPGrid } from './components/WIPGrid';

// Lazy load components
const BackgroundEffects = lazy(() => import('./components/BackgroundEffects'));

// Check if site is under construction from environment variable
const isUnderConstruction = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  // Fetch portfolio data from GitHub
  const { data: portfolioData, loading, error } = usePortfolioData();

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleImagePreview = useCallback((image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  }, []);

  if (isUnderConstruction) {
    return (
      <div className="min-h-screen bg-black">
        <Suspense fallback={<LoadingFallback />}>
          <BackgroundEffects />
        </Suspense>
        <UnderConstruction />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Suspense fallback={<LoadingFallback />}>
          <BackgroundEffects />
        </Suspense>
        <LoadingFallback />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Suspense fallback={<LoadingFallback />}>
          <BackgroundEffects />
        </Suspense>
        <div className="text-center terminal-window p-8 max-w-md">
          <h2 className="text-white text-xl mb-4">Connection Error</h2>
          <p className="text-white/70 terminal-text mb-4">Unable to load portfolio data. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-500/30 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pixel-bg">
      <BackgroundEffects />
      <Suspense fallback={<LoadingFallback />}>
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <span className="text-white/90 text-xl font-['Share_Tech_Mono'] tracking-wider">[YBJ]</span>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#home" className="nav-link">HOME</a>
                <a href="#skills" className="nav-link">SKILLS</a>
                <a href="#projects" className="nav-link">PROJECTS</a>
                <a href="#contact" className="nav-link">CONTACT</a>
                
                {/* Resume Button */}
                <div className="flex items-center ml-4 terminal-text">
                  <button 
                    onClick={() => setIsResumeModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all glass-card border border-emerald-400/20 hover:border-emerald-400/40"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Resume</span>
                  </button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-3">
                <button 
                  className="text-white/90 hover:text-white transition-colors"
                  onClick={handleMenuToggle}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden bg-black/95 border-t border-white/10">
                <a href="#home" className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">HOME</a>
                <a href="#skills" className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">SKILLS</a>
                <a href="#projects" className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">PROJECTS</a>
                <a href="#contact" className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">CONTACT</a>
                <button 
                  onClick={() => setIsResumeModalOpen(true)}
                  className="flex items-center gap-2 py-3 px-4 text-emerald-400/80 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all w-full text-left"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume</span>
                </button>
              </div>
            )}
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="pt-16">
          {/* Hero Section */}
          <section id="home" className="container mx-auto px-4 pt-20">
            {/* Main Hero Content */}
            <motion.div 
              className="terminal-window pl-8 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Terminal Window Decorations */}
              <div className="absolute top-0 left-0 w-full h-8 bg-black/50 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-white/50 text-xs ml-4 terminal-text">terminal@ybj:~</span>
              </div>
              <div className="pt-8">
                <div className="flex flex-col md:flex-row md:items-center gap-8 relative">
                  {/* Terminal content on the left */}
                  <div className="flex-1 z-10 py-8">
                    <motion.div 
                      className="flex items-center gap-3 mb-6"
                      {...fadeInUp}
                    >
                      <Terminal className="w-5 h-5 text-white/80" />
                      <span className="text-white/80 text-sm tracking-wider terminal-text">[system@terminal] ~ $ whoami</span>
                      <span className="animate-pulse">▊</span>
                    </motion.div>
                    <motion.h1 
                      className="text-4xl font-bold mb-6 text-white tracking-tight"
                      {...fadeInUp}
                    >
                      YUGA BHARATHI JAISANKAR
                    </motion.h1>
                    <motion.p 
                      className="text-lg text-white/80 mb-6 font-light"
                      {...fadeInUp}
                    >
                      II Year Computer Science Engineering @ Kongu Engineering College, Erode
                    </motion.p>
                    <motion.div 
                      className="flex gap-6 mb-6"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      <a 
                        href="https://github.com/Yugabharathi21" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white/80 hover:text-white transition-all"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a 
                        href="https://www.youtube.com/@SPz-G21" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white/80 hover:text-white transition-all"
                      >
                        <Youtube className="w-5 h-5" />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/yuga-bharathi-jaisankar-2a426a291/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white/80 hover:text-white transition-all"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </motion.div>
                  </div>
                  
                  {/* Desktop Profile Image */}
                  <motion.div
                    className="md:relative md:w-[280px] lg:w-[350px] absolute right-0 md:right-0 top-0 bottom-0 overflow-hidden hidden md:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <motion.img
                      src="/images/profile-bw.png"
                      alt="Profile"
                      className="w-[800px] md:w-[600px] lg:w-[800px] h-full object-cover object-[80%_top] scale-125 md:scale-110 lg:scale-135"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Mobile Profile Image Box */}
            <motion.div 
              className="md:hidden mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="terminal-window overflow-hidden h-[300px] relative">
                <motion.img
                  src="/images/profile-bw.png"
                  alt="Profile"
                  className="w-full h-full object-cover object-top scale-155"
                />
              </div>
            </motion.div>
          </section>

          {/* About Me Section */}
          <motion.section 
            id="about"
            className="container mx-auto px-4 py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl text-white mb-12 pixel-border-thin inline-block p-3 tracking-wide">ABOUT.EXE</h2>
            <div className="terminal-window p-8">
              <div className="flex flex-col gap-6">
                {/* Command History */}
                <motion.div 
                  className="flex flex-col gap-4"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {/* System Info */}
                  <div className="terminal-line">
                    <span className="text-emerald-400">$</span>
                    <span className="text-white/80 ml-2 terminal-text">neofetch</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 ml-4 terminal-text">
                    <div className="text-white/70">
                      <p><span className="text-emerald-400">OS:</span> Human 2.0</p>
                      <p><span className="text-emerald-400">Kernel:</span> Creative 5.4.0</p>
                      <p><span className="text-emerald-400">Uptime:</span> 20 years</p>
                      <p><span className="text-emerald-400">Shell:</span> Problem_Solver v3.0</p>
                      <p><span className="text-emerald-400">Resolution:</span> High Energy x Determination</p>
                    </div>
                    <div className="text-white/70">
                      <p><span className="text-emerald-400">DE:</span> Development_Environment 2024</p>
                      <p><span className="text-emerald-400">WM:</span> Work_Management 1.0</p>
                      <p><span className="text-emerald-400">Terminal:</span> Tech_Enthusiast</p>
                      <p><span className="text-emerald-400">CPU:</span> Brain @ 4.0GHz</p>
                      <p><span className="text-emerald-400">GPU:</span> Creative_Vision RTX</p>
                    </div>
                  </div>

                  {/* About Description */}
                  <div className="mt-6">
                    <div className="terminal-line">
                      <span className="text-emerald-400">$</span>
                      <span className="text-white/80 ml-2 terminal-text">cat about.md</span>
                    </div>
                    <div className="ml-4 mt-4 text-white/70 terminal-text space-y-4">
                      <p>
                        I'm a passionate Computer Science Engineering student with a knack for creative problem-solving and a deep interest in technology. 
                        My journey in software development spans across web development, FiveM scripting, and multimedia design, where I blend technical expertise with creative vision.
                      </p>
                      <p>
                        Currently, I'm building my portfolio to showcase my projects, including FiveM scripts, web applications, and design works. 
                        This space reflects my skills in full-stack development, UI/UX design, and game modding, highlighting my ability to turn ideas into functional and visually compelling experiences.
                      </p>
                      <p>
                        Beyond coding, I enjoy crafting visual experiences—from thumbnails to stream graphics—and exploring game asset creation. 
                        My goal is to continuously learn, innovate, and contribute to projects that push creative and technical boundaries.
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-6">
                    <div className="terminal-line">
                      <span className="text-emerald-400">$</span>
                      <span className="text-white/80 ml-2 terminal-text">stats --quick</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-4 mt-4">
                      <div className="glass-card p-4 text-center">
                        <p className="text-emerald-400 text-2xl font-bold">2+</p>
                        <p className="text-white/70 text-sm terminal-text">Years Coding</p>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <p className="text-emerald-400 text-2xl font-bold">{(portfolioData?.projects?.length || 0) + (portfolioData?.wip?.length || 0)}+</p>
                        <p className="text-white/70 text-sm terminal-text">Projects</p>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <p className="text-emerald-400 text-2xl font-bold">{portfolioData?.multimedia?.length || 0}+</p>
                        <p className="text-white/70 text-sm terminal-text">Designs</p>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <p className="text-emerald-400 text-2xl font-bold">∞</p>
                        <p className="text-white/70 text-sm terminal-text">Creativity</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="mt-6">
                    <div className="terminal-line">
                      <span className="text-emerald-400">$</span>
                      <span className="text-white/80 ml-2 terminal-text">current-status</span>
                    </div>
                    <div className="ml-4 mt-4 flex flex-wrap gap-3">
                      <span className="terminal-badge">🎓 Learning New Tech</span>
                      <span className="terminal-badge">💻 Building Projects</span>
                      <span className="terminal-badge">🎨 Creating Designs</span>
                      <span className="terminal-badge">🎮 Gaming</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Skills Grid */}
          <motion.section 
            id="skills" 
            className="container mx-auto px-4 py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl text-white mb-12 pixel-border-thin inline-block p-3 tracking-wide">SYSTEM CAPABILITIES</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <SkillCard
                icon={<Gamepad2 className="w-6 h-6" />}
                title="FiveM Development"
                items={['Custom Script Development', 'Server Configuration', 'Resource Management']}
              />
              <SkillCard
                icon={<Image className="w-6 h-6" />}
                title="Design & Graphics"
                items={['Thumbnails', 'Banners', 'Logos', 'Stream Graphics']}
              />
              <SkillCard
                icon={<Car className="w-6 h-6" />}
                title="FiveM Assets"
                items={['Vehicle Liveries', 'Character Outfits', 'Custom Models']}
              />
              <SkillCard
                icon={<Palette className="w-6 h-6" />}
                title="Creative Tools"
                items={['Adobe Photoshop', 'After Effects', 'Premiere Pro', 'Blender', 'Figma']}
                isCreativeTools={true}
              />
            </div>
          </motion.section>

          {/* Projects Section */}
          <section id="projects" className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-emerald-400">$</span>
                  <h2 className="text-3xl text-white">Projects</h2>
                  <span className="animate-pulse text-emerald-400/50">▊</span>
                </div>
                <p className="text-white/70 terminal-text">Here are some of my featured projects</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData?.projects && portfolioData.projects.length > 0 ? (
                  portfolioData.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      {...project}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-white/60 terminal-text">No projects available at the moment.</p>
                    <p className="text-white/40 text-sm mt-2 terminal-text">Check back soon for updates!</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Multimedia Section */}
          <section id="multimedia" className="py-20 bg-black/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-emerald-400">$</span>
                  <h2 className="text-3xl text-white">Multimedia</h2>
                  <span className="animate-pulse text-emerald-400/50">▊</span>
                </div>
                <p className="text-white/70 terminal-text">A showcase of my design work and multimedia projects</p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {portfolioData?.multimedia && portfolioData.multimedia.length > 0 ? (
                  portfolioData.multimedia.map((item, index) => (
                    <MultimediaCard
                      key={index}
                      {...item}
                      onClick={() => handleImagePreview(item.image)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-white/60 terminal-text">No multimedia content available at the moment.</p>
                    <p className="text-white/40 text-sm mt-2 terminal-text">Check back soon for design showcases!</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Work in Progress Section */}
          <section id="wip" className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-emerald-400">$</span>
                  <h2 className="text-3xl text-white">Work in Progress</h2>
                  <span className="animate-pulse text-emerald-400/50">▊</span>
                </div>
                <p className="text-white/70 terminal-text">Projects currently under development</p>
              </motion.div>

              <WIPGrid wipProjects={portfolioData?.wip || []} />
            </div>
          </section>

          {/* Footer */}
          <footer className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center gap-6">
              <div className="terminal-window p-4 w-full max-w-2xl">
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-emerald-400/80 text-xs sm:text-sm font-mono mb-4 leading-tight"
                >
                  {`
 ██╗   ██╗██████╗      ██╗
 ╚██╗ ██╔╝██╔══██╗     ██║
  ╚████╔╝ ██████╔╝     ██║
   ╚██╔╝  ██╔══██╗██   ██║
    ██║   ██████╔╝╚█████╔╝
    ╚═╝   ╚═════╝  ╚════╝ 
                  `}
                </motion.pre>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-2 terminal-text text-sm"
                >
                  <p className="text-white/60">
                    <span className="text-emerald-400">$</span> whoami
                  </p>
                  <p className="text-white/80 ml-4">Yuga Bharathi Jaisankar</p>
                  
                  <p className="text-white/60">
                    <span className="text-emerald-400">$</span> uptime
                  </p>
                  <p className="text-white/80 ml-4">20 years of runtime, no crashes yet</p>
                  
                  <p className="text-white/60">
                    <span className="text-emerald-400">$</span> skills --list | grep "passion"
                  </p>
                  <p className="text-white/80 ml-4">Coding with passion since 2022</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-white/60">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="terminal-text"
                >
                  © 2024 YBJ
                </motion.p>
                <span className="hidden sm:block">•</span>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-2 terminal-text"
                >
                  &lt;/&gt; with <span className="text-red-500 animate-pulse">❤</span> in React + TypeScript
                </motion.p>
                <span className="hidden sm:block">•</span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap justify-center gap-2"
                >
                  <span className="terminal-text glass-card px-2 py-1">
                    <span className="text-emerald-400">$</span> rm -rf depression
                  </span>
                  <span className="terminal-text glass-card px-2 py-1">
                    <span className="text-emerald-400">$</span> sudo apt-get install happiness
                  </span>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xs text-white/40 terminal-text text-center"
              >
                [Process completed with exit code 0] - No bugs were harmed in the making of this website
              </motion.p>
            </div>
          </footer>
        </div>

        {/* Image Preview Modal */}
        <ImagePreviewModal
          image={selectedImage}
          title={portfolioData?.multimedia && portfolioData.multimedia.length > 0 ? portfolioData.multimedia[0].title : "Preview"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <ResumePreviewModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </Suspense>
    </div>
  );
}

export default memo(App);
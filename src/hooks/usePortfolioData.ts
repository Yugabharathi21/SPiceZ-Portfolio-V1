import { useState, useEffect } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
}

export interface MultimediaItem {
  title: string;
  description: string;
  image: string;
}

export interface WIPProject {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  technologies: string[];
}

export interface PortfolioData {
  projects: Project[];
  multimedia: MultimediaItem[];
  wip: WIPProject[];
}

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Loading portfolio data from local src file...');
        
        // Import the local JSON data directly from src
        const portfolioData = await import('../data/projects.json');
        
        console.log('Portfolio data loaded successfully:', {
          projects: portfolioData.projects?.length || 0,
          multimedia: portfolioData.multimedia?.length || 0,
          wip: portfolioData.wip?.length || 0
        });
        
        setData(portfolioData);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
        console.log('Using fallback data instead...');
        
        // Set error for debugging but still use fallback data
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        
        // Comprehensive fallback data
        const fallbackData: PortfolioData = {
          projects: [
            {
              id: 1,
              title: "Portfolio Website",
              description: "A sleek and responsive portfolio website built with React, Tailwind CSS, and Framer Motion to showcase my work and skills.",
              image: "/images/project/placeholder.svg",
              githubUrl: "https://github.com/Yugabharathi21/Portfolio-Webpage",
              liveUrl: "https://yugabharathi21.netlify.app",
              technologies: ["React", "Tailwind CSS", "TypeScript", "Framer Motion"]
            },
            {
              id: 2,
              title: "Event Promotion Website",
              description: "A futuristic Fallout 3 terminal-style event website designed for Crescita 2k25, featuring a retro UI and immersive experience.",
              image: "/images/project/placeholder.svg",
              githubUrl: "https://github.com/Yugabharathi21/final-crescita/tree/main",
              liveUrl: "https://cse-crescita-25.netlify.app/",
              technologies: ["React", "Tailwind CSS", "TypeScript"]
            },
            {
              id: 3,
              title: "FiveM HUD for Qbox",
              description: "A custom HUD interface for FiveM, revamped from qbx-hud to improve user experience and visuals for roleplay servers.",
              image: "/images/project/placeholder.svg",
              githubUrl: "https://github.com/Yugabharathi21/spz-hud-fivem",
              liveUrl: "#",
              technologies: ["Lua", "JavaScript", "FiveM API", "HTML", "CSS"]
            },
            {
              id: 4,
              title: "ThinkForge – Study Planner Chatbot",
              description: "An AI-powered chatbot that helps students plan their study schedules effectively. Built for KEC Hackathon 2k25, and winner of Hackbuzz.",
              image: "/images/project/placeholder.svg",
              githubUrl: "https://github.com/Yugabharathi21/Think-Forge",
              liveUrl: "#",
              technologies: ["React", "Node.js", "Express", "MongoDB", "FAST API"]
            },
            {
              id: 5,
              title: "E-Task [E-Ink Style To-Do List App]",
              description: "A minimalist task management app designed with an e-ink inspired interface for distraction-free productivity. Built for students and professionals who prefer clarity over clutter.",
              image: "/images/project/E-ink.png",
              githubUrl: "https://github.com/Yugabharathi21/to-do-list-project",
              liveUrl: "https://to-do-list-project-inky.vercel.app/",
              technologies: ["React", "Tailwind CSS", "TypeScript", "Framer Motion"]
            },
            {
              id: 6,
              title: "PaperFolio – Notebook-Styled Portfolio Webpage",
              description: "A unique portfolio website inspired by a digital notebook theme, blending handwritten aesthetics with clean modern UI. Designed to present projects like journal entries for a more personal, creative experience.",
              image: "/images/project/Notebook.jpg",
              githubUrl: "https://github.com/Yugabharathi21/notebook-styled-portfolio-site",
              liveUrl: "#",
              technologies: ["React", "Tailwind CSS", "TypeScript", "Framer Motion"]
            },
            {
              id: 7,
              title: "Craftify – E-commerce Platform",
              description: "A fully functional online e-commerce platform developed as part of my college mini project, designed to manage handmade craft items with smooth user experience and secure checkout flow.",
              image: "/images/project/6.jpg",
              githubUrl: "https://github.com/Yugabharathi21/Crafity",
              liveUrl: "#",
              technologies: ["React", "Node.js", "Express", "MongoDB"]
            }
          ],
          multimedia: [
            {
              title: "Poster Design",
              description: "A tribute poster designed for my idol Lewis Hamilton on his birthday.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Poster Design",
              description: "Promotional poster created for a college club event.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Poster Design",
              description: "Event-themed poster crafted for my college club.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Poster Design",
              description: "Creative poster made for a university-level event promotion.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Thumbnail Design",
              description: "Freelance portfolio thumbnail designed to reflect a bold and minimal aesthetic.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Thumbnail Design",
              description: "A YouTube thumbnail created for a freelance client.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Thumbnail Design",
              description: "A personal branding thumbnail design showcasing my editing style.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Thumbnail Design",
              description: "Freelance thumbnail crafted for high visibility and engagement.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Thumbnail Design",
              description: "Client project thumbnail designed to maximize click-through rate.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Thumbnail Design",
              description: "Freelance thumbnail demonstrating color and composition skills.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Banner Design",
              description: "Custom banner created for a freelance client campaign.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Banner Design",
              description: "Custom banner created for a freelance client campaign.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Banner Design",
              description: "Custom banner created for a freelance client campaign.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Banner Design",
              description: "Custom banner created for a freelance client campaign.",
              image: "/images/multimedia/placeholder.svg"
            },
            {
              title: "Banner Design",
              description: "Custom banner created for a freelance client campaign.",
              image: "/images/multimedia/placeholder.svg"
            }
          ],
          wip: [
            {
              id: 1,
              title: "Ox-Inventory Revamp by SPZYT",
              description: "A complete visual and functional revamp of the popular ox-inventory system, customized for enhanced UX and FiveM gameplay integration.",
              image: "/images/project/placeholder.svg",
              githubUrl: "https://github.com/Yugabharathi21/Think-Forge",
              technologies: ["React", "Node.js", "Express", "MongoDB", "FAST API"]
            },
            {
              id: 2,
              title: "CW Racing – UI Revamp by SPiceZ",
              description: "Currently working on a complete redesign of the CW Racing interface for FiveM. This project aims to bring a sleek, responsive, and immersive racing HUD tailored for competitive street racing RP, with lap tracking, player stats, and clean minimal UI.",
              image: "/images/project/placeholder.svg",
              githubUrl: "https://github.com/Yugabharathi21/Think-Forge",
              technologies: ["Lua", "JavaScript", "FiveM", "HTML", "CSS"]
            }
          ]
        };
        
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

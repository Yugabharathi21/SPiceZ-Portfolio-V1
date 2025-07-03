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

const GITHUB_API_URL = 'https://api.github.com/repos/Yugabharathi21/portfolio-data/contents/data/projects.json?ref=master';

// Fallback image URLs that we know work (local images)
const FALLBACK_BASE_URL = '/images';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fixImageUrl = async (imageUrl: string, githubToken: string): Promise<string> => {
    // If it's a GitHub raw URL, we need to fetch it with authentication and convert to blob URL
    if (imageUrl.includes('raw.githubusercontent.com')) {
      try {
        const response = await fetch(imageUrl, {
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/octet-stream'
          }
        });
        
        if (response.ok) {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        } else {
          console.warn(`Failed to fetch image: ${imageUrl}, status: ${response.status}`);
          // Fall back to local image path
          const match = imageUrl.match(/\/public(.+)$/);
          return match ? match[1] : '/images/project/1.png';
        }
      } catch (error) {
        console.warn(`Error fetching image: ${imageUrl}`, error);
        // Fall back to local image path
        const match = imageUrl.match(/\/public(.+)$/);
        return match ? match[1] : '/images/project/1.png';
      }
    }
    
    // If it's already a local path, keep it
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    
    return imageUrl;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching portfolio data from GitHub API (data/projects.json on master branch)...');
        
        // Get GitHub token from environment variables
        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        
        if (!githubToken) {
          throw new Error('GitHub token not found in environment variables');
        }
        
        const headers: Record<string, string> = {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${githubToken}`,
          'User-Agent': 'Portfolio-App'
        };
        
        console.log('Using GitHub token for private repository access');
        
        const response = await fetch(GITHUB_API_URL, { headers });
        
        if (!response.ok) {
          throw new Error(`GitHub API error! status: ${response.status} - ${response.statusText}`);
        }
        
        const fileData = await response.json();
        
        // GitHub API returns file content as base64 encoded string
        const content = atob(fileData.content);
        const portfolioData: PortfolioData = JSON.parse(content);
        
        console.log('Raw portfolio data:', portfolioData);
        
        // Fix image URLs - fetch GitHub images with authentication and convert to blob URLs
        
        // Update project images
        if (portfolioData.projects) {
          for (const project of portfolioData.projects) {
            const newImage = await fixImageUrl(project.image, githubToken);
            console.log(`Project image: ${project.image} -> ${newImage}`);
            project.image = newImage;
          }
        }
        
        // Update multimedia images
        if (portfolioData.multimedia) {
          for (const item of portfolioData.multimedia) {
            const newImage = await fixImageUrl(item.image, githubToken);
            console.log(`Multimedia image: ${item.image} -> ${newImage}`);
            item.image = newImage;
          }
        }
        
        // Update WIP project images
        if (portfolioData.wip) {
          for (const project of portfolioData.wip) {
            const newImage = await fixImageUrl(project.image, githubToken);
            console.log(`WIP image: ${project.image} -> ${newImage}`);
            project.image = newImage;
          }
        }
        
        console.log('Final portfolio data with updated images:', portfolioData);
        
        console.log('Portfolio data loaded successfully:', {
          projects: portfolioData.projects?.length || 0,
          multimedia: portfolioData.multimedia?.length || 0,
          wip: portfolioData.wip?.length || 0
        });
        
        setData(portfolioData);
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
        console.log('Using fallback data instead...');
        
        // Set error for debugging but still use fallback data
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        
        // Fallback data in case of failure (using local image paths)
        const fallbackData: PortfolioData = {
          projects: [
            {
              id: 1,
              title: "Portfolio Website",
              description: "A sleek and responsive portfolio website built with React, Tailwind CSS, and Framer Motion to showcase my work and skills.",
              image: "/images/project/1.png",
              githubUrl: "https://github.com/Yugabharathi21/Portfolio-Webpage",
              liveUrl: "https://yugabharathi21.netlify.app",
              technologies: ["React", "Tailwind CSS", "TypeScript", "Framer Motion"]
            },
            {
              id: 2,
              title: "Event Promotion Website",
              description: "A futuristic Fallout 3 terminal-style event website designed for Crescita 2k25, featuring a retro UI and immersive experience.",
              image: "/images/project/2.png",
              githubUrl: "https://github.com/Yugabharathi21/final-crescita/tree/main",
              liveUrl: "https://cse-crescita-25.netlify.app/",
              technologies: ["React", "Tailwind CSS", "TypeScript"]
            }
          ],
          multimedia: [
            {
              title: "Poster Design",
              description: "A tribute poster designed for my idol Lewis Hamilton on his birthday.",
              image: "/images/multimedia/1.png"
            },
            {
              title: "Poster Design",
              description: "Promotional poster created for a college club event.",
              image: "/images/multimedia/2.png"
            },
            {
              title: "Poster Design",
              description: "Event-themed poster crafted for my college club.",
              image: "/images/multimedia/3.png"
            },
            {
              title: "Poster Design",
              description: "Creative poster made for a university-level event promotion.",
              image: "/images/multimedia/4.png"
            }
          ],
          wip: [
            {
              id: 1,
              title: "Ox-Inventory Revamp by SPZYT",
              description: "A complete visual and functional revamp of the popular ox-inventory system, customized for enhanced UX and FiveM gameplay integration.",
              image: "/images/project/7.png",
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

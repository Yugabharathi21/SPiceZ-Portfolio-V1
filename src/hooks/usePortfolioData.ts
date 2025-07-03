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

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const processImageUrl = (imageUrl: string): string => {
    // If it's already a full URL (GitHub raw or local), return as-is
    if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) {
      return imageUrl;
    }
    
    // If it's a relative path, make it absolute
    return `/${imageUrl}`;
  };

  const processPortfolioData = (rawData: PortfolioData): PortfolioData => {
    // Ensure all arrays exist and are properly initialized
    const processedData: PortfolioData = {
      projects: rawData.projects || [],
      multimedia: rawData.multimedia || [],
      wip: rawData.wip || []
    };

    // Process project images
    if (processedData.projects && Array.isArray(processedData.projects)) {
      processedData.projects = processedData.projects.map(project => ({
        ...project,
        image: processImageUrl(project.image)
      }));
    }
    
    // Process multimedia images
    if (processedData.multimedia && Array.isArray(processedData.multimedia)) {
      processedData.multimedia = processedData.multimedia.map(item => ({
        ...item,
        image: processImageUrl(item.image)
      }));
    }
    
    // Process WIP project images
    if (processedData.wip && Array.isArray(processedData.wip)) {
      processedData.wip = processedData.wip.map(project => ({
        ...project,
        image: processImageUrl(project.image)
      }));
    }

    return processedData;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching portfolio data from GitHub API...');
        
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
        
        const response = await fetch(GITHUB_API_URL, { headers });
        
        if (!response.ok) {
          throw new Error(`GitHub API error! status: ${response.status} - ${response.statusText}`);
        }
        
        const fileData = await response.json();
        
        // GitHub API returns file content as base64 encoded string
        const content = atob(fileData.content);
        const portfolioData: PortfolioData = JSON.parse(content);
        
        // Only proceed if component is still mounted
        if (!isMounted) return;
        
        // Process the data and ensure arrays are properly initialized
        const processedData = processPortfolioData(portfolioData);
        
        console.log('✅ Portfolio data loaded successfully:', {
          projects: processedData.projects?.length || 0,
          multimedia: processedData.multimedia?.length || 0,
          wip: processedData.wip?.length || 0
        });
        
        if (isMounted) {
          setData(processedData);
        }
      } catch (err) {
        console.error('❌ Failed to fetch portfolio data:', err);
        console.log('🔄 Using fallback data instead...');
        
        if (!isMounted) return;
        
        // Don't set error if we have fallback data - just log it
        console.error('❌ Failed to fetch portfolio data:', err);
        console.log('🔄 Using fallback data instead...');
        
        // Fallback data in case of failure (using local image paths)
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
            }
          ],
          wip: [
            {
              id: 1,
              title: "Ox-Inventory Revamp by SPZYT",
              description: "A complete visual and functional revamp of the popular ox-inventory system, customized for enhanced UX and FiveM gameplay integration.",
              image: "/images/project/placeholder.svg",
              githubUrl: "https://github.com/Yugabharathi21/Think-Forge",
              technologies: ["Lua", "JavaScript", "FiveM", "HTML", "CSS"]
            }
          ]
        };
        
        // Process the fallback data to ensure consistency
        const processedFallbackData = processPortfolioData(fallbackData);
        setData(processedFallbackData);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};

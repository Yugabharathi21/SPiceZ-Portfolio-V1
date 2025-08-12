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
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

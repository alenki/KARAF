export interface Project {
  id: number;
  image: string;
  name: string;
  category: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  { id: 1, image: '/projects/balancecoffee.webp', name: 'Balance Coffee', category: 'Cafe · Concept', description: 'Concept website for a coffee shop', link: 'https://balancecoffee.netlify.app/' },
  { id: 2, image: '/projects/galereya.webp', name: 'Galereya', category: 'Shopping Mall', description: 'Official shopping mall website', link: 'https://galereya-mall.netlify.app/' },
  { id: 3, image: '/projects/masterauto.webp', name: 'MasterAuto', category: 'Auto Service', description: 'Official auto service website', link: 'https://masterauto.netlify.app/' },
  { id: 4, image: '/projects/chocodips.webp', name: 'ChocoDips', category: 'Cafe · Concept', description: 'Concept website for a cafe', link: 'https://chocodips.netlify.app/' },
  { id: 5, image: '/projects/history.webp', name: 'History', category: 'Restaurant · Concept', description: 'Concept website for a restaurant', link: 'https://history-rest.netlify.app/' },
];

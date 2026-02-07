export interface Project {
  id: number;
  image: string;
  name: string;
  category: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  { id: 1, image: '/projects/balancecoffee.png', name: 'Balance Coffee', category: 'Cafe · Concept', description: 'Concept website for a coffee shop', link: 'https://balancecoffee.netlify.app/' },
  { id: 2, image: '/projects/galereya.png', name: 'Galereya', category: 'Shopping Mall', description: 'Official shopping mall website', link: 'https://galereya-trc.ru' },
  { id: 3, image: '/projects/masterauto.png', name: 'MasterAuto', category: 'Auto Service', description: 'Official auto service website', link: 'https://masterauto-07.ru' },
  { id: 4, image: '/projects/chocodips.png', name: 'ChocoDips', category: 'Cafe · Concept', description: 'Concept website for a cafe', link: 'https://choco-dips.ru' },
  { id: 5, image: '/projects/history.png', name: 'History', category: 'Restaurant · Concept', description: 'Concept website for a restaurant', link: 'https://history-nalchik.ru' },
];

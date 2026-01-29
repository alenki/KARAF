export interface Project {
  id: number;
  image: string;
  name: string;
  category: string;
}

export const projects: Project[] = [
  { id: 1, image: '/projects/balancecoffee.png', name: 'Balance Coffee', category: 'E-commerce' },
  { id: 2, image: '/projects/cerber.png', name: 'Cerber', category: 'Security Platform' },
  { id: 3, image: '/projects/chocodips.png', name: 'ChocoDips', category: 'Product Landing' },
  { id: 4, image: '/projects/galereya.png', name: 'Galereya', category: 'Cultural Platform' },
  { id: 5, image: '/projects/history.png', name: 'History', category: 'Educational Portal' },
  { id: 6, image: '/projects/kabardinobalkaria.png', name: 'Kabardino-Balkaria', category: 'Tourism Portal' },
  { id: 7, image: '/projects/masterauto.png', name: 'MasterAuto', category: 'Automotive Service' },
  { id: 8, image: '/projects/mozaika.png', name: 'Mozaika', category: 'Creative Platform' },
  { id: 9, image: '/projects/okaraf.png', name: 'O KARAF', category: 'Agency Portfolio' },
  { id: 10, image: '/projects/playtime.png', name: 'Playtime', category: 'Entertainment App' },
];

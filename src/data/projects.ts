export interface Project {
  id: number;
  image: string;
  name: string;
  category: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  { id: 1, image: '/projects/galereya.png', name: 'Galereya', category: 'Shopping Mall', description: 'Official website for a mall', link: 'https://galereya-trc.ru' },
  { id: 2, image: '/projects/masterauto.png', name: 'MasterAuto', category: 'Auto Service', description: 'Official website for an auto service', link: 'https://masterauto-07.ru' },
  { id: 3, image: '/projects/chocodips.png', name: 'ChocoDips', category: 'Café · Concept', description: 'Conceptual website for a café', link: 'https://choco-dips.ru' },
  { id: 4, image: '/projects/history.png', name: 'History', category: 'Restaurant · Concept', description: 'Conceptual website for a restaurant', link: 'https://history-nalchik.ru' },
  { id: 5, image: '/projects/okaraf.png', name: 'OKARAF', category: 'Portfolio', description: 'Official portfolio website', link: 'https://okaraf.ru' },
  { id: 6, image: '/projects/mozaika.png', name: 'Mozaika', category: 'Education', description: 'Educational school and structure platform', link: 'https://mozaika.netlify.app' },
  { id: 7, image: '/projects/pulse.png', name: 'Pulse', category: 'Tourism App', description: 'Official tourism agency Telegram app', link: 'https://t.me/pulse_t_bot' },
  { id: 8, image: '/projects/kabardinobalkaria.png', name: 'Kabardino-Balkaria', category: 'Republic · Concept', description: 'Conceptual website for a Republic', link: 'https://kabardinobalkaria.com' },
  { id: 9, image: '/projects/cerber.png', name: 'Cerber', category: 'Fashion', description: 'Official clothing brand website', link: 'https://cerberkavkaz.ru' },
  { id: 10, image: '/projects/playtime.png', name: 'Playtime', category: 'Competition', description: 'Official website for a regional programming competition', link: 'https://playtimekbsu.ru' },
];

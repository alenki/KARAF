export type Category = 'web' | 'mobile' | 'ai' | 'bot';
export type MockupKind = 'laptop' | 'phone' | 'tablet';

export interface LocalizedText {
  ru: string;
  en: string;
}

export interface Project {
  slug: string;
  name: string;
  category: Category;
  location?: string;
  year: number;
  summary: LocalizedText;
  role: LocalizedText;
  techStack: string[];
  hero: string;
  gallery?: string[];
  liveUrl?: string;
  featured?: boolean;
  mockup: MockupKind;
}

export const projects: Project[] = [
  {
    slug: 'balance-coffee',
    name: 'Balance Coffee',
    category: 'web',
    location: 'Nalchik · Café',
    year: 2024,
    summary: {
      ru: 'Концептуальный сайт для кофейни — атмосфера и меню в одном жесте.',
      en: 'A concept site for an independent café — atmosphere and menu in one gesture.',
    },
    role: { ru: 'Дизайн + разработка', en: 'Design + Development' },
    techStack: ['React', 'TypeScript', 'GSAP', 'Vite'],
    hero: '/projects/balancecoffee.webp',
    liveUrl: 'https://balance-coffee.ru',
    featured: true,
    mockup: 'laptop',
  },
  {
    slug: 'masterauto',
    name: 'МастерАвто',
    category: 'web',
    location: 'Service · Online',
    year: 2024,
    summary: {
      ru: 'Официальный сайт автосервиса с онлайн-записью и каталогом услуг.',
      en: 'Official site for an auto-service shop with online booking and service catalogue.',
    },
    role: { ru: 'Дизайн + разработка', en: 'Design + Development' },
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    hero: '/projects/masterauto.webp',
    liveUrl: 'https://masterauto-07.ru',
    featured: true,
    mockup: 'laptop',
  },
  {
    slug: 'melty',
    name: 'Melty',
    category: 'web',
    location: 'Café · Brand',
    year: 2024,
    summary: {
      ru: 'Официальный сайт кафе — меню, история и атмосфера в едином ритме.',
      en: 'Official café site — menu, story, and atmosphere on a single rhythm.',
    },
    role: { ru: 'Дизайн + разработка', en: 'Design + Development' },
    techStack: ['React', 'TypeScript', 'Framer Motion'],
    hero: '/projects/melty.png',
    liveUrl: 'https://melty-cafe.ru',
    featured: true,
    mockup: 'laptop',
  },
  {
    slug: 'galereya',
    name: 'Галерея',
    category: 'web',
    location: 'Retail · Mall',
    year: 2024,
    summary: {
      ru: 'Сайт торгового центра — арендаторы, события, навигация по этажам.',
      en: 'A shopping-centre site — tenants, events, and floor navigation.',
    },
    role: { ru: 'Дизайн + разработка', en: 'Design + Development' },
    techStack: ['React', 'TypeScript', 'Tailwind'],
    hero: '/projects/galereya.webp',
    liveUrl: 'https://galereya-trc.netlify.app/',
    mockup: 'laptop',
  },
  {
    slug: 'history',
    name: 'History',
    category: 'web',
    location: 'Restaurant · Concept',
    year: 2024,
    summary: {
      ru: 'Концептуальный сайт для ресторана — наследие и кухня в одном повествовании.',
      en: 'A concept site for a restaurant — heritage and cuisine as a single narrative.',
    },
    role: { ru: 'Дизайн + разработка', en: 'Design + Development' },
    techStack: ['React', 'TypeScript', 'GSAP'],
    hero: '/projects/history.webp',
    liveUrl: 'https://history-nalchik.netlify.app/',
    mockup: 'laptop',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

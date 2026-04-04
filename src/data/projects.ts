export interface Project {
  id: number;
  image: string;
  name: string;
  category: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  { id: 1, image: '/projects/balancecoffee.webp', name: 'BALANCE COFFEE', category: 'Кафе · Концепт', description: 'Концептуальный сайт для кофейни', link: 'https://balance-coffee.ru' },
  { id: 2, image: '/projects/masterauto.webp', name: 'МастерАвто', category: 'Автосервис', description: 'Официальный сайт автосервиса', link: 'https://masterauto-07.ru' },
  { id: 3, image: '/projects/melty.png', name: 'Melty', category: 'Кафе', description: 'Официальный сайт кафе', link: 'https://melty-cafe.ru' },
  { id: 4, image: '/projects/galereya.webp', name: 'Галерея', category: 'Торговый центр', description: 'Официальный сайт торгового центра', link: 'https://galereya-trc.netlify.app/' },
  { id: 5, image: '/projects/history.webp', name: 'History', category: 'Ресторан · Концепт', description: 'Концептуальный сайт для ресторана', link: 'https://history-nalchik.netlify.app/' },
];

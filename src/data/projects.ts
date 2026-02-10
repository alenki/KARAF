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
  { id: 2, image: '/projects/galereya.webp', name: 'Галерея', category: 'Торговый центр', description: 'Официальный сайт торгового центра', link: 'https://galereya-trc.ru' },
  { id: 3, image: '/projects/masterauto.webp', name: 'МастерАвто', category: 'Автосервис', description: 'Официальный сайт автосервиса', link: 'https://masterauto-07.ru' },
  { id: 5, image: '/projects/history.webp', name: 'History', category: 'Ресторан · Концепт', description: 'Концептуальный сайт для ресторана', link: 'https://history-nalchik.ru' },
  { id: 6, image: '/projects/okaraf.webp', name: 'OKARAF', category: 'Портфолио', description: 'Официальный сайт-портфолио', link: 'https://okaraf.ru' },
  { id: 7, image: '/projects/mozaika.webp', name: 'Мозаика', category: 'Образование', description: 'Образовательная платформа', link: 'https://mozaika.netlify.app' },
  { id: 8, image: '/projects/pulse.webp', name: 'Pulse', category: 'Туризм', description: 'Telegram-приложение туристического агентства', link: 'https://t.me/pulse_t_bot' },
  { id: 9, image: '/projects/kabardinobalkaria.webp', name: 'Кабардино-Балкария', category: 'Республика · Концепт', description: 'Концептуальный сайт республики', link: 'https://kabardinobalkaria.com' },
  { id: 10, image: '/projects/cerber.webp', name: 'Cerber', category: 'Мода', description: 'Официальный сайт бренда одежды', link: 'https://cerberkavkaz.ru' },
];

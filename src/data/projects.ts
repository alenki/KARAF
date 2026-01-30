export interface Project {
  id: number;
  image: string;
  name: string;
  category: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  { id: 1, image: '/projects/galereya.png', name: 'Галерея', category: 'Торговый центр', description: 'Официальный сайт торгового центра', link: 'https://galereya-trc.ru' },
  { id: 2, image: '/projects/masterauto.png', name: 'МастерАвто', category: 'Автосервис', description: 'Официальный сайт автосервиса', link: 'https://masterauto-07.ru' },
  { id: 3, image: '/projects/chocodips.png', name: 'ChocoDips', category: 'Кафе · Концепт', description: 'Концептуальный сайт для кафе', link: 'https://choco-dips.ru' },
  { id: 4, image: '/projects/history.png', name: 'History', category: 'Ресторан · Концепт', description: 'Концептуальный сайт для ресторана', link: 'https://history-nalchik.ru' },
  { id: 5, image: '/projects/okaraf.png', name: 'OKARAF', category: 'Портфолио', description: 'Официальный сайт-портфолио', link: 'https://okaraf.ru' },
  { id: 6, image: '/projects/mozaika.png', name: 'Мозаика', category: 'Образование', description: 'Образовательная платформа', link: 'https://mozaika.netlify.app' },
  { id: 7, image: '/projects/pulse.png', name: 'Pulse', category: 'Туризм', description: 'Telegram-приложение туристического агентства', link: 'https://t.me/pulse_t_bot' },
  { id: 8, image: '/projects/kabardinobalkaria.png', name: 'Кабардино-Балкария', category: 'Республика · Концепт', description: 'Концептуальный сайт республики', link: 'https://kabardinobalkaria.com' },
  { id: 9, image: '/projects/cerber.png', name: 'Cerber', category: 'Мода', description: 'Официальный сайт бренда одежды', link: 'https://cerberkavkaz.ru' },
  { id: 10, image: '/projects/playtime.png', name: 'Playtime', category: 'Соревнование', description: 'Официальный сайт регионального конкурса по программированию', link: 'https://playtimekbsu.ru' },
];

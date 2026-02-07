export interface Service {
  id: number;
  number: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 1,
    number: '01',
    title: 'Веб-разработка',
    description: 'Высокопроизводительные сайты и веб-приложения на современных фреймворках. От лендингов до сложных платформ.',
  },
  {
    id: 2,
    number: '02',
    title: 'Мобильная разработка',
    description: 'Нативные и кроссплатформенные мобильные приложения для iOS и Android. Безупречный опыт на всех устройствах.',
  },
  {
    id: 3,
    number: '03',
    title: 'ИИ-решения',
    description: 'Интеграция ИИ, чат-боты и интеллектуальная автоматизация. Передовые технологии машинного обучения.',
  },
  {
    id: 4,
    number: '04',
    title: 'Telegram-боты',
    description: 'Функциональные Telegram-боты для автоматизации бизнеса, взаимодействия с клиентами и управления сообществами.',
  },
];

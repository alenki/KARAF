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
    title: 'Web Development',
    description: 'High-performance websites and web applications built with modern frameworks. From landing pages to complex platforms.',
  },
  {
    id: 2,
    number: '02',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. Seamless experiences across all devices.',
  },
  {
    id: 3,
    number: '03',
    title: 'AI Solutions',
    description: 'Custom AI integrations, chatbots, and intelligent automation. Leveraging cutting-edge machine learning technologies.',
  },
  {
    id: 4,
    number: '04',
    title: 'Telegram Bots',
    description: 'Feature-rich Telegram bots for business automation, customer engagement, and community management.',
  },
];

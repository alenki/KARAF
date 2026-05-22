export interface Service {
  id: string;
  number: string;
  key: 'web' | 'mobile' | 'ai' | 'bot';
}

export const services: Service[] = [
  { id: 'web', number: '01', key: 'web' },
  { id: 'mobile', number: '02', key: 'mobile' },
  { id: 'ai', number: '03', key: 'ai' },
  { id: 'bot', number: '04', key: 'bot' },
];

export interface ProcessStep {
  id: string;
  number: string;
  key: 'discover' | 'design' | 'build' | 'ship';
}

export const processSteps: ProcessStep[] = [
  { id: 'discover', number: '01', key: 'discover' },
  { id: 'design', number: '02', key: 'design' },
  { id: 'build', number: '03', key: 'build' },
  { id: 'ship', number: '04', key: 'ship' },
];

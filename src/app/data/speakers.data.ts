export interface Speaker {
  id: string;
  name: string;
  title: string;
  topic: string;
  summary: string;
  discussionPoints: string[];
  image: string;
}

export const eventSpeakers: Speaker[] = [
  {
    id: 'amina-cole',
    name: 'Amina Cole',
    title: 'Chief Product Officer, Payinto',
    topic: 'Designing Payment Flows That Businesses Trust',
    summary:
      'A look into product decisions behind frictionless checkout, confidence signals, and onboarding experiences that reduce payment drop-off.',
    discussionPoints: [
      'How Payinto reduces failed transaction loops.',
      'UX patterns that improve conversion in payment steps.',
      'What teams should measure in the first 90 days after launch.',
    ],
    image: 'https://ui-avatars.com/api/?name=Amina+Cole&background=1d4ed8&color=ffffff&size=600',
  },
  {
    id: 'david-okoro',
    name: 'David Okoro',
    title: 'Head of Engineering, Payinto',
    topic: 'Reliable Infrastructure for Real-Time Payment Operations',
    summary:
      'How engineering architecture choices support reliability, observability, and operational confidence at scale.',
    discussionPoints: [
      'Balancing speed and safety in transaction systems.',
      'Operational monitoring and incident response playbooks.',
      'Scaling platform throughput while controlling costs.',
    ],
    image: 'https://ui-avatars.com/api/?name=David+Okoro&background=0f766e&color=ffffff&size=600',
  },
  {
    id: 'zara-hassan',
    name: 'Zara Hassan',
    title: 'Fintech Strategy Lead',
    topic: 'The New Standard for Cross-Border Payment Experiences',
    summary:
      'A strategy session on market expectations, localization, and trust requirements shaping the next generation of payment products.',
    discussionPoints: [
      'Where cross-border experience breaks today.',
      'Building confidence through transparent fees and timing.',
      'Practical rollout strategy for multi-market expansion.',
    ],
    image: 'https://ui-avatars.com/api/?name=Zara+Hassan&background=be123c&color=ffffff&size=600',
  },
];

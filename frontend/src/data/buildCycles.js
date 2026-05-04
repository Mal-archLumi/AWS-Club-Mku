const buildCycles = [
  {
    id: 1,
    name: 'Authentication System Sprint',
    emoji: '🔒',
    startDate: '2026-05-01',
    endDate: '2026-05-15',
    status: 'active',
    description: 'Building secure user authentication with OAuth2 and 2FA support.',
    projects: [
      'User Login System',
      'OAuth2 Integration',
      'Two-Factor Authentication'
    ],
    teamSize: 4,
    teamMembers: ['Lumiti Alvine', 'Joan Ngugi'],
    githubLink: 'https://github.com/mku-builders/auth-system',
    demoLink: 'https://auth-demo.mku-builders.dev',
    deliverables: [
      'Secure login endpoint',
      'Token management',
      'Account recovery flow'
    ],
    progressPercent: 75
  },
  {
    id: 2,
    name: 'AI Resume Analyzer Build',
    emoji: '🤖',
    startDate: '2026-05-10',
    endDate: '2026-05-31',
    status: 'active',
    description: 'ML-powered resume analysis tool with skill extraction and recommendations.',
    projects: [
      'ML Model Training',
      'API Development',
      'Web Interface'
    ],
    teamSize: 3,
    teamMembers: ['Hinzano Kinga'],
    githubLink: 'https://github.com/mku-builders/resume-analyzer',
    demoLink: null,
    deliverables: [
      'Trained ML model',
      'REST API',
      'React frontend'
    ],
    progressPercent: 45
  },
  {
    id: 3,
    name: 'Campus Marketplace Deployment',
    emoji: '🛒',
    startDate: '2026-05-08',
    endDate: '2026-05-25',
    status: 'testing',
    description: 'E-commerce platform for student-to-student buying/selling on campus.',
    projects: [
      'Payment Integration',
      'Inventory System',
      'Launch Marketing'
    ],
    teamSize: 5,
    teamMembers: ['Evelyne Mwangi', 'Lynn Ngugi'],
    githubLink: 'https://github.com/mku-builders/campus-marketplace',
    demoLink: 'https://marketplace.mku.dev',
    deliverables: [
      'Stripe integration',
      'Admin dashboard',
      'Mobile-friendly UI'
    ],
    progressPercent: 85
  },
  {
    id: 4,
    name: 'Cloud Infrastructure Hardening',
    emoji: '🛡️',
    startDate: '2026-05-15',
    endDate: '2026-05-30',
    status: 'planning',
    description: 'Security audit and optimization of all system infrastructure.',
    projects: [
      'Security Audit',
      'Cost Optimization',
      'Monitoring Setup'
    ],
    teamSize: 3,
    teamMembers: [],
    githubLink: 'https://github.com/mku-builders/infrastructure',
    demoLink: null,
    deliverables: [
      'Security report',
      'Optimized AWS config',
      'CloudWatch dashboards'
    ],
    progressPercent: 0
  }
];

export default buildCycles;

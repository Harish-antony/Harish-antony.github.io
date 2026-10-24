/**
 * Single source of truth for all professional content.
 * Every fact below is taken from Harish's résumé (uploads/Harish_A_Junior_Software_Developer_Resume-1.pdf)
 * or from verified public sources (GitHub repositories, live Keerthana Associates prototype).
 * Nothing here is invented — see /docs in the repo for the verification log.
 */

export const PROFILE = {
  name: 'Harish A',
  firstName: 'Harish',
  title: 'Junior Software Developer',
  tagline: 'Building useful software. One problem at a time.',
  location: 'Puducherry, India',
  email: 'harish.antony027@gmail.com',
  phone: '+91 7448475909',
  phoneHref: 'tel:+917448475909',
  github: 'https://github.com/Harish-antony',
  linkedin: 'https://linkedin.com/in/harish-antony-6b6a62303',
  resume: './Harish_A_Resume.pdf',
}

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const MARQUEE_ITEMS = [
  'PYTHON',
  'FASTAPI',
  'SQL',
  'POSTGRESQL',
  'REST APIS',
  'SOFTWARE DEVELOPMENT',
]

export const HERO_CHIPS = ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs']

export const SKILL_GROUPS = [
  {
    index: '01',
    title: 'Languages',
    wide: false,
    skills: ['Python', 'SQL', 'Dart', 'JavaScript'],
  },
  {
    index: '02',
    title: 'Backend & APIs',
    wide: true,
    skills: [
      'FastAPI',
      'REST APIs',
      'SQLAlchemy ORM',
      'Flask (basics)',
      'Django (basics)',
    ],
  },
  {
    index: '03',
    title: 'Databases',
    wide: false,
    skills: ['PostgreSQL', 'MySQL', 'Supabase'],
  },
  {
    index: '04',
    title: 'App Development',
    wide: false,
    skills: ['Flutter', 'Firebase Authentication', 'OpenAI API'],
  },
  {
    index: '05',
    title: 'Data & Analytics',
    wide: false,
    skills: [
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Streamlit',
      'Tableau',
      'Power BI',
      'Excel',
    ],
  },
  {
    index: '06',
    title: 'Tools & Fundamentals',
    wide: false,
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'OOP',
      'Data Structures',
      'DBMS',
      'SDLC',
    ],
  },
]

export const PROJECTS = [
  {
    id: 'knowledgeos',
    name: 'KnowledgeOS',
    category: 'AI Knowledge Management · Backend Engineering',
    blurb:
      'An AI knowledge-management platform built from the database up — I designed the schema, built the REST APIs and authentication layer, and implemented semantic search powered by OpenAI vector embeddings.',
    points: [
      'Complete backend built independently: database schema, REST APIs, user authentication',
      'Semantic search implemented with OpenAI vector embeddings',
      'FastAPI service layer over PostgreSQL via SQLAlchemy ORM',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'OpenAI API'],
    links: [{ label: 'GitHub Repository', href: 'https://github.com/Harish-antony/knowledgeos', external: true }],
    art: 'knowledgeos',
    note: 'Interface illustration — not a deployed product screenshot.',
  },
  {
    id: 'prici-web',
    name: 'PRICI WEB',
    category: 'Application Development · Database Management',
    blurb:
      'A chit fund management system and my MCA final-year project — designed, built and deployed solo in a two-day sprint, with separate administrator and member experiences.',
    points: [
      'Role-based access with dedicated admin and member interfaces',
      'Login via Google, email authentication and OTP',
      'CSV reporting for records and collections',
    ],
    stack: ['Flutter', 'Supabase', 'PostgreSQL', 'Firebase Authentication'],
    links: [{ label: 'GitHub Repository', href: 'https://github.com/Harish-antony/prici-web', external: true }],
    art: 'prici',
    note: 'Interface illustration — not a deployed product screenshot.',
  },
  {
    id: 'data-analysis',
    name: 'Stock Market & Employee Data Analysis',
    category: 'Data Analytics · Visualization',
    blurb:
      'From raw files to readable insight — cleaning historical stock-price data, visualising market trends in a Streamlit app, and building Tableau dashboards on employee attendance and productivity.',
    points: [
      'Cleaned and prepared historical stock-price datasets with Pandas & NumPy',
      'Visualised price trends through an interactive Streamlit application',
      'Built Tableau dashboards covering employee attendance and productivity',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'PostgreSQL', 'Tableau', 'Streamlit'],
    links: [],
    art: 'data',
    note: 'Illustrative dashboard mockups — dataset values are not shown.',
  },
  {
    id: 'keerthana',
    name: 'Keerthana Associates',
    category: 'Freelance Web Development · Client Project',
    blurb:
      'A live freelance engagement: the public landing page for Keerthana Associates, an EHS, environment, sustainability, ESG & EPR consultancy — designed, built and shipped as their web presence.',
    points: [
      'Designed and developed the full landing page as an independent freelancer',
      'Live prototype serving the client: service catalogue, enquiry flow, FAQ',
      'Responsive, performance-conscious build for a real business audience',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    links: [
      { label: 'Live Prototype', href: 'https://harish-antony.github.io/keerthana-associates', external: true },
      { label: 'GitHub Repository', href: 'https://github.com/Harish-antony/keerthana-associates', external: true },
    ],
    art: 'keerthana',
    note: 'Live prototype — real screenshot of the deployed site.',
  },
]

export const EXPERIENCE = {
  role: 'Freelance Web Developer & Video Editor',
  org: 'Self-employed · Live client project',
  points: [
    'Developing the landing page for Keerthana Associates as a live client project.',
    'Editing videos for clients as a freelance video editor.',
  ],
}

export const INDEPENDENT_WORK = [
  {
    name: 'KnowledgeOS',
    detail: 'Backend, schema, auth & semantic search — built end-to-end',
    href: 'https://github.com/Harish-antony/knowledgeos',
  },
  {
    name: 'PRICI WEB',
    detail: 'Chit fund management app — MCA final-year project, solo sprint',
    href: 'https://github.com/Harish-antony/prici-web',
  },
  {
    name: 'Stock & Employee Data Analysis',
    detail: 'Streamlit visualisations and Tableau dashboards',
    href: null,
  },
]

export const EDUCATION = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'Pope John Paul II College of Education, Puducherry',
    year: '2026',
    cgpa: '8.68',
  },
  {
    degree: 'B.Sc. Computer Science',
    school: 'PRIST University, Pondicherry Campus',
    year: '2023',
    cgpa: '8.46',
  },
]

export const CERTIFICATIONS = [
  { name: 'SQL for Beginners', issuer: 'Udemy' },
  { name: 'Python for Data Analysis', issuer: 'Udemy' },
  { name: 'Flutter Development', issuer: 'Workshop' },
]

export const ACHIEVEMENT =
  'Represented the department in inter-college technical competitions — and won most of the events entered.'

export const CAT_MESSAGES = {
  home: "Meow! Let's start here.",
  about: 'Want to know who Harish is?',
  skills: 'Want to see the tech stack?',
  projects: "Let's explore the projects.",
  experience: 'Freelance stories live here.',
  education: 'Degrees and certs, dusted and framed.',
  contact: 'Ready to get in touch?',
}

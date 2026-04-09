import type { PortfolioProjectId } from './portfolioData'

export interface ProfileFact {
  label: string
  value: string
}

export interface ProfileData {
  fullName: string
  headline: string
  location: string
  summary: string
  githubUrl: string
  experienceStartDate: string
  facts: ProfileFact[]
}

export interface ContactLink {
  label: string
  href: string
  ariaLabel: string
  icon: string
  supportingText: string
}

export interface ContactData {
  email: string
  intro: string
  availability: string
  links: ContactLink[]
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  description: string
}

export interface EducationItem {
  qualification: string
  institution: string
  period: string
  description: string
}

export type SkillCategory = 'frontend' | 'backend' | 'data' | 'delivery'

export interface SkillItem {
  id: string
  label: string
  category: SkillCategory
  order: number
  projectIds: PortfolioProjectId[]
}

export interface LearningAdaptabilityItem {
  example: string
  description: string
}

export interface ApproachProcessItem {
  title: string
  description: string
}

export interface ApproachData {
  summary: string
  process: ApproachProcessItem[]
  adaptabilityStatement: string
}

export type SkillId = SkillItem['id']

export interface PersonalData {
  profile: ProfileData
  contact: ContactData
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillItem[]
  approach: ApproachData
  learningAdaptability: LearningAdaptabilityItem[]
}

const githubUrl = 'https://github.com/WarrickSmith?tab=repositories'
const directEmail = 'warrick@baybox.co.nz'

const personalData = {
  profile: {
    fullName: 'Warrick Smith',
    headline: 'Full Stack Web Developer',
    location: 'Auckland, New Zealand',
    summary:
      'Full stack developer with production experience across banking, cloud delivery, and customer-facing products. I enjoy turning business needs into practical software with clear UX, reliable systems, and maintainable code.',
    githubUrl,
    experienceStartDate: '2021-06-01',
    facts: [
      { label: 'Name', value: 'Warrick Smith' },
      { label: 'Nationality', value: 'New Zealand' },
      { label: 'Status', value: 'Available' },
      { label: 'Languages', value: 'English' },
    ],
  },
  contact: {
    email: directEmail,
    intro:
      'Use the form for a quick introduction, or reach out directly if you already know what you would like to discuss.',
    availability:
      'Open to product, platform, job, frontend, and full-stack conversations.',
    links: [
      {
        label: 'GitHub Repositories',
        href: githubUrl,
        ariaLabel: 'Open Warrick Smith GitHub repositories in a new tab',
        icon: 'faGithub',
        supportingText:
          'Recent portfolio work, source code, and implementation detail.',
      },
    ],
  },
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'NEO',
      period: 'August 2022 - Present',
      description:
        "Building NEO's full-stack banking applications using React, TypeScript, Tailwind, Redux, Node.js, MongoDB, and AWS services including ECS, S3, and Lambda.",
    },
    {
      role: 'Student Full Stack Developer',
      company: 'Developers Institute',
      period: 'June 2021 - June 2022',
      description:
        "Completed an intensive full stack programme focused on MERN and PERN delivery, Auth0, Docker, Git, GitHub, DevOps practices, and Lean and Agile ways of working, finishing with straight A's.",
    },
    {
      role: 'Business Broker',
      company: 'Divest Business Sales',
      period: '2014 - 2021',
      description:
        'Led business sales engagements from prospecting through negotiation and ownership transition, while also implementing and maintaining a private-cloud Microsoft Dynamics CRM setup integrated with Outlook.',
    },
    {
      role: 'Contract ITSM Consultant',
      company: 'PwC',
      period: '2013 - 2014',
      description:
        'Implemented ITIL v3 core processes, trained staff, updated an internal Lotus Notes application, and introduced ITSM dashboard reporting for management.',
    },
  ],
  education: [
    {
      qualification: 'Level 5 Diploma in Web Development and Design',
      institution: 'Developers Institute Whangarei',
      period: 'June 2021 - June 2022',
      description:
        'One-year programme covering client-side, server-side, full-stack, and enterprise web development.',
    },
    {
      qualification: 'AWS Academy Cloud Foundations',
      institution: 'Amazon Web Services Academy',
      period: 'December 2021',
      description:
        'Foundation-level study across cloud concepts, AWS core services, security, architecture, pricing, and support.',
    },
    {
      qualification: 'National Certificate in Real Estate',
      institution: 'Open Polytechnic Wellington',
      period: 'March 2014 - June 2014',
      description:
        'Industry qualification completed as a prerequisite for commercial business-broker work.',
    },
  ],
  skills: [
    {
      id: 'html',
      label: 'HTML',
      category: 'frontend',
      order: 1,
      projectIds: ['portfolio-site'],
    },
    {
      id: 'css',
      label: 'CSS',
      category: 'frontend',
      order: 2,
      projectIds: ['portfolio-site'],
    },
    {
      id: 'javascript',
      label: 'JavaScript',
      category: 'frontend',
      order: 3,
      projectIds: ['portfolio-site', 'music-manager', 'race-day'],
    },
    {
      id: 'react',
      label: 'React',
      category: 'frontend',
      order: 4,
      projectIds: ['portfolio-site', 'music-manager', 'race-day'],
    },
    {
      id: 'typescript',
      label: 'TypeScript',
      category: 'frontend',
      order: 5,
      projectIds: ['portfolio-site', 'music-manager', 'race-day'],
    },
    {
      id: 'tailwind-css',
      label: 'Tailwind CSS',
      category: 'frontend',
      order: 6,
      projectIds: ['portfolio-site', 'music-manager', 'race-day'],
    },
    {
      id: 'next-js',
      label: 'Next.js',
      category: 'frontend',
      order: 7,
      projectIds: ['music-manager', 'race-day'],
    },
    {
      id: 'node-js',
      label: 'Node.js',
      category: 'backend',
      order: 8,
      projectIds: ['music-manager', 'race-day'],
    },
    {
      id: 'express',
      label: 'Express',
      category: 'backend',
      order: 9,
      projectIds: [],
    },
    {
      id: 'fastify',
      label: 'Fastify',
      category: 'backend',
      order: 10,
      projectIds: ['race-day'],
    },
    {
      id: 'auth0',
      label: 'Auth0',
      category: 'backend',
      order: 11,
      projectIds: [],
    },
    {
      id: 'appwrite',
      label: 'Appwrite',
      category: 'backend',
      order: 12,
      projectIds: ['music-manager'],
    },
    {
      id: 'postgresql',
      label: 'PostgreSQL',
      category: 'data',
      order: 13,
      projectIds: ['race-day'],
    },
    {
      id: 'mongodb',
      label: 'MongoDB',
      category: 'data',
      order: 14,
      projectIds: ['music-manager'],
    },
    {
      id: 'docker',
      label: 'Docker',
      category: 'delivery',
      order: 15,
      projectIds: ['portfolio-site'],
    },
    {
      id: 'git-github',
      label: 'Git / GitHub',
      category: 'delivery',
      order: 16,
      projectIds: ['portfolio-site', 'music-manager', 'race-day'],
    },
    {
      id: 'jest-supertest',
      label: 'Jest / Supertest',
      category: 'delivery',
      order: 17,
      projectIds: [],
    },
    {
      id: 'aws-cicd-copilot',
      label: 'AWS CI/CD Pipelines & Copilot',
      category: 'delivery',
      order: 18,
      projectIds: [],
    },
  ],
  approach: {
    summary:
      'I work from the user outcome backwards, turning broad requirements into clear flows, practical delivery slices, and interfaces that feel deliberate rather than overloaded.',
    process: [
      {
        title: 'Clarify the working brief',
        description:
          'I start by pinning down the user path, business constraint, and edge conditions so implementation decisions stay tied to the real problem instead of assumptions.',
      },
      {
        title: 'Build the smallest credible solution',
        description:
          'I prefer composable components, data-driven content, and incremental changes that are easy to review, extend, and keep stable under real usage.',
      },
      {
        title: 'Refine with evidence',
        description:
          'Once the core flow works, I tighten motion, hierarchy, accessibility, and operational details so the finished product feels polished as well as functional.',
      },
    ],
    adaptabilityStatement:
      'I am comfortable moving between product thinking, interface design, and implementation detail, adjusting depth and tooling to the constraints of each project without losing delivery momentum.',
  },
  learningAdaptability: [
    {
      example: 'MERN & PERN Stack Mastery',
      description:
        'Successfully transitioned from a business background into full-stack development, learning both MongoDB- and PostgreSQL-based application delivery within a year.',
    },
    {
      example: 'Cloud Architecture Adoption',
      description:
        'Rapidly adopted AWS services including ECS, S3, Lambda, and CI/CD pipelines for enterprise banking applications.',
    },
    {
      example: 'DevOps Integration',
      description:
        'Applied Docker, Git, GitHub Actions, and automated testing practices to improve delivery speed and reliability.',
    },
    {
      example: 'Agile Methodology',
      description:
        "Shifted from traditional commercial practice into Lean and Agile delivery models while completing the full-stack programme with straight A's.",
    },
  ],
} satisfies PersonalData

export default personalData

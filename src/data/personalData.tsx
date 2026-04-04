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

export interface SkillItem {
  skill: string
  stars: number
}

export interface LearningAdaptabilityItem {
  example: string
  description: string
}

export interface PersonalData {
  profile: ProfileData
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillItem[]
  learningAdaptability: LearningAdaptabilityItem[]
}

const personalData = {
  profile: {
    fullName: 'Warrick Smith',
    headline: 'Full Stack Web Developer',
    location: 'Auckland, New Zealand',
    summary:
      'Full stack developer with production experience across banking, cloud delivery, and customer-facing products. I enjoy turning business needs into practical software with clear UX, reliable systems, and maintainable code.',
    githubUrl: 'https://github.com/WarrickSmith?tab=repositories',
    experienceStartDate: '2021-06-01',
    facts: [
      { label: 'Name', value: 'Warrick Smith' },
      { label: 'Nationality', value: 'New Zealand' },
      { label: 'Status', value: 'Available' },
      { label: 'Languages', value: 'English' },
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
    { skill: 'HTML', stars: 4 },
    { skill: 'Auth0', stars: 3 },
    { skill: 'CSS', stars: 3 },
    { skill: 'Docker', stars: 3 },
    { skill: 'JavaScript', stars: 4 },
    { skill: 'PostgreSQL', stars: 3 },
    { skill: 'Jest / Supertest', stars: 3 },
    { skill: 'MongoDB', stars: 3 },
    { skill: 'Node.js', stars: 4 },
    { skill: 'Git / GitHub', stars: 4 },
    { skill: 'Express', stars: 3 },
    { skill: 'AWS CI/CD Pipelines & Copilot', stars: 3 },
  ],
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

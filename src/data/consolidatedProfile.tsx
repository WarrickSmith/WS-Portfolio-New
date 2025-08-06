import data from './personalData'

// Consolidated profile data structure combining experience, education, and skills
export interface ConsolidatedProfile {
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillItem[]
  totalYearsExperience: number
  learningAdaptability: LearningAdaptabilityItem[]
}

export interface ExperienceItem {
  role: string
  period: string
  description: string
}

export interface EducationItem {
  qualification: string
  university: string
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

// Calculate total years of developer experience from June 2021
const calculateTotalYearsExperience = (): number => {
  const startDate = new Date('2021-06-01')
  const currentDate = new Date()

  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25)

  return Math.floor(diffYears)
}

// Learning adaptability examples
const learningAdaptability = [
  {
    example: 'MERN & PERN Stack Mastery',
    description:
      'Successfully transitioned from business background to full-stack development, mastering both MERN (MongoDB, Express, React, Node.js) and PERN (PostgreSQL, Express, React, Node.js) technology stacks within 12 months',
  },
  {
    example: 'Cloud Architecture Adoption',
    description:
      'Rapidly adopted AWS cloud services including ECS, S3, Lambda, and CI/CD pipelines for enterprise banking applications, demonstrating ability to learn complex cloud infrastructure',
  },
  {
    example: 'DevOps Integration',
    description:
      'Learned and implemented Docker containerization, Git/GitHub Actions workflows, and automated testing with Jest/Supertest to streamline development processes',
  },
  {
    example: 'Agile Methodology',
    description:
      "Adapted from traditional business practices to Lean and Agile development methodologies, achieving straight A's in full-stack development program",
  },
]

// Consolidated profile data
const consolidatedProfile: ConsolidatedProfile = {
  experience: data.experience,
  education: data.education,
  skills: data.skills,
  totalYearsExperience: calculateTotalYearsExperience(),
  learningAdaptability: learningAdaptability,
}

export default consolidatedProfile

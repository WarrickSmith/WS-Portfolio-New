import personalData, {
  type EducationItem,
  type ExperienceItem,
  type LearningAdaptabilityItem,
  type SkillItem,
} from './personalData'

export interface ConsolidatedProfile {
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillItem[]
  totalYearsExperience: number
  learningAdaptability: LearningAdaptabilityItem[]
}

const calculateTotalYearsExperience = (startDate: string): number => {
  const parsedStartDate = new Date(startDate)

  if (Number.isNaN(parsedStartDate.getTime())) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'Invalid personalData.profile.experienceStartDate value:',
        startDate
      )
    }
    return 0
  }

  const diffTime = Math.max(0, Date.now() - parsedStartDate.getTime())
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25)

  return Math.floor(diffYears)
}

const consolidatedProfile: ConsolidatedProfile = {
  experience: personalData.experience,
  education: personalData.education,
  skills: personalData.skills,
  totalYearsExperience: calculateTotalYearsExperience(
    personalData.profile.experienceStartDate
  ),
  learningAdaptability: personalData.learningAdaptability,
}

export default consolidatedProfile

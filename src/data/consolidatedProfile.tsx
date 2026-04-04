import personalData, {
  type EducationItem,
  type ExperienceItem,
  type LearningAdaptabilityItem,
  type SkillItem,
} from './personalData'
import portfolioData, {
  type PortfolioProject,
  type PortfolioProjectId,
} from './portfolioData'

export interface ConsolidatedSkillItem extends SkillItem {
  linkedProjects: PortfolioProject[]
  primaryProjectId: PortfolioProjectId | null
  primaryProjectTitle: string | null
  primaryProjectAriaLabel: string | null
}

export interface ConsolidatedProfile {
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: ConsolidatedSkillItem[]
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

const portfolioProjectsById = new Map(
  portfolioData.map((project) => [project.id, project] satisfies [
    PortfolioProjectId,
    PortfolioProject,
  ])
)

const skills = personalData.skills.map<ConsolidatedSkillItem>((skill) => {
  const linkedProjects = skill.projectIds
    .map((projectId) => portfolioProjectsById.get(projectId))
    .filter((project): project is PortfolioProject => project !== undefined)

  const primaryProject = linkedProjects[0] ?? null

  return {
    ...skill,
    linkedProjects,
    primaryProjectId: primaryProject?.id ?? null,
    primaryProjectTitle: primaryProject?.title ?? null,
    primaryProjectAriaLabel: primaryProject
      ? `View ${primaryProject.title} as proof for ${skill.label}`
      : null,
  }
})

const consolidatedProfile: ConsolidatedProfile = {
  experience: personalData.experience,
  education: personalData.education,
  skills,
  totalYearsExperience: calculateTotalYearsExperience(
    personalData.profile.experienceStartDate
  ),
  learningAdaptability: personalData.learningAdaptability,
}

export default consolidatedProfile

import personalData, {
  type ApproachData,
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

export interface ProjectRelatedSkill {
  id: SkillItem['id']
  label: string
  category: SkillItem['category']
  ariaLabel: string
}

export interface ConsolidatedProfile {
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: ConsolidatedSkillItem[]
  approach: ApproachData
  totalYearsExperience: number
  relatedSkillsByProjectId: Record<PortfolioProjectId, ProjectRelatedSkill[]>
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

const relatedSkillsByProjectId: Record<
  PortfolioProjectId,
  ProjectRelatedSkill[]
> = {
  'portfolio-site': [],
  'music-manager': [],
  'race-day': [],
}

portfolioData.forEach((project) => {
  relatedSkillsByProjectId[project.id] = skills
    .filter((skill) => skill.projectIds.includes(project.id))
    .map((skill) => ({
      id: skill.id,
      label: skill.label,
      category: skill.category,
      ariaLabel: `View ${skill.label} in the About Me skills section`,
    }))
})

const consolidatedProfile: ConsolidatedProfile = {
  experience: personalData.experience,
  education: personalData.education,
  skills,
  approach: personalData.approach,
  totalYearsExperience: calculateTotalYearsExperience(
    personalData.profile.experienceStartDate
  ),
  relatedSkillsByProjectId,
  learningAdaptability: personalData.learningAdaptability,
}

export default consolidatedProfile

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faBriefcase,
  faCalendar,
  faCode,
  faComments,
  faCompass,
  faEnvelope,
  faGraduationCap,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

const iconMap: Record<string, IconDefinition> = {
  faArrowUpRightFromSquare,
  faBriefcase,
  faCalendar,
  faCode,
  faComments,
  faCompass,
  faEnvelope,
  faGithub,
  faGraduationCap,
  faLocationDot,
  faUser,
}

type FaIconProps = {
  icon: string
  className?: string
}

const FaIcon = ({ icon, className }: FaIconProps) => {
  const iconDefinition = iconMap[icon]

  if (!iconDefinition) {
    // Handle error if icon is not found
    return <div>Icon not found</div>
  }

  return <FontAwesomeIcon icon={iconDefinition} className={className} />
}

export default FaIcon

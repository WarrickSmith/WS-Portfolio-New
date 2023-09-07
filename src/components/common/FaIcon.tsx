import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons/faLinkedin'

const iconMap: { [key: string]: IconDefinition } = {
  faSuitcase: icons.faSuitcase,
  faCoffee: icons.faCoffee,
  faIdCard: icons.faIdCard,
  faEnvelopeOpen: icons.faEnvelopeOpen,
  faEnvelope: icons.faEnvelope,
  faComments: icons.faComments,
  faPhone: icons.faPhone,
  faImagePortrait: icons.faImagePortrait,
  faLinkedin: brandIcons.faLinkedin,
}

const FaIcon = ({ icon, className }: { icon: string, className?: string }) => {
     const IconComponent = iconMap[icon]
    return <FontAwesomeIcon icon={IconComponent} className={className} />
}

export default FaIcon
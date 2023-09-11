import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { IconName as SolidIconName } from '@fortawesome/free-solid-svg-icons'
import { IconName as BrandIconName } from '@fortawesome/free-brands-svg-icons'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import * as brandIcons from '@fortawesome/free-brands-svg-icons'

type IconMap = {
  [key in SolidIconName | BrandIconName]: IconDefinition
}

const icons = solidIcons as unknown as IconMap
const brandIconsMap = brandIcons as unknown as IconMap

const FaIcon = ({ icon, className }: { icon: string; className?: string }) => {
  let IconComponent: IconDefinition | null = null

  if (icons[icon as SolidIconName]) {
    IconComponent = icons[icon as SolidIconName]
  } else if (brandIconsMap[icon as BrandIconName]) {
    IconComponent = brandIconsMap[icon as BrandIconName]
  } else {
    // Handle error if icon is not found
    return <div>Icon not found</div>
  }

  return <FontAwesomeIcon icon={IconComponent} className={className} />
}

export default FaIcon

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  href: string
  title: string
  points: string[]
  image: string
  target: string
}

const BulletPoints: React.FC<Props> = ({ href, title, points, image, target }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      className="relative block h-full overflow-hidden rounded-radius-sm bg-center bg-no-repeat text-text-primary no-underline"
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'contain' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <motion.div
        className="flex h-full flex-col bg-accent-primary"
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? '0%' : '100%',
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex min-h-20 items-center justify-center px-4 pt-4 text-center text-callout font-semibold">
          {title}
        </div>
        <ul className="m-0 flex-1 list-disc px-8 pb-6 text-supporting leading-relaxed">
          {points.map((point, index) => (
            <li key={`${title}_${index}`}>{point}</li>
          ))}
        </ul>
      </motion.div>
    </motion.a>
  )
}

export default BulletPoints

import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface Props {
  href: string
  title: string
  points: string[]
  image: string
}

const Container = styled(motion.a)`
  position: relative;
  cursor: pointer;
  text-decoration: none;
  border-radius: 0.5rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  overflow: hidden;
`

const TextContainer = styled(motion.div)`
  font-size: 1.5rem;
  position: relative;
  background-color: var(--color-alt);
  height: 100%;
`

const Title = styled(motion.div)`
  font-size: var(--fs-sm);
  color: white;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Bullets = styled(motion.ul)`
  color: white;
  font-size: var(--fs-xsm);
`

const BulletPoint = styled(motion.li)`
  font-size: var(--fs-xsm);
`

const BulletPoints: React.FC<Props> = ({ href, title, points, image }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Container
      href={href}
      initial={{ backgroundImage: `url(${image})` }}
      whileHover={{
        backgroundImage: 'none',
        transition: { duration: 0.5 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TextContainer
        initial={{ opacity: 0, translateY: '100%' }}
        animate={{
          opacity: isHovered ? 1 : 0,
          translateY: isHovered ? '0%' : '100%',
        }}
        transition={{ duration: 0.5 }}
      >
        <Title>{title}</Title>
        <Bullets>
          {points.map((point, index) => (
            <BulletPoint key={index}>{point}</BulletPoint>
          ))}
        </Bullets>
      </TextContainer>
    </Container>
  )
}

export default BulletPoints

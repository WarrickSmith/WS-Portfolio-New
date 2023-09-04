import styled from 'styled-components'
import { motion } from 'framer-motion'

interface Props {
  title: string
  points: string[]
  image: string
}

const Container = styled(motion.a)`
  position: relative;
  cursor: pointer;
  border-radius: 0.5rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
`

const TextContainer = styled(motion.div)`
  position: relative;
  background-color: var(--color-alt);
  height: 100%;
`

const Title = styled.h1`
  color: white;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Bullets = styled.ul`
  color: white;
`

const BulletPoint = styled.li``

const BulletPoints: React.FC<Props> = ({ title, points, image }) => {
  return (
      <Container
        initial={{ backgroundImage: `url(${image})` }}
        whileHover={{
          backgroundImage: 'none',
          transition: { duration: 1 },
        }}
        animate={{ transition: { duration: 1 } }}
      >
        <TextContainer
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, transition: { duration: 1 } }}
          animate={{ transition: { duration: 1 } }}
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

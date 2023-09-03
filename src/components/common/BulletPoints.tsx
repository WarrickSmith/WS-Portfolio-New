import styled from 'styled-components'
import { motion } from 'framer-motion'

interface Props {
  title: string
  points: string[]
  image: string
}

const Container = styled(motion.div)`
  position: relative;
  width: 320px;
  height: 270px;
  background-size: cover;
  background-position: center;
`

const TextContainer = styled(motion.div)`
  position: absolute;
  background-color: orange;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Title = styled.h1`
  color: white;
`

const Bullets = styled.ul`
  color: white;
`

const BulletPoint = styled.li``

const Background = styled(motion.div)`
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 320px;
  height: 280px;
`

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

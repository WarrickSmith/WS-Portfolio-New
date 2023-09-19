import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Education from './Education'
import Experience from './Experience'
import Skills from './Skills'

type PageDisplayProps = {
  selectedOption: string
}

interface ComponentProps {
  zIndex: number
  offset: number
}

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
`

const Component = styled(motion.div)<ComponentProps>`
  position: absolute;
  width: 93%;
  z-index: ${(props) => props.zIndex};
  border: 1px solid var(--color);
  border-radius: 0.5rem;
  top: ${(props) => -props.offset * 4 + 60}px;
  left: ${(props) => props.offset}px;
`

const Cell4: React.FC<PageDisplayProps> = ({ selectedOption }) => {
  const trackCard = {
    offset: 0,
    zIndex: 3,
  }

  trackCard.offset =
    selectedOption === 'experience'
      ? 0
      : selectedOption === 'education'
      ? 10
      : selectedOption === 'skills'
      ? 20
      : 0

  trackCard.zIndex =
    selectedOption === 'experience'
      ? 3
      : selectedOption === 'education'
      ? 2
      : selectedOption === 'skills'
      ? 1
      : 3

  return (
    <Container>
      <AnimatePresence>
        {selectedOption === 'experience' ? (
          <Component
            key="experience"
            initial={{ x: 0, y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{}}
            transition={{ duration: 0.5 }}
            zIndex={3}
            offset={0}
          >
            <Experience />
          </Component>
        ) : (
          <Component
            key="noexperience"
            initial={{ x: trackCard.offset, y: trackCard.offset }}
            animate={{ x: trackCard.offset, y: trackCard.offset }}
            exit={{}}
            transition={{ duration: 0.5 }}
            zIndex={trackCard.zIndex}
            offset={trackCard.offset}
          >
            <Experience />
          </Component>
        )}

        {selectedOption === 'education' ? (
          <Component
            key="education"
            initial={{ x: 0, y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{}}
            transition={{ duration: 0.5 }}
            zIndex={3}
            offset={0}
          >
            <Education />
          </Component>
        ) : (
          <Component
            key="noeducation"
            initial={{ x: 10, y: 10 }}
            animate={{ x: 10, y: 10 }}
            exit={{}}
            transition={{ duration: 0.5 }}
            zIndex={2}
            offset={10}
          >
            <Experience />
          </Component>
        )}

        {selectedOption === 'skills' ? (
          <Component
            key="skills"
            initial={{ x: 0, y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{}}
            transition={{ duration: 0.5 }}
            zIndex={3}
            offset={0}
          >
            <Skills />
          </Component>
        ) : (
          <Component
            key="noskills"
            initial={{ x: 20, y: 20 }}
            animate={{ x: 20, y: 20 }}
            exit={{}}
            transition={{ duration: 0.5 }}
            zIndex={1}
            offset={20}
          >
            <Experience />
          </Component>
        )}
      </AnimatePresence>
    </Container>
  )
}

export default Cell4
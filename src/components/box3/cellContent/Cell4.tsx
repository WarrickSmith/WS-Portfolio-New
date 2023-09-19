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
  top: ${(props) => -props.offset+40}px;
  left: ${(props) => props.offset}px;
  transition: z-index 0.5s, transform 0.5s;
`

const Cell4: React.FC<PageDisplayProps> = ({ selectedOption }) => {
  const components = [
    { key: 'experience', zIndex: 3, offset: 0 },
    { key: 'education', zIndex: 2, offset: 10 },
    { key: 'skills', zIndex: 1, offset: 20 },
  ]

  const selectedComponent = components.find(
    (component) => component.key === selectedOption
  )
  
  const zIndex3Component = components.find(
    (component) => component.zIndex === 3
  )

  if (selectedComponent && zIndex3Component) {
    const tempZIndex = selectedComponent.zIndex
    const tempOffset = selectedComponent.offset

    selectedComponent.zIndex = zIndex3Component.zIndex
    selectedComponent.offset = zIndex3Component.offset

    zIndex3Component.zIndex = tempZIndex
    zIndex3Component.offset = tempOffset
  }

  return (
    <Container>
      <AnimatePresence>
        {components.map((component) => (
          <Component
            key={component.key}
            animate={{ x: component.offset, y: -component.offset}}
            exit={{}}
            transition={{ duration: 0.5 }}
            zIndex={component.zIndex}
            offset={component.offset}
          >
            {component.key === 'experience' && <Experience />}
            {component.key === 'education' && <Education />}
            {component.key === 'skills' && <Skills />}
          </Component>
        ))}
      </AnimatePresence>
    </Container>
  )
}

export default Cell4

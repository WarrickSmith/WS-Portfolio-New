import styled from 'styled-components'
import YearsExperience from './YearsExperience'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;
`

const Cell3: React.FC = () => {
  return (
    <Container>
      <YearsExperience />
    </Container>
  )
}

export default Cell3

import styled from 'styled-components'
import ConsolidatedSummary from './ConsolidatedSummary'

const Container = styled.div`
  position: relative;
  width: 100%;
`

const Cell4: React.FC = () => {
  return (
    <Container>
      <ConsolidatedSummary />
    </Container>
  )
}

export default Cell4

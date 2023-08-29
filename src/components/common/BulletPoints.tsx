import styled from 'styled-components'

interface BulletPointsProps {
  bulletPoints: string[]
}

const BulletPointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 0 2rem 1.5rem;
  background-color: var(--bg-color-alt);
  color: var(--color-alt);
  font-size: var(--fs-xsm);
`

const BulletPointItem = styled.span`
  margin-bottom: 0.5rem;
  &:before {
    content: '•';
    margin-right: 0.5rem;
    color: var(--color);
  }
`

const BulletPoints: React.FC<BulletPointsProps> = ({ bulletPoints }) => {
  return (
    <BulletPointsContainer>
      {bulletPoints.map((bulletPoint, index) => (
        <BulletPointItem key={index}>{bulletPoint}</BulletPointItem>
      ))}
    </BulletPointsContainer>
  )
}

export default BulletPoints
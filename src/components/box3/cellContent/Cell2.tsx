import styled from 'styled-components'
import WsImage from './WsImage'

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media (max-width: 320px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`

const StyledInfo = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.span`
  font-weight: 500;
  color: var(--color-alt);
`

const Value = styled.span`
  margin-left: 1rem;
  font-weight: 400;
`

interface InfoItemProps {
  label: string
  value: string
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <StyledInfo>
    <Label>{label}</Label>
    <Value>{value}</Value>
  </StyledInfo>
)

const Cell2 = () => (
  <InfoContainer>
    <div>
      <InfoItem label="First Name:" value="Warrick" />
      <InfoItem label="Last Name:" value="Smith" />
      <InfoItem label="Nationality:" value="New Zealand" />
      <InfoItem label="Employment Status:" value="Available" />
      <InfoItem label="Phone:" value="+64 21 0248 8139" />
      <InfoItem label="Address:" value="Auckland, New Zealand" />
      <InfoItem label="Spoken Languages:" value="English" />
    </div>
    <WsImage />
  </InfoContainer>
)

export default Cell2

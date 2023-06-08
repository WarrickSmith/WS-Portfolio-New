import React from 'react'
import styled from 'styled-components'
import DisplayImage from './DisplayImage'
import Box2 from './Box2/Box2'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: calc(100% - 3rem);
  height: calc(100% - 3rem);
  grid-gap: 2rem;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
`

const FullHeightBox = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  background-color: lightcyan;

  text-align: center;

  height: 100%;
  width: 100%;
`

const EqualHeightBox = styled.div`
  background-color: lightcyan;
    text-align: center;
  border: 2px solid blue;
  border-radius: 14px;
  height: 100%;
  width: 100%;
`


const MainPage: React.FC = () => {
  return (
    <GridContainer>
      <FullHeightBox>
        <DisplayImage />
      </FullHeightBox>
      <EqualHeightBox><Box2/></EqualHeightBox>
      <EqualHeightBox>Box 3</EqualHeightBox>
      <EqualHeightBox>Box 4</EqualHeightBox>
      <EqualHeightBox>Box 5</EqualHeightBox>
    </GridContainer>
  )
}

export default MainPage

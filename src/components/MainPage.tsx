import React from 'react'
import styled from 'styled-components'
import DisplayImage from './DisplayImage'
import Box2 from './box2/Box2'
import Box3 from './box3/Box3'
import Box4 from './box4/Box4'
import Box5 from './box5/Box5'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: calc(100% - 3rem);
  height: calc(100% - 3rem);
  grid-gap: 1.5rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`

const PictureBox = styled.div`
  background: var(--bg-color);
  grid-row: 1 / span 2;
  height: 100%;
  width: 100%;
  overflow: hidden;
  text-align: center;

  @media (max-width: 768px) {
    /* grid-row: 1 / span 1;
    border: 0.05rem solid white;
    border-radius: 1rem; */
    display: none;
  }
`

const Box = styled.div`
  text-align: center;
  border: 0.05rem solid white;
  border-radius: 1rem;
  height: 100%;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const GridBox = styled(Box)`
  background: var(--bg-color);
`

const GridBoxGrey = styled(Box)`
  background: var(--bg-color-alt);
  cursor: pointer;
`


const MainPage: React.FC = () => {
  return (
    <GridContainer>
      <PictureBox>
        <DisplayImage />
      </PictureBox>
      <GridBox>
        <Box2 />
      </GridBox>
      <GridBoxGrey>
        <Box3 />
      </GridBoxGrey>
      <GridBoxGrey>
        <Box4 />
      </GridBoxGrey>
      <GridBoxGrey>
        <Box5 />
      </GridBoxGrey>
    </GridContainer>
  )
}

export default MainPage

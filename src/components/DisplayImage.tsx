import React from 'react'
import styled from 'styled-components'

const MyImage = styled.img`
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  height: calc(100%);
  width: 100%;
  object-fit: cover;
  margin: auto;

  @media (max-width: 768px) {
    grid-row: 1 / span 2;
    grid-column: 1 / span 1;
    height: calc(100%);
    width: 30%;
    object-fit: cover;
  }
` 

const DisplayImage: React.FC = () => {
  const imageSource = 'https://warricksmith.com/images/warrick.jpg'
  const imageAltText = 'wsImage'
  return <MyImage src={imageSource} alt={imageAltText} />    
}

export default DisplayImage

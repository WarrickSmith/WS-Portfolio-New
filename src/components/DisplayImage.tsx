import React from 'react'
import styled from 'styled-components'

const MyImage = styled.img`
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  height: calc(
    100vh - 3rem
    ); /* Set the initial height to 100% of the parent container */
    width: 100%;
  object-fit: cover;
` 

const DisplayImage: React.FC = () => {
  const imageSource = './src/assets/warrick.jpg'
  const imageAltText = 'wsImage'

  return (
    <div>
      <MyImage src={imageSource} alt={imageAltText} />
    </div>
  )
}

export default DisplayImage

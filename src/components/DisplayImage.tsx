import React from 'react'

const DisplayImage: React.FC = () => {
  const imageSource = './src/assets/warrick.jpg'
  const imageAltText = 'wsImage'

  return (
    <div>
      <img src={imageSource} alt={imageAltText} />
    </div>
  )
}

export default DisplayImage

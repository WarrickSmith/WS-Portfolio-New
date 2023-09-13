import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const PageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
`

const Page = styled.div`
  width: 300px;
  height: 400px;
  background-color: #eee;
  border-radius: 10px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`

type PageDisplayProps = {
  selectedOption: string
}

const Cell4: React.FC<PageDisplayProps> = ({ selectedOption }) => {
  return (
    <PageContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {selectedOption === 'experience' && <Page>Experience Page</Page>}
      {selectedOption === 'education' && <Page>Education Page</Page>}
      {selectedOption === 'skills' && <Page>Skills Page</Page>}
    </PageContainer>
  )
}

export default Cell4
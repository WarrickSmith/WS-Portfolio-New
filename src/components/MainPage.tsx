import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  grid-gap: 1rem;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  background-color: grey;

  /* gap: 2.5rem 1.5rem; */
  /* list-style: none; */
  padding: 0 1rem;
  /* margin: 0; */
`;

const FullHeightBox = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  /* background-color: #eaeaea; */
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 2px solid blue;
`;

const EqualHeightBox = styled.div`
  background-color: #eaeaea;
  /* background-color: #f1f1f1; */
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 2px solid blue;
`;

const MainPage: React.FC = () => {
  return (
    <GridContainer>
      <FullHeightBox>Box 1</FullHeightBox>
      <EqualHeightBox>Box 2</EqualHeightBox>
      <EqualHeightBox>Box 3</EqualHeightBox>
      <EqualHeightBox>Box 4</EqualHeightBox>
      <EqualHeightBox>Box 5</EqualHeightBox>
    </GridContainer>
  );
};

export default MainPage;

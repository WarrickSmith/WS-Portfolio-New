import { useState } from 'react';
import MainPage from './components/MainPage';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <Container>
      <MainPage />
    </Container>
  );
};

export default App;

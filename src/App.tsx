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
      <MainPage>
        <div>
          <h1>Main Page</h1>
          <p>This is the main page of the React app.</p>
          <button onClick={() => setCounter(counter + 1)}>
            Click to increment counter
          </button>
          <p>The counter is currently at {counter}</p>
        </div>
        <div>Box2</div>
        <div>Box3</div>
        <div>Box4</div>
        <div>Box5</div>
      </MainPage>
    </Container>
  );
};

export default App;

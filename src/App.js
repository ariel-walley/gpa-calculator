import React from 'react';
import styled from 'styled-components';
import Calculator from './calculator';

const Body = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.h1`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: #0F52BA;
  color: white;
  font-size: 40px;
  font-weight: 700;
  text-align: center;  
`;

class App extends React.Component {

  render() {
    return(
      <Body>
        <Header>GPA Calculator</Header>
        <Calculator/>
      </Body>
    )
  }

}

export default App;


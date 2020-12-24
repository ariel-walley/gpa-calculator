import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const Header = styled.h1`
  margin: 0 auto;
  padding: 15px;
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
      </Body>
    )
  }

}

export default App;


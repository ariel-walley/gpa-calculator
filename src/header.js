import React from 'react';
import styled from 'styled-components';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { StylesProvider } from "@material-ui/core/styles";

const MainHeaderWrapper = styled.div`
  width: 100%;
  min-height: 70px;
  padding: 0; 
  margin: 0; 
  background-color: #0F52BA;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: nowrap;
`;

const MainHeaderText = styled.h1`
  position: absolute;
  color: white;
  font-size: 35px;
  font-weight: 700;
  text-align: center;
`;

const MainHeaderMenu = styled(MenuRoundedIcon)`
  font-size: 50px;
  color: white;
  margin-left: auto;
`;

class MainHeader extends React.Component {
  render() {
    return(
      <StylesProvider injectFirst>
        <MainHeaderWrapper>
          <MainHeaderText>GPA Calculator</MainHeaderText>
          <MainHeaderMenu/>
        </MainHeaderWrapper>
      </StylesProvider>
    )
  }
}

export default MainHeader;
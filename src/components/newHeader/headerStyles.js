import styled from 'styled-components';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

export const MainHeaderWrapper = styled.header`
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

export const MainHeaderText = styled.h1`
  position: absolute;
  color: white;
  font-size: 35px;
  font-weight: 700;
  text-align: center;
`;

export const MainHeaderMenu = styled(MenuRoundedIcon)`
  padding: 0 15px;
  font-size: 40px;
  color: white;
  margin-left: auto;
`;
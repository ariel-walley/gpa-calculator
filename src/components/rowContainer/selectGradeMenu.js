import React from 'react';  
import { useSelector } from 'react-redux';
import { selectGrades } from '../../redux/gradesSlice';

import styled from 'styled-components';
import { StylesProvider } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu'; 
import MenuItem from '@material-ui/core/MenuItem';  
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


/* Styles for the input */
const GradeInput = styled.div`
  height: 20px;
  width: 90px;
  margin: 0 5px;
  padding: 0px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid darkgray;  
  border-radius: 5px;
  font-size: 17px;
  text-align: center;
`;
  
const InputText = styled.div`
  position: absolute;
`;

const MenuIcon = styled(ExpandMoreIcon)`
  margin-left: auto;
`;

/* Styles for the menu and menu items */

const GradeOption = styled(MenuItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  min-height: 25px;
  width: 75px;
  text-align: center;
`;

export default function GradeSelector (props) {  
  const [anchorEl, open] = React.useState(null);  
  const grades = useSelector(selectGrades);
  const handleClick = event => {  
    open(event.currentTarget);  
  };

  const handleClose = async (event) => { //On menu close, update state with the new grade and re-calculate the gpa
    let id = event.target.id;

    if (id) {
      await props.function1(document.getElementById(id).innerHTML[0], props.row); //update state
      props.function2(); // re-calculate the gpa
    }

    open(null);  
  };  

  const menuOptions = () => {
    let grades = [' ', 'A', 'B', 'C', 'D', 'F'];
    let display = [];

    grades.forEach((grade) => {
      display.push(<GradeOption onClick={handleClose} key={'Row' + props.row + grade + "grade"} id={'Row' + props.row + grade + "grade"}>{grade}</GradeOption>)
    });

    return (
      <Menu  
        id={"GradeMenu" + props.row}
        key={"GradeMenu" + props.row}
        anchorEl={anchorEl}  
        keepMounted  
        open={Boolean(anchorEl)}  
        onClose={handleClose}  
      > 
        {display}
      </Menu>  
    )
  }
  
  return (
    <>    
      <StylesProvider injectFirst>
        <div>
          <GradeInput aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <InputText>{grades['row' + props.row]}</InputText>
            <MenuIcon/>
          </GradeInput>
          {menuOptions()}
        </div>
      </StylesProvider>
    </>  
  );  
}  
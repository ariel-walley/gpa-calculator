import React from 'react';  
import { useSelector } from 'react-redux';
import { selectSemesters } from '../../redux/semestersSlice';

import styled from 'styled-components';
import { StylesProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';  
import Menu from '@material-ui/core/Menu';  
import MenuItem from '@material-ui/core/MenuItem';  
  
const StyledButton = styled(Button)`
  min-width: 0;
  padding: 0;
  margin: 0 12px 0 7px;
`;

export default function SemesterChangeMenu(props) { 
  const semesters = useSelector(selectSemesters); 

  const [anchorEl, open] = React.useState(null);  
  const handleClick = event => {  
    open(event.currentTarget);  
  };

  const handleClose = (event) => {
    let semIndex = event.target.id.indexOf('s'); 
    if (semIndex > -1) {
      let rowCount = parseInt(event.target.id.slice(4, semIndex));
      let newSemester = event.target.id.slice(semIndex);

      let currentSemester = ''
      Object.keys(semesters).forEach((sem) => {
        semesters[sem].rows.forEach((id) => {
          if (id === rowCount) {
            currentSemester = sem;
          }
        })
      })

      let stateObject = JSON.parse(JSON.stringify(semesters))
      
      let oldRowIndex = stateObject[currentSemester].rows.indexOf(rowCount);
      if (oldRowIndex > -1) {
        stateObject[currentSemester].rows.splice(oldRowIndex, 1);

        stateObject[newSemester].rows.push(rowCount);
      
        props.function(stateObject);
      }
    }
    open(null);  
  };  

  const menuOptions = () => {
    let display = [];

    Object.keys(semesters).forEach((sem) => {
      if (semesters[sem].name !== semesters[props.semester].name) {
        display.push(<MenuItem onClick={handleClose} key={"Menu" + props.id + sem} id={"Menu" + props.id + sem}>{semesters[sem].name}</MenuItem>)
      }
  });

    return (
      <Menu  
        id={"Menu" + props.id}
        key={"Menu" + props.id}
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
      <div> 
      <StylesProvider injectFirst> 
        <StyledButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>O</StyledButton>
        {menuOptions()}
      </StylesProvider>
      </div>  
    </>  
  );  
}  
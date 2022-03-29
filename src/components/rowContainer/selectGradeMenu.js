import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGrades, updateGrades } from '../../redux/gradesSlice';

import styled from 'styled-components';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export default function GradeSelector(props) {
  const dispatch = useDispatch()
  const grades = useSelector(selectGrades);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    let id = event.target.id;

    if (id) {
      dispatch(updateGrades({
        ...grades, ['row' + props.row]: document.getElementById(id).innerHTML[0]
      }))
    }

    setAnchorEl(null);
  };

  const menuOptions = () => {
    let gradeOptions = [' ', 'A', 'B', 'C', 'D', 'F'];
    let display = [];

    gradeOptions.forEach((grade) => {
      display.push(
        <GradeOption 
          onClick={handleClose} 
          key={'Row' + props.row + grade + "grade"}
          id={'Row' + props.row + grade + "grade"}
        >
          {grade}
        </GradeOption>
      )
    });

    return display;
  }

  return (
    <div>
      <GradeInput aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <InputText>{grades['row' + props.row]}</InputText>
        <MenuIcon/>
      </GradeInput>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuOptions()}
      </Menu>
    </div>
  );
}

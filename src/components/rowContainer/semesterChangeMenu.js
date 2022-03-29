import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSemesters, updateSemesters } from '../../redux/semestersSlice';

import styled from 'styled-components';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const StyledButton = styled(Button)`
  min-width: 0;
  padding: 0;
  margin: 0 12px 0 7px;
`;

export default function SemesterChangeMenu(props) {
  const semesters = useSelector(selectSemesters);
  const dispatch = useDispatch(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
      
        dispatch(updateSemesters(stateObject));
      }
    }

    setAnchorEl(null);
  };

  const menuOptions = () => {
    let display = [];

    Object.keys(semesters).forEach((sem) => {
      if (semesters[sem].name !== semesters[props.semester].name) {
        display.push(<MenuItem onClick={handleClose} key={"Menu" + props.id + sem} id={"Menu" + props.id + sem}>{semesters[sem].name}</MenuItem>)
      }
    });

    return display
  }

  return (
    <div>
      <StyledButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        O
      </StyledButton>
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

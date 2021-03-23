import React from 'react';  
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu'; 
import MenuItem from '@material-ui/core/MenuItem';  
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const GradeInput = styled.div`
  height: 20px;
  width: 90px;
  margin: 0 5px;
  padding: 0px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background-color: white;
  border: 2px solid darkgray;  
  border-radius: 5px;
  font-size: 17px;
  text-align: center;
`;
  
const InputText = styled.div`
  text-align: center;
  width: 100%;
`;

export default function GradeSelector (props) {  

  const [anchorEl, open] = React.useState(null);  
  const handleClick = event => {  
    open(event.currentTarget);  
  };

  const handleClose = async (event) => {

    let id = event.target.id;

    if (id) {
      await props.function1(document.getElementById(id).innerHTML[0], props.row); 
      props.function2();
    }

    open(null);  
  };  

  const menuOptions = () => {
    let grades = [' ', 'A', 'B', 'C', 'D', 'F'];
    let display = [];

    grades.forEach((grade) => {
      display.push(<MenuItem onClick={handleClose} key={'Row' + props.row + grade + "grade"} id={'Row' + props.row + grade + "grade"}>{grade}</MenuItem>)
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
      <div>  
        <GradeInput aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <InputText>{props.grades['row' + props.row]}</InputText>
          <ExpandMoreIcon/>
        </GradeInput>
        {menuOptions()}
      </div>  
    </>  
  );  
}  
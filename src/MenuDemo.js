import React from 'react';  
import Button from '@material-ui/core/Button';  
import Menu from '@material-ui/core/Menu';  
import MenuItem from '@material-ui/core/MenuItem';  
  
export default function MenuDemo(props) {  

  const [anchorEl, open] = React.useState(null);  
  const handleClick = event => {  
    open(event.currentTarget);  
  };

  const handleClose = (event) => {
    let semIndex = event.target.id.indexOf('s'); 
    if (semIndex > -1) {
      let rowNumber = parseInt(event.target.id.slice(4, semIndex));
      let newSemester = event.target.id.slice(semIndex);

      let currentSemester = ''
      Object.keys(props.state).forEach((sem) => {
        props.state[sem].rows.forEach((id) => {
          if (id === rowNumber) {
            currentSemester = sem;
          }
        })
      })

      let stateObject = props.state;
      
      let oldRowIndex = stateObject[currentSemester].rows.indexOf(rowNumber);
      if (oldRowIndex > -1) {
        stateObject[currentSemester].rows.splice(oldRowIndex, 1);

        stateObject[newSemester].rows.push(rowNumber);
      
        props.handleStateChange(stateObject);
      }
    }
    open(null);  
  };  

  const menuOptions = () => {
    let display = [];

    Object.keys(props.state).forEach((sem) => {
      if (props.state[sem].name !== props.state[props.semester].name) {
        display.push(<MenuItem onClick={handleClose} key={"Menu" + props.id + sem} id={"Menu" + props.id + sem}>{props.state[sem].name}</MenuItem>)
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
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>O</Button>
        {menuOptions()}
      </div>  
    </>  
  );  
}  
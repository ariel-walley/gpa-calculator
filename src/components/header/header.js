import React from 'react';
import * as styles from './headerStyles';

import styled from 'styled-components';
import { StylesProvider } from "@material-ui/core/styles";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';


const MainHeaderMenu = styled(MenuRoundedIcon)`
  padding: 0 15px;
  font-size: 40px;
  color: white;
  margin-left: auto;
`;

/*  EXPANDING MENU  */
const StyledList = styled(List)`
  width: 325px;
`;

/*  SETTINGS OPTIONS */
const StyledAccordionSummary = withStyles({
  root: {
      height: '40px',
      minHeight: 0
  },
})(AccordionSummary);

const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 16px;
`;

const SettingsOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  width: 275px;
  margin: 0;
  padding: 0;
`;

const SettingText = styled.div`
  margin: 0;
  padding: 0;
`;

const SettingInput = styled.input`
  margin: 0;
  padding: 0;
  height: 25px;
  width: 40px;
  text-align: center;
  border: 1px solid darkgray;
  border-radius: 5px;
`;

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: 0
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Error = styled.div`
  color: red;
  padding: 5px 0;
`;

export default function MainHeader () {  

  /*  Expanding Menu  */

  const [state, setState] = React.useState({
    menu: false
  });

  const toggleDrawer = (boolean) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    setState({ menu: boolean });
  };

  /*  Settings Accordion  */
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /*  Alert for upcoming pages */
  const handleClick = () => {
    alert(`This page is coming soon!`);
  }

  return(
    <>
      <StylesProvider injectFirst>
        <styles.MainHeaderWrapper>
            <styles.MainHeaderText>GPA Caaaalculator</styles.MainHeaderText>
            <MainHeaderMenu onClick={toggleDrawer(true)}/>
            <Drawer anchor={'right'} open={state.menu} onClose={toggleDrawer(false)}>
            <div
              role="presentation"
            >
              <StyledList>
                <ListItem button onClick={handleClick}>Tutorial</ListItem>
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <p>Settings</p>
                  </StyledAccordionSummary>
                  <StyledAccordionDetails>
                    <SettingsOptions>
                      <SettingRow>
                        <SettingText>Group by semester</SettingText>
                        <IOSSwitch name="checkSemesters" />
                      </SettingRow>
                      <SettingRow>
                          <SettingText>Default classes per semester</SettingText>
                          <SettingInput defaultValue="5"/>
                      </SettingRow>
                      <Error>Please select a value betweeen 1 and 12.</Error>
                    </SettingsOptions>
                  </StyledAccordionDetails>
                </Accordion>
                <ListItem button onClick={handleClick}>About</ListItem>
                <ListItem button onClick={handleClick}>Feedback</ListItem>
              </StyledList>
            </div>
            </Drawer>
        </styles.MainHeaderWrapper>
      </StylesProvider>
    </>
  )
}
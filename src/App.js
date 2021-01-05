import React from 'react';
import styled from 'styled-components';
import closeIcon from './close_icon.png';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';


const Body = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

/* Webpage Header */

const Header = styled.h1`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: #0F52BA;
  color: white;
  font-size: 40px;
  font-weight: 700;
  text-align: center;  
`;

/* Settings */
const SettingsHeader = styled.div`
  background-color: darkgray;
  margin-top: 30px;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SettingsTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-weight: 700;
`;

const SettingsContainer = styled.div`
  display: flex;
  background-color: lightgrey;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 250px;
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
  width: 15px;
`;

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
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

/* Calculator Container */

const CalcContainer = styled.div`
  margin-top: 30px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  background-color: darkgray;
`;

/* Calculator Header */

const TableHeader = styled.div`
  margin: 0;
  padding: 0 10px;
  background-color: #0F52BA;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.h1`
  margin: 5px 7px;
  padding: 0;
  color: white;
  font-size: 17px;
  font-weight: 700;
  text-align: center;
`;

const CourseHeader = styled(HeaderText)`
  width: 150px;
`;

const CreditHeader = styled(HeaderText)`
  width: 75px;
`;

const GradeHeader = styled(HeaderText)`
  width: 90px;
`;

const SpacerHeader = styled(HeaderText)`
  width: 18px;
`;

/* Calculator Row */

const Row = styled.div`
  height: 40px;
  margin: 0;
  padding: 0 10px;
  background-color: lightgrey;
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  margin: 0 5px;
  padding: 0px;
  border: 2px solid darkgray;
  border-radius: 5px;
  font-size: 17px;
  text-align: center;
`;

const CourseInput = styled(Input)`
  width: 150px;
`;

const CreditInput = styled(Input)`
  width: 75px;
`;

const GradeInput = styled(Input)`
  width: 90px;
`;

/* Calculator Add Row */

const AddRow = styled.div`
  background-color: lightgrey;
  margin: 0;
  padding: 7px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
`;

const RemoveRow = styled.img`
  margin: 0 5px;
  padding: 0;
  width: 20px;
  height: 20px;
`;

/* Calculator Total Row */

const TotalRow = styled.div`
  background-color: darkgray;
  margin: 0;
  padding: 10px 0;
  text-align: center;
  font-weight: 700;
`;

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      settings: true,
      semesters: true,
      rowNumber: 0,
      rows: [0],
      gpa: ''
    };

    this.toggleSettings = this.toggleSettings.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.toggleSemesters = this.toggleSemesters.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.calculateGPA = this.calculateGPA.bind(this);    
  }

  toggleSettings(){
    this.setState({ settings: !this.state.settings});
  }

  showSettings() {
    if (this.state.settings === true) {
      return (
        <SettingsContainer>
          <SettingRow>
            <SettingText>Group by semester</SettingText>
            <IOSSwitch checked={this.state.semesters} onChange={this.toggleSemesters} name="checkSemesters" />
          </SettingRow>
          <SettingRow>
            <SettingText>Default classes per semester</SettingText>
            <SettingInput/>
          </SettingRow>
        </SettingsContainer>
      )
    } else {
      return (<div></div>)
    }
  }

  toggleSemesters(){
    this.setState({ semesters: !this.state.semesters});
  }

  renderRows(){
    let display = [];
    this.state.rows.forEach((id) => {
      display.push(
        <Row key={'Row' + id} id={'Row' + id}>
        <CourseInput key={'Course' + id} id={'Course' + id} />
        <CreditInput key={'Credit' + id} id={'Credit' + id} onChange={this.calculateGPA}/>
        <GradeInput key={'Grade' + id} id={'Grade' + id} onChange={this.calculateGPA}/>
        <RemoveRow 
          src={closeIcon} 
          alt="X-shaped close button" 
          id={'Icon' + id} 
          onClick={this.removeRow}/>
      </Row>
      )
    });
    return display;
  }

  addRow() {
    let newRowNumber = this.state.rowNumber + 1;
    let newRows = this.state.rows;

    newRows.push(newRowNumber);

    this.setState({
      rows: newRows,
      rowNumber: newRowNumber
    });
  }

  removeRow(e) {   
    let id = parseInt(e.target.id.slice(4));
    let currentRows = this.state.rows;

    let index = currentRows.indexOf(id);

    if (index > -1) {
      currentRows.splice(index, 1);
    }

    this.setState({
      rows: currentRows
    })
    this.calculateGPA();
  }
 
  calculateGPA() {
    let gpaPoints = 0;
    let creditSum = 0;

    this.state.rows.forEach((id) => {
      let rowCredit = parseFloat(document.getElementById('Credit' + id).value);
      let rowGrade = document.getElementById('Grade' + id).value;

      if (rowCredit && rowGrade) {
        let gradeValue = 0;

        switch(rowGrade) {
          case 'A':
            gradeValue = 4;
            break;
          case 'B':
            gradeValue = 3;
            break;
          case 'C':
            gradeValue = 2;
            break;
          case 'D':
            gradeValue = 1;
            break;
          case 'F':
            gradeValue = 0;
            break;
          default:
            gradeValue = 'Error'
        }

        if (gradeValue !== 'Error') {
          let coursePoints = rowCredit * gradeValue;
          gpaPoints = gpaPoints + coursePoints;
          creditSum = creditSum + rowCredit;
        }
      }
    })
    
    let newGPA = (gpaPoints/creditSum).toFixed(2);
    
    if (newGPA !== 'NaN') {
      this.setState({
        gpa: newGPA
      })
    }
  }

  render() {
    return(
      <Body>
        <Header>GPA Calculator</Header>
        <SettingsHeader onClick={this.toggleSettings}>
          <SettingsRoundedIcon/>
          <SettingsTitle>Settings</SettingsTitle>
        </SettingsHeader>
          {this.showSettings()}
        <CalcContainer>
          <TableHeader>
            <CourseHeader>Course</CourseHeader>
            <CreditHeader>Credit Hours</CreditHeader>
            <GradeHeader>Grade</GradeHeader>
            <SpacerHeader/>
          </TableHeader>
          {this.renderRows()}
          <AddRow onClick={this.addRow}>+ Add Row</AddRow>
          <TotalRow>Overall GPA: {this.state.gpa}</TotalRow>
        </CalcContainer>
      </Body>
    )
  }
}

export default App;


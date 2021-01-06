import React from 'react';
import styled from 'styled-components';
import closeIcon from './close_icon.png';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import MenuDemo from './MenuDemo';

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

/* Calculator Semesters */

const SemesterHeader = styled.div`
  margin: 5px;
  padding: 0;
`;

const SemesterTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
`;

const SemesterInput = styled.input`
  width: 100px;
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
const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const AddRow = styled.div`
  margin: 5px 10px;
  padding: 0;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
`;

const RemoveIcon = styled.img`
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
      settings: false,
      showSemesters: true,
      semesterNumber: 0,
      semesterLoad: 5,
      rowNumber: 0,
      semesters: {
        s0: {
          name: "Semester 1",
          rows: [0],
          input: false
        }
      },
      menu: false,
      gpa: ''
    };

    this.toggleSettings = this.toggleSettings.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.toggleSemesters = this.toggleSemesters.bind(this);
    this.setSemesterLoad = this.setSemesterLoad.bind(this);
    this.addSemester = this.addSemester.bind(this);
    this.semesterInputToggle = this.semesterInputToggle.bind(this);
    this.showSemesterInput = this.showSemesterInput.bind(this);
    this.renameSemester = this.renameSemester.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
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
            <IOSSwitch checked={this.state.showSemesters} onChange={this.toggleSemesters} name="checkSemesters" />
          </SettingRow>
          <SettingRow>
            <SettingText>Default classes per semester</SettingText>
            <SettingInput defaultValue={this.state.semesterLoad} onChange={this.setSemesterLoad}/>
          </SettingRow>
        </SettingsContainer>
      )
    } else {
      return (<div></div>)
    }
  }

  toggleSemesters(){
    this.setState({ showSemesters: !this.state.showSemesters});
  }

  setSemesterLoad(e) {
    let load = e.target.value;
    
    if (load) {
      if (load > 0 && load < 13) {
        this.setState({
          semesterLoad: load
        })
      } else {
        console.log('Error! Please enter valid load between 1 and 12.') //Will later create an error message
      }
    }  
  }

  addSemester() {
    let newSemesterNumber = this.state.semesterNumber + 1;
    let semesterObject = this.state.semesters;
    let newRowNumber = this.state.rowNumber;

    let rows = [];

    for (let i = 0; i < parseInt(this.state.semesterLoad); i++) {
      newRowNumber++;
      rows.push(newRowNumber);
    }

    semesterObject['s' + newSemesterNumber] = {
      name: "Semester " + (newSemesterNumber + 1),
      rows: rows,
      input: false
    }

    this.setState({
      semesterNumber: newSemesterNumber,
      semesters: semesterObject,
      rowNumber: newRowNumber      
    });
  }

  semesterInputToggle(event) {
    let index = event.target.id.indexOf('s');

    if (index > -1) {
      let semID = event.target.id.slice(index);

      let semesterObject = this.state.semesters;

      semesterObject[semID].input = !semesterObject[semID].input

      this.setState({
        semesters: semesterObject
      });
    }
  }

  showSemesterInput(sem) {
    if (this.state.semesters[sem].input === true) {
      return(
        <SemesterInput key={'input' + sem} id={'input' + sem} onKeyUp={this.renameSemester}/>
      )
    } else {
      return (
        <SemesterTitle 
          key={'title' + sem} 
          id={'title' + sem} 
          onClick={this.semesterInputToggle}>
            {this.state.semesters[sem].name}
        </SemesterTitle>
      )
    }
  }

  renameSemester(event) {
    if (event.code === "Enter") {

      let index = event.target.id.indexOf('s');
      let semID = event.target.id.slice(index);

      let semesterObject = this.state.semesters;

      semesterObject[semID].name = event.target.value

      this.setState({
        semesters: semesterObject
      });

      this.semesterInputToggle(event);
    }
  }

  renderRows(){
    if (this.state.showSemesters === true) {
      let display = [];

      Object.keys(this.state.semesters).forEach((sem) => {
        display.push(
          <SemesterHeader key={'header' + sem} id={'header' + sem}>
            {this.showSemesterInput(sem)}
          </SemesterHeader>
        );

        this.state.semesters[sem].rows.forEach((id) => {
          display.push(
            <Row key={'Row' + id} id={'Row' + id}>
              <MenuDemo 
                semester={sem} 
                id={id} 
                state={this.state.semesters} 
                handleStateChange={this.handleStateChange}/>
              <CourseInput key={'Course' + id} id={'Course' + id} />
              <CreditInput key={'Credit' + id} id={'Credit' + id} onChange={this.calculateGPA}/>
              <GradeInput key={'Grade' + id} id={'Grade' + id} onChange={this.calculateGPA}/>
              <RemoveIcon
                src={closeIcon} 
                alt="X-shaped close button" 
                id={'Icon' + id} 
                onClick={this.removeRow}/>
            </Row>)
        })
      })

      return display;
    } else {
      let display = [];
      
      Object.keys(this.state.semesters).forEach((sem) => {
        this.state.semesters[sem].rows.forEach((id) => {
          display.push(
            <Row key={'Row' + id} id={'Row' + id}>
              <MenuDemo 
                semester={sem} 
                id={id} 
                state={this.state.semesters} 
                handleStateChange={this.handleStateChange}/>
              <CourseInput key={'Course' + id} id={'Course' + id} />
              <CreditInput key={'Credit' + id} id={'Credit' + id} onChange={this.calculateGPA}/>
              <GradeInput key={'Grade' + id} id={'Grade' + id} onChange={this.calculateGPA}/>
              <RemoveIcon
                src={closeIcon}
                alt="X-shaped close button"
                id={'Icon' + id}
                onClick={this.removeRow}/>
            </Row>)
        })
      })
      return display;
    }
  }

  addRow() {
    let newRowNumber = this.state.rowNumber + 1;
    let semesterObject = this.state.semesters;

    semesterObject.s0.rows.push(newRowNumber);

    this.setState({
      rowNumber: newRowNumber,
      semesters: semesterObject
    });
  }

  removeRow(e) {   
    let id = parseInt(e.target.id.slice(4));
    let semesterObject = this.state.semesters;
    let index = -1;

    Object.keys(this.state.semesters).forEach((sem) => {
      this.state.semesters[sem].rows.forEach((row) => {
        if (row === id) {
          index = semesterObject[sem].rows.indexOf(row);

          if (index > -1) {
            semesterObject[sem].rows.splice(index, 1);
          }
        }
      })
    })
    
    this.setState({
      semesters: semesterObject
    })

    this.calculateGPA();
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu})
  } 

  handleStateChange(update) {
    this.setState({
      semesters: update
    })
  }

  calculateGPA() {
    let gpaPoints = 0;
    let creditSum = 0;

    Object.keys(this.state.semesters).forEach((sem) => {
      this.state.semesters[sem].rows.forEach((id) => {
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
          <AddContainer>
            { this.state.showSemesters === true ? <AddRow onClick={this.addSemester}>+ Add Semester</AddRow> : <div></div>}
            <AddRow onClick={this.addRow}>+ Add Row</AddRow>
          </AddContainer>
          <TotalRow>Overall GPA: {this.state.gpa}</TotalRow>
        </CalcContainer>
      </Body>
    )
  }
}

export default App;


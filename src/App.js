import React from 'react';
//Import styling
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
//Import icons
import closeIcon from './close_icon.png';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
//Import components
import SemesterChangeMenu from './components/semesterChangeMenu';
import GradeSelector from './components/selectGradeMenu';
//Import redux
import { connect } from 'react-redux';
import { 
  setGPA, 
  setSemesterLoad,
  toggleSemesters,
  toggleSettings 
} from './redux/actions';

const GlobalStyle = createGlobalStyle`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;  

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

/*  Main Header  */
const MainHeaderWrapper = styled.div`
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

const MainHeaderText = styled.h1`
  position: absolute;
  color: white;
  font-size: 35px;
  font-weight: 700;
  text-align: center;
`;

/* Settings */
const SettingsHeader = styled.div`
  background-color: darkgray;
  border-radius: 8px;
  margin-top: 30px;
  padding: 7px;
  width: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SettingsTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-weight: 700;
`;

const SettingsContainer = styled.div`
  margin-top: 15px;
  padding: 5px;
  width: 310px;
  border-radius: 8px;
  display: flex;
  background-color: lightgrey;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

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
  padding: ${props => props.semesters ? "0 10px 0 30px" : "0 13px 0 5px"};
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

const SemesterMenuPlaceholder = styled.div`
  width: 30px;
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

/* Add Row */
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
  margin: 0 7px 0 12px;
  padding: 0;
  width: 20px;
  height: 20px;
`;

/* Calculator Total Row */

const TotalRow = styled.div`
  height: 21px;
  background-color: darkgray;
  margin: 0;
  padding: 10px 0;
  text-align: center;
  font-weight: 700;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: nowrap;
`;

const TotalRowItem = styled.div`
  min-width: 35px;
  margin: 0 10px;
`;

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      grades: {
        row0: ''
      },
      semesterNumber: 0,
      semesterLoadError: false,
      rowNumber: 0,
      semesters: {
        s0: {
          name: "Semester 1",
          rows: [0],
          input: false
        }
      },
      menu: false,
    };

    this.toggleSettings = this.toggleSettings.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.toggleSemesters = this.toggleSemesters.bind(this);
    this.changeSemesterLoad = this.changeSemesterLoad.bind(this);
    this.addSemester = this.addSemester.bind(this);
    this.semesterInputToggle = this.semesterInputToggle.bind(this);
    this.showSemesterInput = this.showSemesterInput.bind(this);
    this.renameSemester = this.renameSemester.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.addSemesterMenu = this.addSemesterMenu.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleSemesterChange = this.handleSemesterChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.calculateGPA = this.calculateGPA.bind(this);        
  }

  /*    Settings    */
  toggleSettings(){ // Toggle show and hide settings option
    this.props.toggleSettings(!this.props.settings);
  }

  showSettings() { // Return settings content if shown
    if (this.props.settings) {
      return (
        <SettingsContainer>
          <SettingRow>
            <SettingText>Group by semester</SettingText>
            <IOSSwitch checked={this.props.showSemesters} onChange={this.toggleSemesters} name="checkSemesters" />
          </SettingRow>
          <SettingRow>
            <SettingText>Default classes per semester</SettingText>
            <SettingInput defaultValue={this.props.semesterLoad} onChange={this.changeSemesterLoad}/>
          </SettingRow>
          {this.semesterLoadError()}
        </SettingsContainer>
      )
    } else {
      return (<div></div>)
    }
  }

  toggleSemesters(){
    this.props.toggleSemesters(!this.props.showSemesters);
  }

  /*    Semesters    */
  changeSemesterLoad(e) { // Set how many rows in a new semester
    let load = e.target.value;
    
    if (load) {
      if (load > 0 && load < 13) {
        this.props.setSemesterLoad(load);
        this.setState({
          semesterLoadError: false
        })
      } else {
        this.setState({
          semesterLoadError: true
        })
      }
    }  
  }

  semesterLoadError() {
    if (this.state.semesterLoadError) {
      return <Error>Please select a value betweeen 1 and 12.</Error>
    }
  }

  addSemester() {
    let newSemesterNumber = this.state.semesterNumber + 1;
    let semesterObject = this.state.semesters;
    let newRowNumber = this.state.rowNumber;

    let rows = [];

    for (let i = 0; i < parseInt(this.props.semesterLoad); i++) {
      newRowNumber++;
      rows.push(newRowNumber);
    }

    semesterObject['s' + newSemesterNumber] = {
      name: "Semester " + (newSemesterNumber + 1),
      rows: rows,
      input: false
    }

    let newGrades = this.state.grades;

    rows.forEach((row) => {
      newGrades['row' + row] = ''
    });
    
    this.setState({
      semesterNumber: newSemesterNumber,
      semesters: semesterObject,
      rowNumber: newRowNumber,
      grades: newGrades      
    });
  }

  showSemesterInput(sem) { // Return either semester title or return input
    if (this.state.semesters[sem].input) {
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
  
  renameSemester(event) { // Rename semester
    if (event.key === "Enter") {
      if (event.target.value !== '') {
        let index = event.target.id.indexOf('s');
        let semID = event.target.id.slice(index);
  
        let semesterObject = this.state.semesters;
  
        semesterObject[semID].name = event.target.value
  
        this.setState({
          semesters: semesterObject
        });
      }

      this.semesterInputToggle(event);
    }
  } 

  semesterInputToggle(event) { // Toggle for a semester between its title and its input
    let index = event.target.id.indexOf('s');
    if (index > -1) {
      let semID = event.target.id.slice(index);
      let newInput = !this.state.semesters[semID].input;

      this.setState({
        semesters: {
          ...this.state.semesters,
          [semID]: {
            ...this.state.semesters[semID],
            input: newInput
          }
        }
      })
    }
  }

  /*    Rows    */  
  renderRows(){
    if (this.props.showSemesters) {
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
              {this.addSemesterMenu(sem, id)}
              <CourseInput key={'Course' + id} id={'Course' + id} />
              <CreditInput key={'Credit' + id} id={'Credit' + id} onChange={this.calculateGPA}/>
              <GradeSelector
                key={'gradeSelector' + id}
                id={'gradeSelector' + id} 
                row={id} 
                function1={this.handleGradeChange}
                function2={this.calculateGPA}
                grades={this.state.grades}/>
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
              <CourseInput key={'Course' + id} id={'Course' + id} />
              <CreditInput key={'Credit' + id} id={'Credit' + id} onChange={this.calculateGPA}/>
              <GradeSelector
                key={'gradeSelector' + id}
                id={'gradeSelector' + id} 
                row={id} 
                function1={this.handleGradeChange}
                function2={this.calculateGPA}
                grades={this.state.grades}/>
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

  addSemesterMenu(sem, id) {
    if (Object.keys(this.state.semesters).length > 1) {
      return (
        <SemesterChangeMenu 
        semester={sem} 
        id={id} 
        state={this.state.semesters} 
        function={this.handleSemesterChange}/>
      )
    } else return (
      <SemesterMenuPlaceholder/>
    )
  }

  addRow() {
    let newRowNumber = this.state.rowNumber + 1;
    let semesterObject = this.state.semesters;

    semesterObject.s0.rows.push(newRowNumber);

    this.setState({
      rowNumber: newRowNumber,
      semesters: semesterObject,
      grades: {
        ...this.state.grades,
        ['row' + newRowNumber]: ''
      }
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

  handleSemesterChange(update) {
    this.setState({
      semesters: update
    })
  }

  handleGradeChange(newGrade, rowID) {
    this.setState({
      grades: {
        ...this.state.grades,
        ['row' + rowID]: newGrade
      }
    })
  }

  calculateGPA() {
    let gpaPoints = 0;
    let creditSum = 0;

    Object.keys(this.state.semesters).forEach((sem) => {
      this.state.semesters[sem].rows.forEach((id) => {
        let rowCredit = parseFloat(document.getElementById('Credit' + id).value);
        let row = 'row' + id;
        let rowGrade = this.state.grades[row];

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
            let rowPoints = rowCredit * gradeValue;
            gpaPoints = gpaPoints + rowPoints;
            creditSum = creditSum + rowCredit;
          }
        }
      })
    })
    
    let newGPA = (gpaPoints/creditSum).toFixed(2);
    
    if (newGPA !== 'NaN') {
      this.props.setGPA(newGPA);
    } else if (isNaN(newGPA)) {
      this.props.setGPA('');
    }
  }

  render() {
    return(
      <div>
        <GlobalStyle/>
        <Body>
        <MainHeaderWrapper>
            <MainHeaderText>GPA Calculator</MainHeaderText>
        </MainHeaderWrapper>
          <SettingsHeader onClick={this.toggleSettings}>
            <SettingsRoundedIcon/>
            <SettingsTitle>Settings</SettingsTitle>
          </SettingsHeader> 
            {this.showSettings()}
          <CalcContainer>
            <TableHeader semesters={this.props.showSemesters}>
              <CourseHeader>Course</CourseHeader>
              <CreditHeader>Credit Hours</CreditHeader>
              <GradeHeader>Grade</GradeHeader>
              <SpacerHeader/>
            </TableHeader>
            {this.renderRows()}
            <AddContainer>
              { this.props.showSemesters ? <AddRow onClick={this.addSemester}>+ Add Semester</AddRow> : <div></div>}
              <AddRow onClick={this.addRow}>+ Add Row</AddRow>
            </AddContainer>
            <TotalRow>
              <TotalRowItem>Overall GPA: </TotalRowItem>
              <TotalRowItem>{this.props.gpa}</TotalRowItem>
            </TotalRow>
          </CalcContainer>
        </Body>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    gpa: state.gpa,
    semesterLoad: state.semesterLoad,
    settings: state.settings,
    showSemesters: state.showSemesters
  };
}

const mapDispatchToProps = {
  setGPA,
  setSemesterLoad,
  toggleSemesters,
  toggleSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


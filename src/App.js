import React, { useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { incRowCount } from './redux/slices';
import { connect } from 'react-redux';
import { 
  incSemesterCount,
  setGPA, 
  setSemesterLoad,
  setSemesterLoadError,
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

function App() {
  const rowCount = useSelector((state) => state.rowCount.value);
  const dispatch = useDispatch();

  const [grades, setGrades] = useState({row0: ''});
  const [semesters, setSemesters] = useState({
    s0: {
      name: "Semester 1",
      rows: [0],
      input: false
    }
  });

  /*    Settings    */
  const toggleSettings = () => { // Toggle show and hide settings option
    this.props.toggleSettings(!this.props.settings);
  }

  const showSettings = () => { // Return settings content if shown
    if (this.props.settings) {
      return (
        <SettingsContainer>
          <SettingRow>
            <SettingText>Group by semester</SettingText>
            <IOSSwitch checked={this.props.showSemesters} onChange={toggleSemesters} name="checkSemesters" />
          </SettingRow>
          <SettingRow>
            <SettingText>Default classes per semester</SettingText>
            <SettingInput defaultValue={this.props.semesterLoad} onChange={changeSemesterLoad}/>
          </SettingRow>
          {semesterLoadError()}
        </SettingsContainer>
      )
    } else {
      return (<div></div>)
    }
  }

  const toggleSemesters = () => {
    this.props.toggleSemesters(!this.props.showSemesters);
  }

  /*    Semesters    */
  const changeSemesterLoad = (e) => { // Set how many rows in a new semester
    let load = e.target.value;
    
    if (load) {
      if (load > 0 && load < 13) {
        this.props.setSemesterLoad(load);
        if (this.props.semesterLoadError === true) {
          this.props.setSemesterLoadError(false);
        }
      } else {
        this.props.setSemesterLoadError(true);
      }
    }  
  }

  const semesterLoadError = () => {
    if (this.props.semesterLoadError) {
      return <Error>Please select a value betweeen 1 and 12.</Error>
    }
  }

  const addSemester = () => {
    let newSemesterCount = this.props.semesterCount + 1;
    let semesterObject = semesters;
    let newRowCount = rowCount;

    let rows = [];

    for (let i = 0; i < parseInt(this.props.semesterLoad); i++) {
      newRowCount++;
      rows.push(newRowCount);
    }

    semesterObject['s' + newSemesterCount] = {
      name: "Semester " + (newSemesterCount + 1),
      rows: rows,
      input: false
    }

    let newGrades = grades;

    rows.forEach((row) => {
      newGrades['row' + row] = ''
    });

    dispatch(incRowCount(newRowCount));
    this.props.incSemesterCount(newSemesterCount);
    
    setSemesters(semesterObject);
    setGrades(newGrades);

  }

  const showSemesterInput = (sem) => { // Return either semester title or return input
    if (semesters[sem].input) {
      return(
        <SemesterInput key={'input' + sem} id={'input' + sem} onKeyUp={renameSemester}/>
      )
    } else {
      return (
        <SemesterTitle 
          key={'title' + sem} 
          id={'title' + sem} 
          onClick={semesterInputToggle}>
            {semesters[sem].name}
        </SemesterTitle>
      )
    }
  }
  
  const renameSemester = (event) => { // Rename semester
    if (event.key === "Enter") {
      if (event.target.value !== '') {
        let index = event.target.id.indexOf('s');
        let semID = event.target.id.slice(index);
  
        let semesterObject = semesters;
  
        semesterObject[semID].name = event.target.value
  
        setSemesters(semesterObject);
      }

      semesterInputToggle(event);
    }
  } 

  const semesterInputToggle = (event) => { // Toggle for a semester between its title and its input
    let index = event.target.id.indexOf('s');
    if (index > -1) {
      let semID = event.target.id.slice(index);
      let newInput = !semesters[semID].input;

      setSemesters({
        ...semesters,
        [semID]: {
          ...semesters[semID],
          input: newInput
        }
      })
    }
  }

  /*    Rows    */  
  const renderRows = () => {
    if (this.props.showSemesters) {
      let display = [];

      Object.keys(semesters).forEach((sem) => {
        display.push(
          <SemesterHeader key={'header' + sem} id={'header' + sem}>
            {showSemesterInput(sem)} 
          </SemesterHeader>
        );

        semesters[sem].rows.forEach((id) => {
          display.push(
            <Row key={'Row' + id} id={'Row' + id}>
              {addSemesterMenu(sem, id)}
              <CourseInput key={'Course' + id} id={'Course' + id} />
              <CreditInput key={'Credit' + id} id={'Credit' + id} onChange={calculateGPA}/>
              <GradeSelector
                key={'gradeSelector' + id}
                id={'gradeSelector' + id} 
                row={id} 
                function1={handleGradeChange}
                function2={calculateGPA}
                grades={grades}/>
              <RemoveIcon
                src={closeIcon} 
                alt="X-shaped close button" 
                id={'Icon' + id} 
                onClick={removeRow}/>
            </Row>)
        })
      })

      return display;
    } else {
      let display = [];
      
      Object.keys(semesters).forEach((sem) => {
        semesters[sem].rows.forEach((id) => {
          display.push(
            <Row key={'Row' + id} id={'Row' + id}>
              <CourseInput key={'Course' + id} id={'Course' + id} />
              <CreditInput key={'Credit' + id} id={'Credit' + id} onChange={calculateGPA}/>
              <GradeSelector
                key={'gradeSelector' + id}
                id={'gradeSelector' + id} 
                row={id} 
                function1={handleGradeChange}
                function2={calculateGPA}
                grades={grades}/>
              <RemoveIcon
                src={closeIcon}
                alt="X-shaped close button"
                id={'Icon' + id}
                onClick={removeRow}/>
            </Row>)
        })
      })
      return display;
    }
  }

  const addSemesterMenu = (sem, id) => {
    if (Object.keys(semesters).length > 1) {
      return (
        <SemesterChangeMenu 
        semester={sem} 
        id={id} 
        state={semesters} 
        function={handleSemesterChange}/>
      )
    } else return (
      <SemesterMenuPlaceholder/>
    )
  }

  const addRow = () => {
    let newRowCount = this.props.rowCount + 1;
    let semesterObject = semesters;

    semesterObject.s0.rows.push(newRowCount);

    this.props.incRowCount(newRowCount);

    setSemesters(semesterObject);
    setGrades({
      ...grades,
      ['row' + newRowCount]: ''
    });
  }

  const removeRow = (e) => {   
    let id = parseInt(e.target.id.slice(4));
    let semesterObject = semesters;
    let index = -1;

    Object.keys(semesters).forEach((sem) => {
      semesters[sem].rows.forEach((row) => {
        if (row === id) {
          index = semesterObject[sem].rows.indexOf(row);

          if (index > -1) {
            semesterObject[sem].rows.splice(index, 1);
          }
        }
      })
    })
    
    setSemesters(semesterObject);

    calculateGPA();
  }

  const handleSemesterChange = (update) => {
    setSemesters(update);
  }

  const handleGradeChange = (newGrade, rowID) => {
    setGrades({
      ...grades,
      ['row' + rowID]: newGrade
    })
  }

  const calculateGPA = () => {
    let gpaPoints = 0;
    let creditSum = 0;

    Object.keys(semesters).forEach((sem) => {
      semesters[sem].rows.forEach((id) => {
        let rowCredit = parseFloat(document.getElementById('Credit' + id).value);
        let row = 'row' + id;
        let rowGrade = grades[row];

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

  return(
    <div>
      <GlobalStyle/>
      <Body>
      <MainHeaderWrapper>
          <MainHeaderText>GPA Calculator</MainHeaderText>
      </MainHeaderWrapper>
        <SettingsHeader onClick={toggleSettings}>
          <SettingsRoundedIcon/>
          <SettingsTitle>Settings</SettingsTitle>
        </SettingsHeader> 
          {showSettings()}
        <CalcContainer>
          <TableHeader semesters={this.props.showSemesters}>
            <CourseHeader>Course</CourseHeader>
            <CreditHeader>Credit Hours</CreditHeader>
            <GradeHeader>Grade</GradeHeader>
            <SpacerHeader/>
          </TableHeader>
          {renderRows()}
          <AddContainer>
            { this.props.showSemesters ? <AddRow onClick={addSemester}>+ Add Semester</AddRow> : <div></div>}
            <AddRow onClick={addRow}>+ Add Row</AddRow>
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

function mapStateToProps (state) {
  return {
    gpa: state.gpa,
    rowCount: state.rowCount,
    semesterCount: state.semesterCount,
    semesterLoad: state.semesterLoad,
    semesterLoadError: state.semesterLoadError,
    settings: state.settings,
    showSemesters: state.showSemesters
  };
}

const mapDispatchToProps = {
  incRowCount,
  incSemesterCount,
  setGPA,
  setSemesterLoad,
  setSemesterLoadError,
  toggleSemesters,
  toggleSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


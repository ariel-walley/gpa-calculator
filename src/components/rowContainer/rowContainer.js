import { useEffect } from 'react';
import GradeSelector from './selectGradeMenu';
import SemesterChangeMenu from './semesterChangeMenu';
import closeIcon from '../../close_icon.png';

import { useSelector, useDispatch } from 'react-redux';
import { updateGPA } from '../../redux/gpaSlice';
import { selectSemesters, updateSemesters } from '../../redux/semestersSlice';
import { selectGrades } from '../../redux/gradesSlice';
import { selectShowSemesters } from '../../redux/toggleSemestersSlice';

import * as styles from './rowContainerStyles';

function RowContainer() {
  const dispatch = useDispatch();
  const semesters = useSelector(selectSemesters);
  const grades = useSelector(selectGrades);
  const showSemesters = useSelector(selectShowSemesters);

  /* Semester Functions */
  const showSemesterInput = (sem) => {
    if (semesters[sem].input) {
      return(
        <styles.SemesterInput key={'input' + sem} id={'input' + sem} onKeyUp={renameSemester}/>
      )
    } else {
      return (
        <styles.SemesterTitle 
          key={'title' + sem} 
          id={'title' + sem} 
          onClick={semesterInputToggle}>
            {semesters[sem].name}
        </styles.SemesterTitle>
      )
    }
  }
  
  const renameSemester = (event) => {
    if (event.key === "Enter") {
      if (event.target.value !== '') {
        let index = event.target.id.indexOf('s');
        let semID = event.target.id.slice(index);
  
        let semesterObject = JSON.parse(JSON.stringify(semesters));
  
        semesterObject[semID].name = event.target.value
  
        dispatch(updateSemesters(semesterObject));
      }

      semesterInputToggle(event);
    }
  } 

  const semesterInputToggle = (event) => {
    let index = event.target.id.indexOf('s');
    if (index > -1) {
      let semID = event.target.id.slice(index);
      let newInput = !semesters[semID].input;

      dispatch(updateSemesters({
        ...semesters,
        [semID]: {
          ...semesters[semID],
          input: newInput
        }
      }))
    }
  }

  const addSemesterMenu = (sem, id) => {
    if (Object.keys(semesters).length > 1) {
      return (
        <SemesterChangeMenu semester={sem} id={id}/>
      )
    } else return (
      <styles.SemesterMenuPlaceholder/>
    )
  }
 
  /* GPA Calculation Functions */
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
    });

    let newGPA = (gpaPoints/creditSum).toFixed(2);
    
    if (newGPA !== 'NaN') {
      dispatch(updateGPA(newGPA));
    } else if (isNaN(newGPA)) {
      dispatch(updateGPA(''));
    }
  }

  useEffect(() => { //Re-calculate GPA if gradeChangeMenu is updated or a row is deleted
    calculateGPA();
  }, [grades, semesters]);

  /* Row Functions */
  const removeRow = (e) => {   
    let id = parseInt(e.target.id.slice(4));
    let semesterObject = JSON.parse(JSON.stringify(semesters));
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
    
    dispatch(updateSemesters(semesterObject));
    calculateGPA();
  }

  const renderRows = () => {
    if (showSemesters) {
      let display = [];

      Object.keys(semesters).forEach((sem) => {
        display.push(
          <styles.SemesterHeader key={'header' + sem} id={'header' + sem}>
            {showSemesterInput(sem)} 
          </styles.SemesterHeader>
        );

        semesters[sem].rows.forEach((id) => {
          display.push(
            <styles.Row key={'Row' + id} id={'Row' + id}>
              {addSemesterMenu(sem, id)}
              <styles.CourseInput key={'Course' + id} id={'Course' + id} />
              <styles.CreditInput key={'Credit' + id} id={'Credit' + id} onChange={calculateGPA}/>
              <GradeSelector
                key={'gradeSelector' + id}
                id={'gradeSelector' + id} 
                row={id} 
              />
              <styles.RemoveIcon
                src={closeIcon} 
                alt="X-shaped close button" 
                id={'Icon' + id} 
                onClick={removeRow}/>
            </styles.Row>)
        })
      })

      return display;
    } else {      
      let display = Object.keys(semesters).map(sem => {
        return semesters[sem].rows.map((rowNum, id) => 
            <styles.Row key={'Row' + id} id={'Row' + id}>
              <styles.CourseInput key={'Course' + id} id={'Course' + id} />
              <styles.CreditInput key={'Credit' + id} id={'Credit' + id} onChange={calculateGPA}/>
              <GradeSelector
                key={'gradeSelector' + id}
                id={'gradeSelector' + id} 
                row={id}
              />
              <styles.RemoveIcon
                src={closeIcon}
                alt="X-shaped close button"
                id={'Icon' + id}
                onClick={removeRow}/>
            </styles.Row>
        )
      })
      return display;
    }
  }

  return (
    <div>
      {renderRows()}
    </div>
  )
}

export default RowContainer;
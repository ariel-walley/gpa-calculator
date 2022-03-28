import { useState } from 'react';
import * as styles from './addRowStyles';

import { useSelector, useDispatch } from 'react-redux';
import { selectSemesters, updateSemesters } from '../../redux/semestersSlice';
import { selectGrades, updateGrades } from '../../redux/gradesSlice';
import { selectShowSemesters } from '../../redux/toggleSemestersSlice';
import { selectSemesterLoad } from '../../redux/semesterLoadSlice';

function AddRow() {
  const [rowCount, incRowCount] = useState(0);
  const [semesterCount, incSemesterCount] = useState(0);

  const dispatch = useDispatch();
  const semesters = useSelector(selectSemesters);
  const grades = useSelector(selectGrades);
  const showSemesters = useSelector(selectShowSemesters);
  const semesterLoad = useSelector(selectSemesterLoad);

  const addSemester = () => {
    let newSemesterCount = semesterCount + 1;
    let semesterObject = JSON.parse(JSON.stringify(semesters));
    let newRowCount = rowCount;

    let rows = [];

    for (let i = 0; i < parseInt(semesterLoad); i++) {
      newRowCount++;
      rows.push(newRowCount);
    }

    semesterObject['s' + newSemesterCount] = {
      name: "Semester " + (newSemesterCount + 1),
      rows: rows,
      input: false
    }

    let newGrades = JSON.parse(JSON.stringify(grades));

    rows.forEach((row) => {
      newGrades['row' + row] = ''
    });

    incRowCount(newRowCount);
    incSemesterCount(newSemesterCount);
    
    dispatch(updateSemesters(semesterObject));
    dispatch(updateGrades(newGrades));
  }

  const addRowFunc = () => {
    let newRowCount = rowCount + 1;
    let semesterObject = JSON.parse(JSON.stringify(semesters));

    semesterObject.s0.rows.push(newRowCount);

    incRowCount(newRowCount);

    dispatch(updateSemesters(semesterObject));
    dispatch(updateGrades({
      ...grades,
      ['row' + newRowCount]: ''
    }));
  }

  return(
    <styles.AddContainer>
      { showSemesters ? <styles.AddRowText onClick={addSemester}>+ Add Semester</styles.AddRowText> : <div></div>}
      <styles.AddRowText onClick={addRowFunc}>+ Add Row</styles.AddRowText>
    </styles.AddContainer>
  )
}

export default AddRow;
import * as styles from './tableHeaderStyles';
import { useSelector } from 'react-redux';
import { selectShowSemesters } from '../../redux/toggleSemestersSlice';

function TableHeader() {
  const showSemesters = useSelector(selectShowSemesters);

  return(
    <styles.TableHeaderContainer semesters={showSemesters}>
      <styles.CourseHeader>Course</styles.CourseHeader>
      <styles.CreditHeader>Credit Hours</styles.CreditHeader>
      <styles.GradeHeader>Grade</styles.GradeHeader>
    </styles.TableHeaderContainer>
  )
}

export default TableHeader;
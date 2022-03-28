import * as styles from './totalRowStyles';
import { useSelector } from 'react-redux';
import { selectGPA } from '../../redux/gpaSlice';

function TotalRow() {
  const gpa = useSelector(selectGPA);

  return (
    <styles.TotalRowContainer>
      <styles.TotalRowItem>Overall GPA: </styles.TotalRowItem>
      <styles.TotalRowItem>{gpa}</styles.TotalRowItem>
    </styles.TotalRowContainer>
  )
}

export default TotalRow;
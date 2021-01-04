import React from 'react';
import styled from 'styled-components';
import closeIcon from './close_icon.png';

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

const CalcContainer = styled.div`
  margin-top: 60px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  background-color: darkgray;
`;

/* Calculator Header */

const TableHeader = styled.div`
  width: 100%;
  background-color: #0F52BA;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const HeaderText = styled.h1`
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

/* Calculator Row */

const Row = styled.div`
  height: 40px;
  background-color: lightgrey;
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  font-size: 17px;
  text-align: center;
  margin: 5px;
  border: 2px solid darkgray;
  border-radius: 5px;
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
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
`;

const RemoveRow = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

/* Calculator Total Row */

const TotalRow = styled.div`
  background-color: darkgray;
  padding: 10px 0;
  text-align: center;
  font-weight: 700;
`;

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      rowNumber: 0,
      rows: [0],
      gpa: ''
    };

    this.renderRows = this.renderRows.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.calculateGPA = this.calculateGPA.bind(this);    
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
    console.log(id);
    let currentRows = this.state.rows;
    console.log(currentRows);

    let index = currentRows.indexOf(id);
    console.log(index);

    if (index > -1) {
      currentRows.splice(index, 1);
    }

    console.log(currentRows);

    this.setState({
      rows: currentRows
    })
  }
 
  calculateGPA() {
    let gpaPoints = 0;
    let creditSum = 0; 

    for (let i = 0; i < this.state.rows.length; i++) {
      let rowCredit = parseFloat(document.getElementById('Credit' + i).value);
      let rowGrade = document.getElementById('Grade' + i).value;
      
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

      if (rowCredit === null || isNaN(rowCredit)) {
        console.log(`Error with ${'Credit' + i}`);
        return;
      } else if ( gradeValue === null || isNaN(gradeValue)) {
        console.log(`Error with ${'Grade' + i}`);
        return;
      } else {
        let rowGpaPoints = rowCredit * gradeValue;
        
        gpaPoints = gpaPoints + rowGpaPoints;
        creditSum = creditSum + rowCredit;
      }
    }

    let newGPA = (gpaPoints/creditSum).toFixed(2);
    
    this.setState({
      gpa: newGPA
    })
  }

  render() {
    return(
      <Body>
        <Header>GPA Calculator</Header>
        <CalcContainer>
          <TableHeader>
            <CourseHeader>Course</CourseHeader>
            <CreditHeader>Credit Hours</CreditHeader>
            <GradeHeader>Grade</GradeHeader>
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


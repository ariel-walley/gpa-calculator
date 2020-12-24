import React from 'react';
import styled from 'styled-components';

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
  font-weight: 700;
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
      rowNumber: 1,
      gpa: ''
    }

    this.addRow = this.addRow.bind(this);
    this.additionalRows = this.additionalRows.bind(this);
    this.calculateGPA = this.calculateGPA.bind(this);
  }

  addRow() {
    let newRowNumber = this.state.rowNumber;

    this.setState({
      rowNumber: newRowNumber + 1,
    })
  }

  additionalRows() {
    let display = [];

    for (let i = 1; i < this.state.rowNumber; i++) {
      display.push(
        <Row key={'Row' + (i+1)}>
          <CourseInput key={'Course' + (i+1)} id={'Course' + (i+1)} />
          <CreditInput key={'Credit' + (i+1)} id={'Credit' + (i+1)} onChange={this.calculateGPA}/>
          <GradeInput key={'Grade' + (i+1)} id={'Grade' + (i+1)} onChange={this.calculateGPA}/>
        </Row>
      )
    }
  
    return display;
  }

  calculateGPA() {
    console.log();
    let credit = document.getElementById('Credit1').value;
    let grade = document.getElementById('Grade1').value;
    let gradeValue;

    switch(grade) {
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
        gradeValue = 90
    }

    let newGPA = ((credit * gradeValue) / credit).toFixed(2);
    
    console.log(newGPA);

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
          <Row key="Row1">
            <CourseInput key="Course1" id="Course1" />
            <CreditInput key="Credit1" id="Credit1" onChange={this.calculateGPA}/>
            <GradeInput key="Grade1" id="Grade1" onChange={this.calculateGPA}/>
          </Row>
          {this.additionalRows()}
          <AddRow onClick={this.addRow}>+ Add Row</AddRow>
          <TotalRow>Overall GPA: {this.state.gpa}</TotalRow>
        </CalcContainer>
      </Body>
    )
  }
}

export default App;


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

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      rowNumber: 1
    }

    this.addRow = this.addRow.bind(this);
    this.additionalRows = this.additionalRows.bind(this);
  }

  addRow() {
    let newRowNumber = this.state.rowNumber;

    this.setState({
      rowNumber: newRowNumber + 1
    })
  }

  additionalRows() {
    let display = [];

    for (let i = 1; i < this.state.rowNumber; i++) {
      display.push(
        <Row name={'Row' + (i+1)}>
          <CourseInput name={'Course' + (i+1)} />
          <CreditInput name={'Credit' + (i+1)} />
          <GradeInput name={'Grade' + (i+1)} />
        </Row>
      )
    }
  
    return display;
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
          <Row name="Row1">
            <CourseInput name="Course1" />
            <CreditInput name="Credit1" />
            <GradeInput name="Grade1" />
          </Row>
          {this.additionalRows()}
          <AddRow onClick={this.addRow}>+ Add Row</AddRow>
        </CalcContainer>
      </Body>
    )
  }

}

export default App;


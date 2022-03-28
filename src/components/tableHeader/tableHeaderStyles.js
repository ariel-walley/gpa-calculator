import styled from 'styled-components';

export const TableHeaderContainer = styled.div`
  margin: 0;
  padding: ${props => props.semesters ? "0 10px 0 30px" : "0 10px"};
  background-color: #0F52BA;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.h1`
  margin: 5px 7px;
  padding: 0;
  color: white;
  font-size: 17px;
  font-weight: 700;
  text-align: center;
`;

export const CourseHeader = styled(HeaderText)`
  width: 150px;
`;

export const CreditHeader = styled(HeaderText)`
  width: 75px;
`;

export const GradeHeader = styled(HeaderText)`
  width: 90px;
  margin-right: 45px;
`;
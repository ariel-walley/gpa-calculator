import styled from 'styled-components';

/* Semesters */

export const SemesterHeader = styled.div`
  margin: 5px;
  padding: 0;
`;

export const SemesterTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
`;

export const SemesterInput = styled.input`
  width: 100px;
`;

/* Row */

export const Row = styled.div`
  height: 40px;
  margin: 0;
  padding: 0 10px;
  background-color: lightgrey;
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: center;
`;

export const SemesterMenuPlaceholder = styled.div`
  width: 30px;
`;

export const Input = styled.input`
  margin: 0 5px;
  padding: 0px;
  border: 2px solid darkgray;
  border-radius: 5px;
  font-size: 17px;
  text-align: center;
`;

export const CourseInput = styled(Input)`
  width: 150px;
`;

export const CreditInput = styled(Input)`
  width: 75px;
`;

export const RemoveIcon = styled.img`
  margin: 0 7px 0 12px;
  padding: 0;
  width: 20px;
  height: 20px;
`;

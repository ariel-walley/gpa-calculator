import styled from 'styled-components';

export const SettingsMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const SettingsHeader = styled.div`
  background-color: darkgray;
  border-radius: 8px;
  margin-top: 30px;
  padding: 7px;
  width: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const SettingsTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-weight: 700;
`;

export const SettingsContainer = styled.div`
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

export const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  width: 275px;
  margin: 0;
  padding: 0;
`;

export const SettingText = styled.div`
  margin: 0;
  padding: 0;
`;

export const SettingInput = styled.input`
  margin: 0;
  padding: 0;
  height: 25px;
  width: 40px;
  text-align: center;
  border: 1px solid darkgray;
  border-radius: 5px;
`;

export const Error = styled.div`
  color: red;
`;
import { useState } from 'react';
import * as styles from './settingsStyles';
import SettingsIcon from '@mui/icons-material/Settings';
import IOSSwitch from './iosSwitch';

import { useSelector, useDispatch } from 'react-redux';
import { selectShowSemesters, toggleSemesters } from '../../redux/toggleSemestersSlice';
import { selectSemesterLoad, updateSemesterLoad } from '../../redux/semesterLoadSlice';

function Settings() {
  const [settingsDisplay, toggleSettings] = useState(false);
  const [semesterLoadError, setSemesterLoadError] = useState(false);

  const dispatch = useDispatch();
  const semesterLoad = useSelector(selectSemesterLoad);
  const showSemesters = useSelector(selectShowSemesters);

  const changeSemesterLoad = (e) => { // Set how many rows in a new semester
    let load = e.target.value;
    
    if (load) {
      if (load > 0 && load < 13) {
        dispatch(updateSemesterLoad(load));
        if (semesterLoadError === true) {
          setSemesterLoadError(false);
        }
      } else {
        setSemesterLoadError(true);
      }
    }  
  }

  const displaySemesterLoadError = () => {
    if (semesterLoadError) {
      return <styles.Error>Please select a value betweeen 1 and 12.</styles.Error>
    }
  }

  const showSettings = () => {
    if (settingsDisplay) {
      return (
        <styles.SettingsContainer>
          <styles.SettingRow>
            <styles.SettingText>Group by semester</styles.SettingText>
            <IOSSwitch checked={showSemesters} onChange={() => dispatch(toggleSemesters(!showSemesters))} name="checkSemesters" />
          </styles.SettingRow>
          <styles.SettingRow>
            <styles.SettingText>Default classes per semester</styles.SettingText>
              <styles.SettingInput defaultValue={semesterLoad} onChange={changeSemesterLoad}/>
          </styles.SettingRow>
          {displaySemesterLoadError()}
        </styles.SettingsContainer>
      )
    } else {
      return (<div></div>)
    }
  }

  return (
    <styles.SettingsMainContainer>
      <styles.SettingsHeader onClick={() => toggleSettings(!settingsDisplay)}>
        <SettingsIcon/>
        <styles.SettingsTitle>Settings</styles.SettingsTitle>
      </styles.SettingsHeader> 
      {showSettings()}
    </styles.SettingsMainContainer>
  )
}

export default Settings;

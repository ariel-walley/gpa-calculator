import React, { useState } from 'react';
import Header from './components/header/header';
import Settings from './components/settings/settings';
import TableHeader from './components/tableHeader/tableHeader';
import RowContainer from './components/rowContainer/rowContainer';
import AddRow from './components/addRow/addRow';
import TotalRow from './components/totalRow/totalRow';
import * as styles from './styles';

function App() {
  return(
    <div>
      <styles.GlobalStyle/>
      <styles.Body>
        <Header/>
        <Settings/>
        <styles.CalcContainer>
          <TableHeader/>
          <RowContainer/>
          <AddRow/>
          <TotalRow/>
        </styles.CalcContainer>
      </styles.Body>
    </div>
  )
}

export default App;
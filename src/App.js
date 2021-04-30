import React, { useState, useEffect } from 'react';
//import { AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'; 
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import TrainingsCalendar from './components/TrainingsCalendar';

import './App.css';

//Todo: Ajan tarkastus ja ajan kokeilu saisiko jostain muodosta suoraan isoStringillä
//- Harjoituksen poistaminen
//- Käyttäjän tietojen muokkaus


//import AddCustomer from './components/AddCustomer'

function App() {
  //const [customers, setCustomers] = useState([]);
  const [value, setValue] = useState('customers');

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={(event, value) => setValue(value) }>
          <Tab value="customers" label="CUSTOMERS"/>
          <Tab value="trainings" label="TRAININGS"/>
          <Tab value="calendar" label="CALENDAR"/>
          
        </Tabs>
        </AppBar>
          {value === 'customers' && <Customers />}
          {value === 'trainings' && <Trainings />}
          {value === 'calendar' && <TrainingsCalendar />}
    </div>
  );
}

export default App;



     
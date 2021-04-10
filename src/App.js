import React, { useState, useEffect } from 'react';
//import { AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'; 

//import 'ag-grid-community/dist/styles/ag-grid.css';
//import 'ag-grid-community/dist/styles/ag-theme-material.css';
import './App.css';

import Customers from './components/Customers';
import Trainings from './components/Trainings';
import AddCustomer from './components/AddCustomer'

function App() {
  //const [customers, setCustomers] = useState([]);
  const [value, setValue] = useState('customers');

  /*useEffect(() => {
    fetchCustomers();
  }, []);*/

  /*const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }

  const columns = [
    {field: 'firstname', sortable: true, filter: true},
    {field: 'lastname', sortable: true, filter: true},
    {field: 'streetaddress', sortable: true, filter: true},
    {field: 'postcode', sortable: true, filter: true},
    {field: 'city', sortable: true, filter: true},
    {field: 'email', sortable: true, filter: true},
    {field: 'phone', sortable: true, filter: true},
  ];*/
  
  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={(event, value) => setValue(value) }>
          <Tab value="customers" label="CUSTOMERS"/>
          <Tab value="trainings" label="TRAININGS"/>
          
        </Tabs>
        </AppBar>
          {value === 'customers' && <Customers />}
          {value === 'trainings' && <Trainings />}
          

    </div>
  );
}

export default App;

//https://www.ag-grid.com/javascript-grid/value-getters/


     
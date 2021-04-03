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


//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';



  /*const fetchCars = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }*/

 /* const columns = [
    {field: 'brand', sortable: true, filter: true},
    {field: 'model', sortable: true, filter: true},
    {field: 'color', sortable: true, filter: true},
    {field: 'fuel', sortable: true, filter: true},
    {field: 'year', sortable: true, filter: true, width: 100},
    {field: 'price', sortable: true, filter: true, width: 120}
  ]

  return (
    <div className="App">
      <Toolbar position='static'>
        <AppBar>
          <Typography variant='h6'>
            Carshop
          </Typography>
        </AppBar>
      </Toolbar>
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto'}}>
        <AgGridReact
          rowData={cars}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}
        />
      </div>
      
    </div>
  );
}

export default App;*/


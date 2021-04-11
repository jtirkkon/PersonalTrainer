import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isTrDialogVisible, setTrDialogVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState('');
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }
  
  const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: { 'Content-type' : 'application/json' }
    })
    .then(response => {
      if (response.ok)
        fetchCustomers();
      else 
        alert("Something went wrong!");
    })
    .catch(err => console.error(err))
  }

  const deleteCustomer = (url) => {
    //console.log(url);
    if (window.confirm('Delete customer?')) {
      fetch(url, { method: 'DELETE'})
      .then(response => {
        if (response.ok) 
          fetchCustomers();
        else 
          alert("Something went wrong!");
      })
      .catch(err => console.error(err))
    }
  }

  const editCustomer = () => {

  }

  const addTraining = (newTraining) => {
    let day = newTraining.date.slice(0, 2);
    let month = newTraining.date.slice(3, 5);
    let year = newTraining.date.slice(6, 10);
    let hours = newTraining.date.slice(11, 13);
    let minutes = newTraining.date.slice(14, 16);

    /*console.log("paiva", day);
    console.log("kuukausi", month);
    console.log("vuosi", year);
    console.log("tunnit", hours);
    console.log("minuutit", minutes);*/
    console.log("in Add Training: training", newTraining);
    let trainingTime = new Date();
    trainingTime.setDate(day);
    trainingTime.setMonth(month-1);
    trainingTime.setYear(year);
    trainingTime.setHours(hours);
    trainingTime.setMinutes(minutes);
    trainingTime.setSeconds(0);
    newTraining.date = trainingTime.toISOString();
    //https://customerrest.herokuapp.com/api/trainings
    console.log("In addTraining", newTraining);
    

    
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      body: JSON.stringify(newTraining),
      headers: { 'Content-type' : 'application/json' }
    })
    .then(response => {
      if (response.ok)
        console.log("training added");
      else 
        alert("Something went wrong!");
    })
    .catch(err => console.error(err))
  }  
    
    /*Body:
    {
    "date": "2018-1-1",
    "activity": "Spinning",
    "duration": "50",
    "customer" : "https://localhost:8080/api/customers/2"
    NOTE! To save also time of the training (for example 27.11.19 09:00) the format must be ISO-8601 (You can use for example moment’s toISOString() function)
    2019-11-27T09:00:00.000+0000
  }*/

  const handleTrainingDialog = (isOpen, customer) => {
    setTrDialogVisible(isOpen);
    setCurrentCustomer(customer);
    console.log("isTrDialogVisible", isTrDialogVisible);
    console.log("kuka on", customer);
  }
  //<Button color='primary' size='small' onClick={() => handleTrainingDialog(true, params.value)}>Add training</Button>

  const columns = [
    {
      headerName: 'Actions',
      field: 'links.0.href',
      width: 230,
      cellRendererFramework: params => 
      <div>
        <IconButton color='secondary' onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => editCustomer(params.value)}>
          <EditIcon />
        </IconButton>
        <Button color='primary' size='small' onClick={() => handleTrainingDialog(true, params.value)}>Add training</Button>
      </div>
    },
    {field: 'firstname', sortable: true, filter: true},
    {field: 'lastname', sortable: true, filter: true},
    {field: 'streetaddress', sortable: true, filter: true},
    {field: 'postcode', sortable: true, filter: true},
    {field: 'city', sortable: true, filter: true},
    {field: 'email', sortable: true, filter: true},
    {field: 'phone', sortable: true, filter: true},
  ];
  
  //vielä käyttäjä välitetään propsina
  return (
    <div className="App">
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto'}}>
        <AddCustomer addCustomer={addCustomer} />
        <AddTraining 
          isOpen={isTrDialogVisible} 
          customer={currentCustomer} 
          handleTrainingDialog={handleTrainingDialog} 
          addTraining={addTraining}
        />
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}
          suppressCellSelection={true}
        />
      </div>
    </div>
  );
}

export default Customers;
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isTrDialogVisible, setTrDialogVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState('');
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  const openSnackbar = () => {
    setOpen(true);
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

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
        if (response.ok) {
          setMsg('Customer deleted');
          openSnackbar();
          fetchCustomers();
        }
        else 
          alert("Something went wrong!");
      })
      .catch(err => console.error(err))
    }
  }

  const editCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(updatedCustomer),
      headers: { 'Content-type' : 'application/json' }  
    })
    .then(response => {
      if (response.ok) {
        setMsg('Customer edited succesfully');
        openSnackbar();
        fetchCustomers();
      }
      else 
        alert("Something went wrong!");
    })
    .catch(err => console.error(err)) 

  }

  const addTraining = (newTraining) => {
    const dateObj = {
      day: newTraining.date.slice(0, 2), 
      month: newTraining.date.slice(3, 5),
      year: newTraining.date.slice(6, 10),
      hours: newTraining.date.slice(11, 13),
      minutes: newTraining.date.slice(14, 16)
    }
    //Minuuttien korjaus vielä lengtillä?
    console.log("dateObj", dateObj.minutes);
    
    let trainingTime = new Date(dateObj.year, (dateObj.month - 1), dateObj.day, dateObj.hours, dateObj.minutes, 0, 0);
    const isValidDate = (trainingTime instanceof Date && !isNaN(trainingTime.valueOf()));
    if (isValidDate)
      console.log("oikein")
    else 
      console.log("virhe")
    
    if (isValidDate) {
      newTraining.date = trainingTime.toISOString();

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
    else {
      alert("Check your date! Format is DD.MM.YYYY TT:TT, e.g. 12.04.2021 16:00");  
    }
    //https://customerrest.herokuapp.com/api/trainings
    console.log("Isoaika", newTraining.date);
    

    
    
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
      headerName: '',
      field: 'links.0.href',
      width: 80,
      cellRendererFramework: params => 
        <IconButton color='secondary' onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon />
        </IconButton>
    },
    {
      headerName: '',
      field: 'links.0.href',
      width: 80,
      cellRendererFramework: params => 
        <EditCustomer link={params.value} editCustomer={editCustomer} customer={params.data}/>
    },
    {
      headerName: '',
      field: 'links.0.href',
      width: 120,
      cellRendererFramework: params =>
        <Button color='primary' size='small' onClick={() => handleTrainingDialog(true, params.value)}>Add training</Button>
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
        <Snackbar 
        open={open}
        message={msg}
        autoHideDuration={4000}
        onClose={closeSnackbar}
      />
      </div>
    </div>
  );
}

export default Customers;
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
//import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

//TODO: Confirm windowin tilalle joku muu?
//tilasto?

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isTrDialogVisible, setTrDialogVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState('');
  const [msg, setMsg] = useState('');
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  const openSnackbar = () => {
    setOpenSnackbar(true);
  }

  const closeSnackbar = () => {
    setOpenSnackbar(false);
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
      if (response.ok) {
        setMsg('Customer added');
        openSnackbar();
        fetchCustomers();
      }
      else 
        alert("Something went wrong!");
    })
    .catch(err => console.error(err))
  }

  const handleDeleteConfirm = (url) => {
    setOpenConfirm(true);
    setDeleteUrl(url);
  }

  const handleClose = () => {
    setOpenConfirm(false);
  };

  const handleOk = () => {
    deleteCustomer();
    handleClose();
  }

  const deleteCustomer = () => {
    //console.log(url);
    if (window.confirm('Delete customer?')) {
      fetch(deleteUrl, { method: 'DELETE'})
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
    
    //console.log("dateObj", dateObj.minutes);
    
    let trainingTime = new Date(dateObj.year, (dateObj.month - 1), dateObj.day, dateObj.hours, dateObj.minutes, 0, 0);
    let isValidDate = (trainingTime instanceof Date && !isNaN(trainingTime.valueOf()));
    if (dateObj.minutes.length < 2) {
      isValidDate = false;
    }
    /*if (isValidDate)
      console.log("oikein")
    else 
      console.log("virhe")*/
    
    if (isValidDate) {
      newTraining.date = trainingTime.toISOString();

      fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        body: JSON.stringify(newTraining),
        headers: { 'Content-type' : 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          setMsg('A new training added');
          openSnackbar();  
        }
        else 
          alert("Something went wrong!");
      })
      .catch(err => console.error(err))
    }
    else {
      alert("Check your date! Format is DD.MM.YYYY TT:TT, e.g. 28.04.2021 16:00");  
    }
  }  

  const testi = (params) => {
    console.log(params)
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

  /*<IconButton color='secondary' onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon />
        </IconButton>*/
 

  const columns = [
    {
      headerName: '',
      field: 'links.0.href',
      width: 80,
      cellRendererFramework: params => 
        <IconButton color='secondary' onClick={() => handleDeleteConfirm(params.value)}>
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
      width: 130,
      cellRendererFramework: params =>
        <Button color='primary' size='small' onClick={() => handleTrainingDialog(true, params.value)}>Add training</Button>
    },
    {
      headerName: 'Customer',
      field: 'links.0.href',
      width: 250,
      cellRendererFramework: params =>
        <div>
          {`${params.data.firstname} ${params.data.lastname}`}
        </div> 
    },
    {
      headerName: 'Address',
      field: 'links.0.href',
      width: 300,
      cellRendererFramework: params =>
        <div>
          {`${params.data.streetaddress} ${params.data.city} ${params.data.postcode}`}
        </div> 
    },
    {field: 'email', sortable: true, filter: true},
    {field: 'phone', sortable: true, filter: true},
  ];
  
  
  //<IconButton color='secondary' onClick={() => testi(params.data.streetaddress)}>
  //<DeleteIcon />
  //</IconButton>
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
        open={openSnackbar}
        message={msg}
        autoHideDuration={4000}
        onClose={closeSnackbar}
      />
      
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        
      >
        <DialogTitle id="alert-dialog-title">{"Delete customer?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}

export default Customers;
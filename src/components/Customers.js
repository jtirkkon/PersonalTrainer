import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import Statistics from './Statistics';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isTrDialogVisible, setTrDialogVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState('');
  const [msg, setMsg] = useState('');
  
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
      if (response.ok) {
        setMsg('Customer added');
        openSnackbarWindow();
        fetchCustomers();
      }
      else 
        alert("Something went wrong!");
    })
    .catch(err => console.error(err))
  }

  const openSnackbarWindow = () => {
    setOpenSnackbar(true);
  }

  const closeSnackbar = () => {
    setOpenSnackbar(false);
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
    fetch(deleteUrl, { method: 'DELETE'})
      .then(response => {
        if (response.ok) {
          setMsg('Customer deleted');
          openSnackbarWindow();
          fetchCustomers();
        }
        else 
          alert("Something went wrong!");
      })
      .catch(err => console.error(err))
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
        openSnackbarWindow();
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
    
    let trainingTime = new Date(dateObj.year, (dateObj.month - 1), dateObj.day, dateObj.hours, dateObj.minutes, 0, 0);
    let isValidDate = (trainingTime instanceof Date && !isNaN(trainingTime.valueOf()));
    if ((dateObj.minutes.length < 2) || (dateObj.minutes > 59) || (dateObj.hours > 24) || (dateObj.day > 31) || (dateObj.month > 12)) {
      isValidDate = false;
    }
   
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
          openSnackbarWindow();  
        }
        else 
          alert("Something went wrong!");
      })
      .catch(err => console.error(err))
    }
    else {
      setOpenAlert(true);
    }
  }  

  const handleTrainingDialog = (isOpen, customer) => {
    setTrDialogVisible(isOpen);
    setCurrentCustomer(customer);
  }

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
      width: 80,
      cellRendererFramework: params => 
        <Statistics link={params.value} customer={`${params.data.firstname} ${params.data.lastname}`}/>  
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
          paginationPageSize={10}
          suppressCellSelection={true}
        />
        
        <Dialog
          open={openConfirm}
          onClose={handleClose}
          aria-labelledby="delete-dialog"
        >
          <DialogTitle id="delete-dialog-title">{"Delete customer?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleOk} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          aria-labelledby="alert-dialog"
        >
          <DialogTitle id="alert-dialog-title">{"Check your date!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Date format is DD.MM.YYYY TT:TT, e.g. 28.04.2021 16:00  
            </DialogContentText>
            </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAlert(false)} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        
        <Snackbar 
          open={openSnackbar}
          message={msg}
          autoHideDuration={4000}
          onClose={closeSnackbar}
        />
      </div>
    </div>
  );
}

export default Customers;
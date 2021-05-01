import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  
  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  const handleDeleteConfirm = (id) => {
    setOpenConfirm(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  const handleOk = () => {
    deleteTraining();
    handleClose();
  }

  const deleteTraining = () => {
    const url = `https://customerrest.herokuapp.com/api/trainings/${deleteId}`;
    //console.log("url", url);
    fetch(url, { method: 'DELETE'})
      .then(response => {
        if (response.ok) 
          fetchTrainings();
        else 
          alert("Something went wrong!");
      })
      .catch(err => console.error(err))
    }
  
  const columns = [
    {
      headerName: '',
      field: 'id',
      width: 80,
      cellRendererFramework: params => 
      <div>
        <IconButton color='secondary' onClick={() => handleDeleteConfirm(params.value)}>
          <DeleteIcon />
        </IconButton>
      </div>
    },
    {
      headerName: 'Date', 
      field: 'date',
      cellRendererFramework: params => 
      <div>
        {moment(params.value).format('MMMM Do YYYY, h:mm:ss a')}
      </div>,
      sortable: true,
      filter: true
    },
    {field: 'activity', sortable: true, filter: true},
    {field: 'duration', sortable: true, filter: true},
    {
      headerName: 'Customer', 
      field: 'customer.lastname',
      cellRendererFramework: params => 
      <div>
        {`${params.data.customer.firstname} ${params.value}`}
      </div>,  
      sortable: true, 
      filter: true, 
      width: 200
    }
  ];

  return (
    <div>
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto'}}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={12}
        />
      </div>

      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        
      >
        <DialogTitle id="alert-dialog-title">{"Delete training?"}</DialogTitle>
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
  );
}

export default Trainings;
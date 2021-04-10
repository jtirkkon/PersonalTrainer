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
  const [showTrainingDialog, setShowTrainingDialog] = useState(false);
  
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

  const handleTrainingDialog = () => {
    setShowTrainingDialog(true);
    console.log("showTrainingDialog", showTrainingDialog);
  }

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
        <Button color='primary' size='small' onClick={handleTrainingDialog}>Add training</Button>
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
  //välittää myös funktion???
  //loginModalRef = ({toggleModal}) =>{
   // this.showModal = toggleModal;
  
  return (
    <div className="App">
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto'}}>
        <AddCustomer addCustomer={addCustomer} />
        <AddTraining isOpen={showTrainingDialog} />
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
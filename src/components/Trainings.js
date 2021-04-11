import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Trainings() {
  const [trainings, setTrainings] = useState([]);
  
  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  /*const testing = (date) => {
    console.log(date)
    console.log(moment(date).format('MMMM Do YYYY, h:mm:ss a'));
  }*/

  const deleteTraining = (id) => {
    console.log("delete traing", id);
    const url = `https://customerrest.herokuapp.com/api/trainings/${id}`;
    console.log("url", url);

    if (window.confirm('Delete training?')) {
      fetch(url, { method: 'DELETE'})
      .then(response => {
        if (response.ok) 
          fetchTrainings();
        else 
          alert("Something went wrong!");
      })
      .catch(err => console.error(err))
    }
  }
 
  const columns = [
    {
      headerName: '',
      field: 'id',
      width: 80,
      cellRendererFramework: params => 
      <div>
        <IconButton color='secondary' onClick={() => deleteTraining(params.value)}>
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
        {`${params.value}`}
      </div>,  
      sortable: true, 
      filter: true, 
      width: 200
    }
  ];

  //{`${params.value} ${params.data.customer.firstname} `}
  
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
    </div>
  );
}

export default Trainings;
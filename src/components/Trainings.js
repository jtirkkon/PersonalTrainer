import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
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

  const testing = (date) => {
    console.log(date)
    console.log(moment(date).format('MMMM Do YYYY, h:mm:ss a'));
  }
 
  const columns = [
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
        {`${params.value} ${params.data.customer.firstname} `}
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
          paginationPageSize={8}
        />
      </div>
    </div>
  );
}

export default Trainings;
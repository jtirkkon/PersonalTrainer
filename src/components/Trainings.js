import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
//import AppBar from '@material-ui/core/AppBar';
//import Tabs from '@material-ui/core/Tabs';
//import Tab from '@material-ui/core/Tab'; 

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
  //cellStyle: params => (params.value ===  "High" || params.value ===  "high")  ? {color: 'red'} : {color:'black'},

  const columns = [
    {field: 'date', sortable: true, filter: true,},
    {field: 'activity', sortable: true, filter: true},
    {field: 'duration', sortable: true, filter: true},
    {headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true, width: 150},
    {headerName: '', field: 'customer.lastname', sortable: true, filter: true}
    
    
   
    /*{field: 'city', sortable: true, filter: true},
    {field: 'email', sortable: true, filter: true},
    {field: 'phone', sortable: true, filter: true},*/
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
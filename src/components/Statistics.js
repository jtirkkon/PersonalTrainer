import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CloseIcon from '@material-ui/icons/Close';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

function Statistics(props) {

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [customerTrainings, setCustomerTrainings] = useState([]);
  const [customer, setCustomer] = useState('');
  
  let data = [];

  const handleClickOpen = () => {
    setCustomer(props.customer);
    setOpen(true);
    const url = `${props.link}/trainings`;
    fetch(url)
    .then(response => response.json())
    .then(data => setCustomerTrainings(data.content))
    .catch(err => console.error(err))
  }

  const handleClose = () => {
    setOpen(false);
  };

  if (customerTrainings.length > 0) {
    const tempArr = Object.values(_.groupBy(customerTrainings, item => item.activity));
    
    tempArr.forEach(item => {
      data.push({name: item[0].activity, time: _.sumBy(item, 'duration')});
    });
  }  
  
  return (
    <div>
      <IconButton color='primary' onClick={handleClickOpen}>
        <EqualizerIcon />
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>  
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <div>
              {customer}
            </div>
          </Toolbar>
        </AppBar>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>  
      </Dialog>
    </div>
  );
}

export default Statistics;

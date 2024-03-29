import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddTraining (props) {
  const [training, setTraining] = useState({date: '', activity: '', duration: '', customer: ''});
 
  const handleClose = () => {
    setTraining({date: '', activity: '', duration: '', customer: ''});
    props.handleTrainingDialog(false);
  }

  const handleSave = () => {
    props.addTraining(training);
    props.handleTrainingDialog(false);
    setTraining({date: '', activity: '', duration: '', customer: ''});
  }

  const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value, customer: props.customer});
  }
  
  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Training</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            label="Date"
            name='date'
            value={training.date}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Activity"
            name='activity'
            value={training.activity}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Duration"
            name='duration'
            value={training.duration}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;
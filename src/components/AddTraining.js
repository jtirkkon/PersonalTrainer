import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddTraining (props) {
  const [open, setOpen] = useState(props.isOpen);
  const [training, setTraining] = useState({date: '', activity: '', duration: ''});

  console.log("trainingDialo", props.isOpen);

  //let open = props.isOpen;

  /*useEffect(() => {
    if (props.isOpen)
    setOpen(true);  
  https://stackoverflow.com/questions/63329030/how-i-can-open-a-modal-from-another-component-in-react}, [])
  https://upmostly.com/tutorials/modal-components-react-custom-hooks
  
  */

  const handleClickOpen = () => {
    //setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    props.addTraining(training);
    setTraining({date: '', activity: '', duration: ''});
    //setOpen(false);
  }

  const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  }
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
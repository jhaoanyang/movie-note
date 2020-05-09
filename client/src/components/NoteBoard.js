import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';

import { makeStyles, Grid } from '@material-ui/core/';

import Note from './note/Note'

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(3),
  }
}));

function NoteDashboard() {
  const classes = useStyles();

  const editedArray = useSelector(state => state.form.edited);
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(actions.updateDB(editedArray));
  }, 60000);
  window.onbeforeunload = e => {
    dispatch(actions.updateDB(editedArray));
  };

  const formData = useSelector(state => state.form.data);

  return (
    <Grid container spacing={4} className={classes.grid}>
      {formData.map((item, index) => 
        <Note
          key={index}
          noteItem={item}
        />
      )}
      
    </Grid>
  );
}

export default NoteDashboard;

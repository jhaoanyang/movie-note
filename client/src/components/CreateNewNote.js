import React from 'react';
// import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
// import AddIcon from '@material-ui/icons/Add';

import NewNoteInput from './NewNoteInput'


const useStyles = makeStyles((theme) => ({
  rightBottom: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  }
}));

function CreateNewNote() {
  const classes = useStyles();

  return (
    <Grid className={classes.rightBottom}>
      <NewNoteInput />
      {/* <Fab color="secondary" >
        <AddIcon />
      </Fab> */}
    </Grid>
  );
}

export default CreateNewNote;

import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions';

import { makeStyles, TextField } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 150,
  },
}));

function WatchDay(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const onSubmit = data => {
    const editedData = {
      watchDay: data
    }
    dispatch(actions.editForm(editedData, props.id));
  };
  
  return(
    <form className={classes.container} noValidate>
      <TextField
        type="date"
        className={classes.textField}
        defaultValue={props.watchDay}
        onChange={(e) => onSubmit(e.target.value)}
      />
    </form>
  );
}

export default WatchDay;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions';

import { makeStyles, Grid, Card, Collapse } from '@material-ui/core/';
import Draggable from 'react-draggable';

import CollapseArrow from './CollapseArrow'
import Title from './Title';
import AuthRead from './AuthRead';
import Delete from './Delete';
import WatchDay from './WatchDay';
import Genre from './Genre';
// import CheckBoxes from './CheckBoxes';
import OtherNote from './OtherNote';



const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 350,
    maxWidth: 350,
    padding: theme.spacing(2)
  },
  delete: {
    right: theme.spacing.unit * 1
  }
}));


function Note(props) {
  const classes = useStyles();
  const { noteItem } = props;

  const [ position, setPosition ] = useState({ x: noteItem.x, y: noteItem.y });

  const dispatch = useDispatch();
  const handleOnStop = (e, dragElement) => {
    const data = {
      x: dragElement.x,
      y: dragElement.y
    };
    setPosition(data);
    dispatch(actions.editForm(data, noteItem._id));
  };


  return (
    <Draggable
      position={position}
      onStop={(e, dragElement) => handleOnStop(e, dragElement)}
    >
      <Card className={classes.card}>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>

            <Grid
              container
              justify="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <CollapseArrow
                  id={noteItem._id}
                  collapse={noteItem.collapse}
                />
              </Grid>

              <Grid item>
                <Title
                  id={noteItem._id}
                  title={noteItem.title}
                />
              </Grid>
            </Grid>

          </Grid>

          <Grid item>
            <Grid
              container spacing={1}
            >
              <Grid item>
                <AuthRead
                    id={noteItem._id}
                    authRead={noteItem.authRead}
                />
              </Grid>

              <Grid item>
                <Delete id={noteItem._id} />
              </Grid>

            </Grid>
            
          </Grid>
        </Grid>
        <hr />
        <Collapse in={noteItem.collapse}>
          {/* <ScenceForm
            id={noteItem._id}
            acts={noteItem.acts}
            sequenceMarks={noteItem.sequenceMarks}
            scenceSeparations={noteItem.scenceSeparations}
            scences={noteItem.scences}
            beatSeparations={noteItem.beatSeparations}
            beats={noteItem.beats}
          /> */}

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <WatchDay id={noteItem._id} watchDay={noteItem.watchDay} />
            </Grid>
            <Grid item xs={6}>
              <Genre id={noteItem._id} genre={noteItem.genre} />
            </Grid>
          </Grid>
          {/* <CheckBoxes
                  id={noteItem._id}
                  checkBoxes={noteItem.checkBoxes}
                /> */}

          <OtherNote id={noteItem._id} otherNote={noteItem.otherNote} />
        </Collapse>
      </Card>
    </Draggable>
  );
}

export default Note;

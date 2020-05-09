import React from 'react';

import { makeStyles, Grid, Card } from '@material-ui/core/';

import Title from './Title';
import AuthRead from './AuthRead';
import Delete from './Delete';
import WatchDay from './WatchDay';
import Genre from './Genre';
import Abstract from './Abstract';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  delete: {
    right: theme.spacing.unit * 1,
  },
}));

function Note(props) {
  const classes = useStyles();
  const { noteItem } = props;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <Grid container justify="space-between">
          <Grid item>
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Title id={noteItem._id} title={noteItem.title} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <AuthRead id={noteItem._id} authRead={noteItem.authRead} />
              </Grid>

              <Grid item>
                <Delete id={noteItem._id} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <WatchDay id={noteItem._id} watchDay={noteItem.watchDay} />
          </Grid>
          <Grid item xs={6}>
            <Genre id={noteItem._id} genre={noteItem.genre} />
          </Grid>
        </Grid>
        <hr />

        <Abstract id={noteItem._id}/>
      </Card>
    </Grid>

  );
}

export default Note;

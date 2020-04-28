import React from 'react';
import { useSelector } from 'react-redux';

import { AppBar, Toolbar, Typography, Button, makeStyles }  from '@material-ui/core/';
import TheatersIcon from '@material-ui/icons/Theaters';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function Header() {
  const classes = useStyles();

  const authData = useSelector(state => state.auth);

  function loginStatus() {
    switch (authData) {
      case null:
        return;
      case false:
        return (
          <Button color="inherit" href="/auth/google">Login With Google</Button>
        );
      default:
        return (
          <Button color="inherit" href="/api/logout">Logout</Button>
        );
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <TheatersIcon />Movie Notes
          </Typography>
          {loginStatus()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;

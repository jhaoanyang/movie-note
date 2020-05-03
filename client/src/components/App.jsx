import React, { useEffect }from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Header from './Header';
import NoteDashboard from './NoteDashboard';
import CreateNewNote from './CreateNewNote';
import NotePublicShow from './NotePublicShow';



const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6ec6ff",
      main: "#2196f3",
      dark: "#0069c0",
      contrastText: "#fff",
    },
    secondary: {
      light: "#63a4ff",
      main: "#1976d2",
      dark: "#004ba0",
      contrastText: "#fff",
    },
  },
});

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
    console.log("Fetched User");
  },
  []);

  const authData = useSelector(state => state.auth);

  const fetchUserFirst = () => {
    if (authData !== null) {
      dispatch(actions.loadForm(authData._id));
      console.log("Fetched ID: "+ authData._id);
    }
  };

  useEffect(() => {
    fetchUserFirst();
  },
  [authData]);
  

  return (
    <div>
     <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={NoteDashboard} />
            { authData &&
              <Route exact path="/" component={CreateNewNote} />
            }
            </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

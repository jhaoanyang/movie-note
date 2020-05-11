import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Header from "./Header";
import NoteBoard from "./NoteBoard";
import CreateNewNote from "./CreateNewNote";

const TEN_SECOND = 1000;

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
  }, []);

  const authData = useSelector((state) => state.auth);

  const fetchUserFirst = () => {
    if (authData !== null) {
      dispatch(actions.loadForm(authData._id));
      console.log("Fetched ID: " + authData._id);
    }
  };

  useEffect(() => {
    fetchUserFirst();
  }, [authData]);

  const formData = useSelector((state) => state.form.data);

  setTimeout(() => {
    dispatch(actions.updateDB(formData));
  }, TEN_SECOND);

  window.onbeforeunload = () => {
    dispatch(actions.updateDB(formData));
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <NoteBoard />
        {authData && <CreateNewNote />}
      </ThemeProvider>
    </div>
  );
}

export default App;

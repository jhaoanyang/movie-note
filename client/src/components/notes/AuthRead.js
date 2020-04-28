import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions';

import { Box, Button, Menu, MenuItem } from '@material-ui/core/';
import PublicIcon from '@material-ui/icons/Public';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';


function AuthRead(props) {

  const authNow = authRead => {
    if (authRead === "") {
      return <PublicIcon />
    } else {
      return <PermIdentityIcon />
    }
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleClose = (e) => {

    setAnchorEl(null);
    let data = {};
    if (e.target.innerText !== "　公開") {
      data = {
        authRead: authData._id
      }
    } else {
      data = {
        authRead: ""
      }
    }
    dispatch(actions.editForm(data, props.id));
  };


  return(
    <Box>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}

      >
        {authNow(props.authRead)}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          name="public"
          onClick={e => handleClose(e)}>
          <PublicIcon />
          　公開
        </MenuItem>
        <MenuItem
          name="privite"
          onClick={e => handleClose(e)}>
          <PermIdentityIcon />
           　僅供自己
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default AuthRead;

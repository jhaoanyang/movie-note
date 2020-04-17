import React from "react";
import { useSelector } from "react-redux";
import TheatersIcon from '@material-ui/icons/Theaters';

function Header() {
  const authData = useSelector((state) => state.auth);

  function loginStatus() {
    switch (authData) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login With Google</a></li>
        );
      default:
        return (
          <li><a href="/api/logout">Logout</a></li>
        );
    }
  }

  return (
    <nav>
      <div className="nav-wrapper amber darken-3">
        <a href="/" className="brand-logo">
          <TheatersIcon />Movie Notes
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {loginStatus()}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

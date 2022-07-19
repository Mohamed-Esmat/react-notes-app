import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";
function Navbar() {


let token = localStorage.getItem('token')

if(token){
  var decoded = jwt_decode(token);
  console.log(decoded)
}


  let location = useLocation();


  function logout(){
    localStorage.clear();
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Notes
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {location.pathname === '/home' ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item nav-hi-user">
                  <span>{decoded? 'Hi,'+decoded.first_name :''}</span>
                </li>
                <li className="nav-item">
                  <NavLink onClick={logout} className="nav-link" to="/login">
                    Logout
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

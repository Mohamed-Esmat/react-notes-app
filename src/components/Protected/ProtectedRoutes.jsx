import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function ProtectedRoutes(props) {
  // let auth = {'token': localStorage.getItem('token')};

  let token = localStorage.getItem('token');
  try {
    jwt_decode(token)
    return <Outlet/>
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }
  // return <Outlet />
  // return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;

//<Outlet path='/home' element={props.element}/>

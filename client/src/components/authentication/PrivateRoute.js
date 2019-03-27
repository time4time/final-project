// import React, { Component } from 'react';
import React from 'react';
import { Route, Redirect } from "react-router-dom";

//declarar si la ruta es privada y realizar validaciones 
//en caso de necesitar que este logueado para mostrar 
// wrapping/composing
const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  
  <Route {...rest} render={(props) => (
        loggedIn ? (
            <Component {...props} {...rest}/>
        ) : (
          <Redirect to="/login"/>
        )
  )}/>
//   
)

export default PrivateRoute;
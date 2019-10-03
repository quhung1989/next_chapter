import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      render={props =>
        rest.username ? ( 
          <Component {...props} username={rest.username}/>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
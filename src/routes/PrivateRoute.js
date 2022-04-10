import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ path, exact, render }) => {
  let login = false;
  if (!login) return <Redirect to='/login' />;

  return <Route path={path} exact={exact} render={render} />;
};

export default PrivateRoute;

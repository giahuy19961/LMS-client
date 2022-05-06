import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ path, exact, render }) => {
  // let login = false;
  let { userInfo } = useSelector((state) => state.authReducer);

  if (userInfo === null) return <Redirect to='/login' />;

  return <Route path={path} exact={exact} render={render} />;
};

export default PrivateRoute;

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../features/Login/Index";
import Verify from "../features/Verify/Index";


const Main = () => (
  <main>
    <Switch>
      <Redirect exact from='/' to='/login'/>
      <Route path="/login" component={ Login } />
      <Route path="/auth" component={ Verify } />
    </Switch>
  </main>
);

export default Main;
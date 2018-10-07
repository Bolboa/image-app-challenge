import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../features/Authorization/Login/Index";
import Verify from "../features/Authorization/Verify/Index";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../features/Profile/User/Index";
import User from "../features/ExternalUsers/User/Index"; 


const Main = () => (
  <main>
    <Switch>
      <Redirect exact from='/' to='/login'/>
      <Route path="/login" component={ Login } />
      <Route path="/auth" component={ Verify } />
      <ProtectedRoute  
        path="/home" 
        component={ Home } 
      />
      <ProtectedRoute
        path="/profile/:user"
        component={ Profile }
      />
      <ProtectedRoute
        path="/users/:user"
        component={ User }
      />
    </Switch>
  </main>
);


export default Main;
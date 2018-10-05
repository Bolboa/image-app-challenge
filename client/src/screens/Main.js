import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../features/Authorization/Login/Index";
import Verify from "../features/Authorization/Verify/Index";
import Images from "../features/Home/Images/Index";
import ProtectedRoute from "./ProtectedRoute";



const Main = ({ fetch_user_details }) => (
  <main>
    <Switch>
      <Redirect exact from='/' to='/login'/>
      <Route path="/login" component={ Login } />
      <Route path="/auth" component={ Verify } />
      <ProtectedRoute  
        path="/home" 
        component={ Images } 
      />
    </Switch>
  </main>
);


export default Main;
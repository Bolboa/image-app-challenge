import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { fetch_user_details: state.fetch_user_details };
};
  

/*
This route is only accessible if a user is authorized.
*/
class ConnectedProtectedRoute extends Component {
  
  render() {

    // Save all props.
    const { component: Component, ...props } = this.props;

    return (
      <Route
        { ...props }
        render={props => (
          this.props.fetch_user_details.is_authorized ?
          <Component {...props} /> :
          <Redirect from="/app" to="/login" />
        )}
      />
    );
  }
}


const ProtectedRoute = connect(mapStateToProps)(ConnectedProtectedRoute);

export default ProtectedRoute;
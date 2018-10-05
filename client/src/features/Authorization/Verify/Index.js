import React, { Component } from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { authorize } from "./verify_actions";


const mapStateToProps = state => {
  return { fetch_user_details: state.fetch_user_details };
};

const mapDispatchToProps = dispatch => {
  return {
    authorize: (access_code, csrf_string) => dispatch(authorize(access_code, csrf_string))
  };
}


class ConnectedVerify extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount = () => {

    // Get authorization code from query parameter.
    const access_code = this.props.location.search.split("&")[0].split("=")[1];
   
    // Unique string to ensure no one messed with the authorization. 
    const csrf_string = Cookies.get("csrf_string");
    
    // Give the user authorization.
    this.props.authorize(access_code, csrf_string)
      .then(() => {

        // Allow the user access to the main page if authorized.
        if (this.props.fetch_user_details.is_authorized) {
          this.props.history.push("/home");
        }
        else {
          
          // If a request fails, the access token is most
          // likey invalid and another one must be issued.
          this.props.history.push("/login");

        }
        
      });
    
  }

  render() {
    
    return (
      <h1>Authorizing</h1>
    );
  }
}


const Verify = connect(mapStateToProps, mapDispatchToProps)(ConnectedVerify)

export default Verify;
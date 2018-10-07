import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import qs from "query-string";
import random_string from "randomstring";
import { verify_token } from "../../../actions/global_actions";
import "./Login.css";


const mapStateToProps = state => {
  return { fetch_user_details: state.fetch_user_details };
};

const mapDispatchToProps = dispatch => {
  return {
    verify_token: (access_token) => dispatch(verify_token(access_token))
  };
}


class ConnectedLogin extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount = () => {

    // Get access token.
    const access_token = Cookies.get("access_token");

    // Access token is verified.
    this.props.verify_token(access_token)
      .then(() => {

        // Send the user to the main page if the access token
        // is still valid.
        if (this.props.fetch_user_details.is_authorized) {
          
          // The home page needs to be refreshed when visited
          // because of the infinite scroll functionality.
          window.location = process.env.REDIRECT_URI + "/home";

        }

      });

  }

  /*
  Login via Github.
  */
  login = () => {

    // Random string used to check if the authorization credentials
    // have been tampered with.
    const csrf_string = random_string.generate();

    // Save the random string in a cookie to be used
    // for authentication purposes later.
    Cookies.set("csrf_string", csrf_string);

    // Convert the authorization details into a string
    // to be used as a URL query.
    const query = qs.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI + "/auth",
      state: csrf_string,
      scope: "user:email"
    });

    // Link for allowing a user to give the app permission to access
    // their Github information.
    window.location = "https://github.com/login/oauth/authorize?" + query;

  }

  render() {

    return (
      
      <button className="login" onClick={ () => this.login() }>
        Login with Github
      </button>
      
    );
  }
}


const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);

export default Login;
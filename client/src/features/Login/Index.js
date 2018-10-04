import React, { Component } from "react";
import Cookies from "js-cookie";
import qs from "query-string";
import random_string from "randomstring";


class Login extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {

    const csrf_string = random_string.generate();

    Cookies.set("csrf_string", csrf_string);

    const query = qs.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI + "/auth",
      state: csrf_string,
      scope: "user:email"
    });

    window.location = "https://github.com/login/oauth/authorize?" + query;
  }

  render() {
    return (
      <h1>HI</h1>
    );
  }
}

export default Login;
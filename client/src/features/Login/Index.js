import React, { Component } from "react";

const qs = require("query-string");
const random_string = require("randomstring");


class Login extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {

    const query = qs.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI + "/auth",
      state: random_string.generate()
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
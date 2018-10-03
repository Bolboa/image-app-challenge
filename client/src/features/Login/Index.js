import React, { Component } from "react";

const qs = require("query-string");
const random_string = require("randomstring");


class Login extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {

    const query = qs.stringify({
      client_id: "d7b9470d972b5cf98fc7",
      redirect_uri: "http://localhost:8080/auth",
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
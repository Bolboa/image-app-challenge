import React, { Component } from "react";
import Cookies from "js-cookie";
import API from "../../utils/API";


class Verify extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {

    const access_code = this.props.location.search.split("&")[0].split("=")[1];
    const csrf_string = Cookies.get("csrf_string")

    // Define the headers.
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    
    // Define the REST API.
    const api = new API({ url: process.env.API_URL + "/user" });
    
    // Define the route.
    api.create_entity({ name: "auth" }, headers);

    api.endpoints.auth.create({ data: { code: access_code, csrf: csrf_string } })
      .then(response => response.json())
      .then(json_response => {
        console.log(json_response);
      })
      .catch(err => {
        throw err;
      })
    
  }

  render() {
    return (
      <h1>Verify</h1>
    );
  }
}

export default Verify;
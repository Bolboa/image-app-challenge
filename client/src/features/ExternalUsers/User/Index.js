import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { load_user_images } from "../../Profile/User/profile_actions";
import ExternalProfile from "./UserView";


const mapStateToProps = state => {
  return { 
    fetch_user_details: state.fetch_user_details,
    saved_images: state.saved_images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load_user_images: (user_id, access_token) => dispatch(load_user_images(user_id, access_token)),
  };
}


class ConnectedUser extends Component {

  constructor(props) {
    super(props);
  }

  
  componentDidMount = () => {
    
    // Get the user's ID.
    const user_id = this.props.match.params.user;

    // Get access token.
    const access_token = Cookies.get("access_token");

    // Load a user's images.
    this.props.load_user_images(access_token, user_id);

  }


  render() {
    
    return (
      
      <ExternalProfile
        access_token={ Cookies.get("access_token") }
      />
      
    );
  }
}


const User = connect(mapStateToProps, mapDispatchToProps)(ConnectedUser);

export default User;
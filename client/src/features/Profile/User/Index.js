import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { load_user_images } from "../../Profile/User/profile_actions";
import ProfileImages from "./ProfileView";


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


class ConnectedProfile extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    
    // Get the user's ID.
    const user_id = this.props.match.params.user;

    // Get access token.
    const access_token = Cookies.get("access_token");

    // Load a user's images.
    this.props.load_user_images(access_token, user_id)

  }


  /*
  Button that allows user to go to the home page.
  */
  click_handler = () => {

    // Redirect to the home page.
    window.location = process.env.REDIRECT_URI + "/home";

  }


  render() {
    
    return (
      
      <ProfileImages 
        click_handler={ this.click_handler } 
        saved_images={ this.props.saved_images } 
      />
      
    );
  }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);

export default Profile;
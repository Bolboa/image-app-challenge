import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { load_user_images, delete_user_image } from "../../Profile/User/profile_actions";
import ProfileImages from "./ProfileView";


const mapStateToProps = state => {

  return { 
    fetch_user_details: state.fetch_user_details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load_user_images: (user_id, access_token) => dispatch(load_user_images(user_id, access_token)),
    delete_user_image: (image, access_token) => dispatch(delete_user_image(image, access_token))
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


  render() {
    
    return (
      
      <ProfileImages 
        access_token={ Cookies.get("access_token") }
      />
      
    );
  }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);

export default Profile;
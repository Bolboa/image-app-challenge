import React, { Component } from "react";
import { connect } from "react-redux";
import User from "../features/ExternalUsers/User/Index";
import "../styles/Menu.css";
import "../styles/General.css";
import { fetch_products_failure } from "../actions/global_actions";


const mapStateToProps = state => {
  return { 
    fetch_user_details: state.fetch_user_details,
    saved_images: state.saved_images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(fetch_products_failure())
  };
}


class ConnectedExternalUserProfile extends Component {

  constructor(props) {
    super(props);
  }


  /*
  Button that allows user to go to the home page.
  */
  click_handler_home = () => {

    // Redirect to the home page.
    window.location = process.env.REDIRECT_URI + "/home";

  }


  /*
  Button to allow user to view their own profile.
  */
  click_handler_profile = () => {

    // Go to user's profile and pass their ID as a query parameter.
    this.props.history.push("/profile/" + this.props.fetch_user_details.user_id);

  }


  render() {
    
    return (
      
      <div>
        <p className="name">{ this.props.saved_images.name }</p>
        <div className="menu">
          <button className="menu_btn" onClick={ () => this.click_handler_home() }>
            Home
          </button>
          <button className="menu_btn" onClick={ () => this.click_handler_profile() }>
            Profile
          </button>
          <button className="logout" onClick={ () => this.props.logout() }>
            Logout
          </button>
        </div>
        <User 
          match={ this.props.match }
        />
      </div>
      
    );
  }
}


const ExternalUserProfile = connect(mapStateToProps, mapDispatchToProps)(ConnectedExternalUserProfile);

export default ExternalUserProfile;
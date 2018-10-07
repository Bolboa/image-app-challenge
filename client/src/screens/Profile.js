import React, { Component } from "react";
import { connect } from "react-redux";
import Profile from "../features/Profile/User/Index";
import "../styles/Menu.css";
import "../styles/General.css";
import { fetch_products_failure } from "../actions/global_actions";


const mapStateToProps = state => {
  return { 
    fetch_user_details: state.fetch_user_details,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(fetch_products_failure())
  };
}


class ConnectedUserProfile extends Component {

  constructor(props) {
    super(props);
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
      
      <div>
        <p className="name">{ this.props.fetch_user_details.first_name }</p>
        <div className="menu">
          <button className="menu_btn" onClick={ () => this.click_handler() }>
            Home
          </button>
          <button className="logout" onClick={ () => this.props.logout() }>
            Logout
          </button>
        </div>
        <Profile 
          match={ this.props.match }
        />
      </div>
      
    );
  }
}


const UserProfile = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserProfile);

export default UserProfile;
import React, { Component } from "react";
import { connect } from "react-redux";
import Users from  "../features/Home/Users/Index";
import Images from "../features/Home/Images/Index";
import "../styles/Menu.css";
import "../styles/General.css";
import { fetch_products_failure } from "../actions/global_actions";


const mapStateToProps = state => {
  return { 
    fetch_user_details: state.fetch_user_details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(fetch_products_failure())
  };
}


class ConnectedHome extends Component {

  constructor(props) {
    super(props);
  }


  /*
  Button to allow user to view their own profile.
  */
  click_handler = () => {

    // Go to user's profile and pass their ID as a query parameter.
    this.props.history.push("/profile/" + this.props.fetch_user_details.user_id);

  }


  render() {
    
    return (
      
      <div>
        <p className="name">Home</p>
        <div className="menu">
          <button className="menu_btn" onClick={ () => this.click_handler() }>
            Profile
          </button>
          <button className="logout" onClick={ () => this.props.logout() }>
            Logout
          </button>
        </div>
        <Users history={ this.props.history } />
        <Images />
      </div>
      
    );
  }
}


const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
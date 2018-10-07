import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { users_id_list } from "../features/Home/Users/users_actions";
import Users from  "../features/Home/Users/Index";
import Images from "../features/Home/Images/Index";


const mapStateToProps = state => {
  return { 
    fetch_user_details: state.fetch_user_details
  };
};


class ConnectedHome extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount = () => {

    // Get access token.
    const access_token = Cookies.get("access_token");

    // Load a user's images.
    //this.props.users_id_list(access_token);

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
        <button onClick={ () => this.click_handler() }>
          Profile
        </button>
        <Users history={ this.props.history } />
        <Images />
      </div>
      
    );
  }
}


const Home = connect(mapStateToProps)(ConnectedHome);

export default Home;
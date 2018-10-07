import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { users_id_list } from "./users_actions";
import UsersList from "./UsersListView";


const mapStateToProps = state => {
  return {
    fetch_user_details: state.fetch_user_details,
    users_list: state.users_list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    users_id_list: (access_token, user_id) => dispatch(users_id_list(access_token, user_id))
  };
}


class ConnectedUsers extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount = () => {

    // Get access token.
    const access_token = Cookies.get("access_token");

    // Get user's ID.
    const user_id = this.props.fetch_user_details.user_id;

    // Retrieve all users not including the current active
    // user.
    this.props.users_id_list(access_token, user_id);

  }

  click_handler = (e) => {
    this.props.history.push("/users/" + e.target.id);
  }


  render() {
    
    return (

      <UsersList 
        click_handler={ this.click_handler }
        users_list={ this.props.users_list } 
      />
      
    );
  }
}


const Users = connect(mapStateToProps, mapDispatchToProps)(ConnectedUsers);

export default Users;
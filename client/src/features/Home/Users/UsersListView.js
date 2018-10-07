import React from "react";
import "./Users.css";


const UsersList = ({ click_handler, users_list }) => (

  <div className="external_users">
    {
      users_list.users.map((user, i) => {
        return <p className="external" onClick={ (e) => click_handler(e) } key={ i } id={ user.github_id }>{ user.first_name }</p>
      })
    }
  </div>

);

export default UsersList;

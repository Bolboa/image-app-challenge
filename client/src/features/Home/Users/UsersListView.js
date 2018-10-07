import React from "react";


const UsersList = ({ click_handler, users_list }) => (

  <div>
    {
      users_list.users.map((user, i) => {
        return <p onClick={ (e) => click_handler(e) } key={ i } id={ user.github_id }>{ user.first_name }</p>
      })
    }
  </div>

);

export default UsersList;

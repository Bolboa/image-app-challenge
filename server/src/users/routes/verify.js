const oauth = require("../util/access_token");
const user_info = require("../controllers/user_info");
const create_user = require("../controllers/create_user");


/*
Route for verifying a user's access code.
*/
module.exports = { 
  method: "POST",
  path: "/user/auth/verify",
  config: { 
    pre: [
      {
        method: user_info.user_details,
        assign: "user_details"
      }
    ],
    auth: false,
    handler: create_user.create
  }
}
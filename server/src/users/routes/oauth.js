const oauth = require("../util/access_token");
const user_info = require("../controllers/user_info");
const create_user = require("../controllers/create_user");


/*
Route for authentication a user via OAuth.
*/
module.exports = { 
  method: "POST",
  path: "/user/auth",
  config: { 
    pre: [
      {
        method: oauth.access,
        assign: "access"
      },
      {
        method: user_info.email,
        assign: "email"
      }
    ],
    auth: false,
    handler: create_user.create
  }
}
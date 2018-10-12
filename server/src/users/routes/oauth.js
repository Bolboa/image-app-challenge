const oauth = require("../util/access_token");
const user_info = require("../controllers/user_info");
const create_user = require("../controllers/create_user");


/*
Route for authenticating a user via OAuth.
*/
module.exports = { 
  method: "GET",
  path: "/user/auth",
  config: { 
    pre: [
      [{
        method: oauth.access,
        assign: "access"
      }],
      [{
        method: user_info.user_details,
        assign: "user_details"
      }]
    ],
    auth: false,
    handler: create_user.create
  }
};

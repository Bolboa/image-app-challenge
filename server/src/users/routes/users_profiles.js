const user_info = require("../controllers/user_info");
const profiles = require("../controllers/profiles");



/*
Route for retrieving all images associated with a user's profile.
*/
module.exports = { 
  method: "GET",
  path: "/users/profiles",
  config: { 
    pre: [
      {
        method: user_info.user_details,
        assign: "user_details"
      }
    ],
    auth: false,
    handler: profiles.get_all
  }
};
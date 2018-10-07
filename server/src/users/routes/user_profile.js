const user_info = require("../controllers/user_info");
const profile = require("../controllers/profile");



/*
Route for retrieving all images associated with a user's profile.
*/
module.exports = { 
  method: "GET",
  path: "/user/profile",
  config: { 
    pre: [
      {
        method: user_info.user_details,
        assign: "user_details"
      }
    ],
    auth: false,
    handler: profile.load_images
  }
};
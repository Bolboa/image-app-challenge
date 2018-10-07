const user_info = require("../controllers/user_info");
const profile = require("../controllers/profile");


/*
Delete an image from a user's profile.
*/
module.exports = { 
  method: "GET",
  path: "/user/image/delete",
  config: { 
    pre: [
      {
        method: user_info.user_details,
        assign: "user_details"
      }
    ],
    auth: false,
    handler: profile.delete_image
  }
}
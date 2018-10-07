const user_info = require("../controllers/user_info");
const profile = require("../controllers/profile");


/*
Route for updating a user's images that will be
displayed on their personal profile.
*/
module.exports = { 
  method: "POST",
  path: "/user/image",
  config: {
    pre: [
      {
        method: user_info.user_details,
        assign: "user_details_images"
      }
    ],
    auth: false,
    handler: profile.add_image
  }
};
const axios = require("axios");
const Boom = require("boom");


/*
Route for getting the user's primary Github email.
*/
exports.user_details = async (req, h) => {

  // Check for an access code being passed down from a pre-handler or get it from
  // the main handler itself.
  const access_code = (typeof req.pre.access === "undefined") ? req.payload : req.pre.access;

  // Request to get all emails associated with the user's Github account.
  const user = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: "token " + access_code,
      "User-Agent": "Login-App"
    }
  })
  .then(response => {
    
    // Return the full details of the user.
    return response;

  })
  .catch(err => {
    throw Boom.badRequest(err);
  });
  
  // Return the details of a user and
  // their access token.
  return {
    user: user,
    access_token: access_code
  };

}
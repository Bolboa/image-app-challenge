const axios = require("axios");
const Boom = require("boom");


/*
Route for getting the user's primary Github email.
*/
exports.user_details = async (req, h) => {

  let access_token;

  // Check if access token was passed as a POST request.
  if (req.payload && req.payload.access_token) {
    access_token = req.payload.access_token;
  }
  else {

    // Check if the access token was newly created by a prior pre-handler or if
    // it was passed as a query parameter.
    access_token = (typeof req.pre.access === "undefined") ? req.query.access_token : req.pre.access;

  }  


  // Request to get all emails associated with the user's Github account.
  const user = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: "token " + access_token,
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
    access_token: access_token
  };

}
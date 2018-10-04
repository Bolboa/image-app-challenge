const axios = require("axios");
const Boom = require("boom");


/*
Route for getting the user's primary Github email.
*/
exports.email = async (req, h) => {

  // Request to get all emails associated with the user's Github account.
  const email_description = await axios.get("https://api.github.com/user/public_emails", {
    headers: {
      Authorization: "token " + req.pre.access,
      "User-Agent": "Login-App"
    }
  })
  .then(response => {
    
    // Loop through all emails.
    for (let email_item of response.data) {

      // Find the primary email and return it.
      if (email_item.primary) {
        return email_item;
      } 
    }

  })
  .catch(err => {
    throw Boom.badRequest(err);
  });

  // Return the email and the details associated with it.
  return email_description;

}
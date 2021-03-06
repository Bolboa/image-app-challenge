const axios = require("axios");
const qs = require("querystring");
const Boom = require("boom");


/*
Authorize a user and return an access code.
*/
const access = async (req, h) => {

  // The URL used for authorizing a user.
  const url = "https://github.com/login/oauth/access_token?";

  // Parameters needed for authorization.
  const query = qs.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.access_code,
    redirect_uri: process.env.REDIRECT_URI + "/auth",
    state: req.query.csrf
  });

  // Authorize the user and get the access code.
  const response = await axios.post(url + query)
    .then(response => {
      
      // Extract the response and parse it.
      let access_token_response = qs.parse(response.data);

      // If the response contains an error,
      // we throw the error.
      if (access_token_response.error) {
        throw Boom.badRequest(access_token_response.error);
      }

      // Return the access token.
      return access_token_response.access_token;

    })
    .catch(err => {
      throw Boom.badRequest(err);
    });

  return response;

}


module.exports = {
  access: access
}

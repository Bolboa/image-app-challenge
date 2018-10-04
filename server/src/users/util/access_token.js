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
    code: req.payload.code,
    redirect_uri: process.env.REDIRECT_URI + "/auth",
    state: req.payload.csrf
  })

  // Authorize the user and get the access code.
  const response = await axios.post(url + query)
    .then(response => {

      // Extract the access code and return it.
      let access_token = qs.parse(response.data).access_token;
      return access_token

    })
    .catch(err => {
      throw Boom.badRequest(err);
    });
  
  return response;

}


module.exports = {
  access: access
}
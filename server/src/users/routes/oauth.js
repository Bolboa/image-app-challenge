const oauth = require("../controllers/oauth");


/*
Route for authentication a user via OAuth.
*/
module.exports = { 
  method: "POST",
	path: "/user/auth",
	config: { 
    auth: false,
    handler: oauth.verify
  }
}
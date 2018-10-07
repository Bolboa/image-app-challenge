const User = require("../models/User.js");
const Boom = require("boom");


/*
Create a new user or get the user from the database.
*/
exports.create = async (req, h) => {

  if (!req.pre.user_details.user.data.name) {
    full_name = [req.pre.user_details.user.data.login, ""];
  }
  else {
    
    // Split name into first name and last name.
    full_name = req.pre.user_details.user.data.name.split(" ");
    
  }

  // Github ID.
  const github_id = req.pre.user_details.user.data.id;

  // Check the database for the user.
  let user = await User.findOne({ github_id: github_id });

  // User does not exist.
  if (!user) {
    
    // Create a user.
    user = await new User();
    user.github_id = github_id;
    user.first_name = full_name[0];
    user.last_name = full_name[1];

    // Save the user.
    try {
      await user.save();
    } catch (err) {
      throw Boom.badRequest(err);
    }
  }

  // Return the first name and last name
  // of the user.
  return h.response({
    first_name: user.first_name,
    last_name: user.last_name,
    user_id: user.github_id,
    access_token: req.pre.user_details.access_token
  }).code(201);

}
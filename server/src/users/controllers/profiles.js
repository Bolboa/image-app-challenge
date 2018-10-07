const User = require("../models/User.js");


/*
Get all users except for the current user.
*/
exports.get_all = async (req, h) => {

  // Get all users except for the current user.
  const users = await User.find({ github_id: { $nin: [req.query.user_id] } }).select("-images");

  // If there are no other users,
  // return an empty list.
  const users_list = users ? users : [];
  
  return h.response({ users: users_list }).code(200);

}
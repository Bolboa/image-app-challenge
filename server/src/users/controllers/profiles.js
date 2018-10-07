const User = require("../models/User.js");


exports.get_all = async (req, h) => {

  const users = await User.find({ github_id: { $nin: [req.query.user_id] } }).select("-images");

  const users_list = users ? users : [];
  
  return h.response({ users: users_list }).code(200);

}
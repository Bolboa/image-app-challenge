const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const user_schema = new Schema({
  github_id: {type: Number, required: true, index: { unique: true } },
  first_name: { type: String, required: true },
  last_name: { type: String },
  images: [{
    type: String
  }]
});


module.exports = mongoose.model('User', user_schema);


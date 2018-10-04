const axios = require("axios");
const qs = require("querystring");


exports.create = async (req, h) => {
  console.log(req.pre.email);
  //console.log(req.pre.access);
  return {yes: "yes"}
}
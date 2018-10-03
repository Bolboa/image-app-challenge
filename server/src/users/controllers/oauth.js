



exports.verify = async (req, h) => {
  console.log(req.payload);
  return {yes: "yes"};
}
const User = require("../models/User.js");
const Boom = require("boom");


/*
Update the user's images.
*/
exports.add_image = async (req, h) => {

  // Unique Github ID.
  const github_id = req.pre.user_details_images.user.data.id;

  // Image link.
  const image = req.payload.image

  try {

    // Update the user's images and ensure
    // images are unique.
    await User.updateOne({ github_id: github_id },
      { $addToSet: { images: image } }
    );

  } catch (err) {
    throw Boom.badRequest(err);
  }

  // Successful response.
  return h.response({ success: "success" }).code(204);

}


/*
Retrieve all images associated with a user.
*/
exports.load_images = async (req, h) => {
  
  const user_id = req.query.user_id;

  // Check the database for the user.
  let user = await User.findOne({ github_id: user_id });

  // Check is user exists.
  if (user) {

    // Success.
    return h.response({ name: user.first_name, images: user.images }).code(200);
    
  }

  throw Boom.badRequest("User ID is not valid!");
  
}


/*
Delete and image from a user's profile.
*/
exports.delete_image = async (req, h) => {

  // Image URL.
  const image = req.query.image;

  // Github ID.
  const github_id = req.pre.user_details.user.data.id;

  // Find a user and delete the image.
  const user = await User.findOneAndUpdate({ github_id: github_id }, 
    { $pullAll: { images: [image]} },
    { new: true }
  );

  // Check if user exists.
  if (user) {

    // Success.
    return h.response({ images: user.images }).code(200);

  }

  // Throw an error if the user is not found.
  throw Boom.badRequest("User ID is not valid!");

}
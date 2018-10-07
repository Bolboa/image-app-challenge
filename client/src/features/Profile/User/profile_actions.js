import qs from "query-string";
import API from "../../../util/API";
import { fetch_products_failure } from "../../../actions/global_actions";


/*
Save a an image to a user's profile.
*/
export const save_image = (image, access_token) => {

  // Define the REST API.
  const api = new API({ url: process.env.API_URL + "/user" });

  // Define the headers.
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  // Define the route.
  api.create_entity({ name: "image" }, headers);

  return dispatch => {
    
    // Request is in process.
    dispatch(save_image_begin());

    // Get the user details.
    return api.endpoints.image.create({ data: { image: image, access_token: access_token } })
      .then(response => response.text())
      .then(text_response => {

        // User's images updated successfully.
        dispatch(save_image_success());

        // We just return the text response since we aren't using any
        // HTTPS protocols. This is to avoid CORS issues.
        return text_response ? JSON.parse(text_response) : {};

      })
      .catch(err => {

        // Failed to save image.
        dispatch(save_image_failure(err));

        // Unauthenticate the user.
        dispatch(fetch_products_failure(err));

      });

  }
}


/*
POST request to save image to a user's account has been called.
*/
export const save_image_begin = () => ({
  type: "SAVE_IMAGE_BEGIN"
});

/*
POST request to save image to a user's account was successful.
*/
export const save_image_success = (response) => ({
  type: "SAVE_IMAGE_SUCCESS",
  payload: response
});

/*
POST request to save image to a user's account was a failure.
*/
export const save_image_failure = () => ({
  type: "SAVE_IMAGE_FAILURE"
});


/*
Load a user's images to populate their profile.
*/
export const load_user_images = (access_token, user_id) => {

  // Define the REST API.
  const api = new API({ url: process.env.API_URL + "/user" });

  // Define the headers.
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  // Define the route.
  api.create_entity({ name: "profile" }, headers);

  return dispatch => {
    
    // Request is in process.
    dispatch(load_images_begin());

    // Define query parameters.
    const query = qs.stringify({
      access_token: access_token,
      user_id: user_id
    });

    // Get the user details.
    return api.endpoints.profile.get_one({ id: query })
      .then(response => response.json())
      .then(json_response => {

        // Check for 400 and 500 error codes.
        if ([4,5].includes(json_response.statusCode / 100)) {

          // Request failed.
          dispatch(load_images_failure(json_response.message));
          dispatch(fetch_products_failure(json_response.message));

        }
        else {

          // Successful request.
          dispatch(load_images_success(json_response));
          
        }

      })
      .catch(err => dispatch(load_images_failure(err)));

  }
}


/*
GET request to retrieve all images from a user's account has been called.
*/
export const load_images_begin = () => ({
  type: "LOAD_IMAGES_BEGIN"
});

/*
GET request to retrieve all images from a user's account was successful.
*/
export const load_images_success = (response) => ({
  type: "LOAD_IMAGES_SUCCESS",
  payload: response
});

/*
GET request to retrieve all images from a user's account was a failure.
*/
export const load_images_failure = () => ({
  type: "LOAD_IMAGES_FAILURE"
});
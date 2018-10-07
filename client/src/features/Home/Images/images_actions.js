import { fetch_products_failure } from "../../../actions/global_actions";


/*
Authorize a user and get an access code.
*/
export const images = (page) => {

  // Define the headers.
  let headers = new Headers();
  headers.append("Accept", "application/json");

  return dispatch => {

    // Request is in process.
    dispatch(fetch_images_begin());

    // Get images.
    return fetch("https://pixabay.com/api/?key=" + process.env.PIXABAY_API_KEY + "&page=" + String(page), {
      method: "GET",
      headers: headers
    }).then(response => response.json())
      .then(json_response => {

        // Check for 400 and 500 error codes.
        if ([4,5].includes(json_response.statusCode / 100)) {

          // Request failed.
          dispatch(fetch_images_failure(json_response.message));

          // Unauthenticate the user.
          dispatch(fetch_products_failure(json_response.message));
        
        }
        else {

          // Successful request.
          dispatch(fetch_images_success(json_response, page));

        }

      })
      .catch(err => {

        // Failed to retrieve images.
        dispatch(fetch_images_failure(err));

        // Unauthenticate the user.
        dispatch(fetch_products_failure(err));

      });

  }
  
}


/*
GET request for images from Pixabay API has been called.
*/
export const fetch_images_begin = () => ({
  type: "FETCH_IMAGES_BEGIN"
});

/*
GET request for images from Pixabay API was successful.
*/
export const fetch_images_success = (data, page) => ({
  type: "FETCH_IMAGES_SUCCESS",
  payload: { data: data, page: page }
});

/*
GET request for images from Pixabay API failed.
*/
export const fetch_images_failure = err => ({
  type: "FETCH_IMAGES_FAILURE",
  payload: err
});


/*
Delete the images saved in local storage.
*/
export const reset_images = () => {

  return dispatch => {

    // Returning a promise allows the action creator to be used as
    // a promise.
    return new Promise((resolve, reject) => {
      
      dispatch({
        type: "RESET_IMAGES"
      });

      resolve();

    });
  }
  
}

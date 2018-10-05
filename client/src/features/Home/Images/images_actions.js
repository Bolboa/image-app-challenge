/*
Authorize a user and get an access code.
*/
export const images = () => {

  // Define the headers.
  let headers = new Headers();
  headers.append("Accept", "application/json");

  return dispatch => {

    // Request is in process.
    dispatch(fetch_images_begin());

    // Get images.
    fetch("https://pixabay.com/api/?key=" + process.env.PIXABAY_API_KEY, {
      method: "GET",
      headers: headers
    }).then(response => response.json())
      .then(json_response => {

        // Check for 400 and 500 error codes.
        if ([4,5].includes(json_response.statusCode / 100)) {

          // Request failed.
          dispatch(fetch_images_failure(json_response.message));

        }
        else {

          // Successful request.
          dispatch(fetch_images_success(json_response));

        }

      })
      .catch(err => dispatch(fetch_products_failure(err)));

  }
  
}


/*
Request is in process.
*/
export const fetch_images_begin = () => ({
  type: "FETCH_IMAGES_BEGIN"
});

/*
Request is successful.
*/
export const fetch_images_success = data => ({
  type: "FETCH_IMAGES_SUCCESS",
  payload: data
});

/*
Request failed.
*/
export const fetch_images_failure = err => ({
  type: "FETCH_IMAGES_FAILURE",
  payload: err
});
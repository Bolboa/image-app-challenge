import API from "../../../util/API";


/*
Authorize a user and get an access code.
*/
export const authorize = (access_code, csrf_string) => {

  // Define the REST API.
  const api = new API({ url: process.env.API_URL + "/user" });

  // Define the headers.
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  // Define the route.
  api.create_entity({ name: "auth" }, headers);

  return dispatch => {
    
    // Request is in process.
    dispatch(fetch_products_begin());

    // Get the user details.
    return api.endpoints.auth.create({ data: { code: access_code, csrf: csrf_string } })
      .then(response => response.json())
      .then(json_response => {

        // Check for 400 and 500 error codes.
        if ([4,5].includes(json_response.statusCode / 100)) {

          // Request failed.
          dispatch(fetch_products_failure(json_response.message));

        }
        else {
          
          // Successful request.
          dispatch(fetch_products_success(json_response));
          
        }

      })
      .catch(err => dispatch(fetch_products_failure(err)));

  }
}


/*
Request is in process.
*/
export const fetch_products_begin = () => ({
  type: "FETCH_PRODUCTS_BEGIN"
});

/*
Request is successful.
*/
export const fetch_products_success = data => ({
  type: "FETCH_PRODUCTS_SUCCESS",
  payload: data
});

/*
Request failed.
*/
export const fetch_products_failure = err => ({
  type: "FETCH_PRODUCTS_FAILURE",
  payload: err
});
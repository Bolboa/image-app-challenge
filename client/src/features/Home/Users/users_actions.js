import qs from "query-string";
import API from "../../../util/API";
import { fetch_products_failure } from "../../../actions/global_actions";


/*
Load a list of all users.
*/
export const users_id_list = (access_token, user_id) => {

  // Define the REST API.
  const api = new API({ url: process.env.API_URL + "/users" });

  // Define the headers.
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  // Define the route.
  api.create_entity({ name: "profiles" }, headers);

  return dispatch => {
    
    // Request is in process.
    dispatch(load_users_begin());

    // Define query parameters.
    const query = qs.stringify({
      access_token: access_token,
      user_id: user_id
    });

    // Get the user details.
    return api.endpoints.profiles.get_one({ id: query })
      .then(response => response.json())
      .then(json_response => {

        // Check for 400 and 500 error codes.
        if ([4,5].includes(json_response.statusCode / 100)) {

          // Request failed.
          dispatch(load_users_failure(json_response.message));
          dispatch(fetch_products_failure(json_response.message));

        }
        else {

          // Successful request.
          dispatch(load_users_success(json_response));
          
        }

      })
      .catch(err => {
        dispatch(load_users_failure(err));
        dispatch(fetch_products_failure(err));
      });

  };
};

/*
GET request to get all users has been called.
*/
export const load_users_begin = () => ({
  type: "LOAD_USERS_BEGIN"
});

/*
GET request to get all users was successful.
*/
export const load_users_success = (response) => ({
  type: "LOAD_USERS_SUCCESS",
  payload: response
});

/*
GET request to get all users was a failure.
*/
export const load_users_failure = () => ({
  type: "LOAD_USERS_FAILURE"
});
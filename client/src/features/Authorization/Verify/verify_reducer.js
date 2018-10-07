import Cookies from "js-cookie";


const initial_state = {
  is_authorized: false,
  loading: false,
  first_name: "",
  last_name: "",
  user_id: null,
  error: null
};


const fetch_user_details = (state = initial_state, action) => {

  switch (action.type) {
    
    case "FETCH_PRODUCTS_BEGIN":
      
      return {
        ...state,
        loading: true
      };
    
    
    case "FETCH_PRODUCTS_SUCCESS":

      // Save access token in a cookie.
      Cookies.set("access_token", action.payload.access_token);

      return {
        ...state,
        is_authorized: true,
        loading: false,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        user_id: action.payload.user_id,
        error: null
      }
    
    
    case "FETCH_PRODUCTS_FAILURE":

      // If a request fails, 
      // then the access token is invalid
      // and all saved data must be cleared.
      localStorage.clear();

      // Access token is no longer valid so
      // it is removed.
      Cookies.remove("access_token");

      // The unique string used for authorizaton purposes
      // is no longer invalid so it is removed.
      Cookies.remove("csrf_string");

      return {
        ...state,
        is_authorized: false,
        loading: false,
        error: action.payload,
        first_name: "",
        last_name: "",
        user_id: null
      }
    
    
    default:
      return state;
      
  }
}

export default fetch_user_details;
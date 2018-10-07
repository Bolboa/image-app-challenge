import { combineReducers } from "redux";
import fetch_user_details from "../features/Authorization/Verify/verify_reducer";
import fetch_images from "../features/Home/Images/images_reducer";
import saved_images from "../features/Profile/User/profile_reducer";
import users_list from "../features/Home/Users/users_reducer";


export default combineReducers({
  fetch_user_details,
  fetch_images,
  saved_images,
  users_list
});
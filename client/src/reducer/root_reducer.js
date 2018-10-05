import { combineReducers } from "redux";
import fetch_user_details from "../features/Authorization/Verify/verify_reducer";
import fetch_images from "../features/Home/Images/images_reducer";


export default combineReducers({
  fetch_user_details,
  fetch_images
});
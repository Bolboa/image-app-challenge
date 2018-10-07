import React from "react";
import { connect } from "react-redux";
import { delete_user_image } from "./profile_actions";
import "../../../styles/Images.css";


const mapStateToProps = state => {

  return { 
    fetch_user_details: state.fetch_user_details,
    saved_images: state.saved_images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delete_user_image: (image, access_token) => dispatch(delete_user_image(image, access_token))
  };
}


const ConnectedProfileImages = ({ saved_images, delete_user_image, access_token }) => (

  <div className="images">
    {
      saved_images.images.map((image, i) => {
        return <img className="image" onClick={ (e) => delete_user_image(e.target.src, access_token) } key={ i } src={ image } />
      })
    }
  </div>
);


const ProfileImages = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfileImages);

export default ProfileImages;
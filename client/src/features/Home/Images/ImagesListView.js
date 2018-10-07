import React from "react";
import { save_image } from "../../Profile/User/profile_actions";
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 
    saved_images: state.saved_images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    save_image: (image, access_token) => dispatch(save_image(image, access_token))
  };
}


const ConnectedImagesList = ({ live_images, save_image, access_token }) => (

  <div className="Images">
    {
      live_images && live_images.map((image, i) => {
        return <img onClick={ (e) => save_image(e.target.src, access_token) } className={ String(i) } key={ i } src={ image.largeImageURL } />;
      })
    }
  </div>
);


const ImagesList = connect(mapStateToProps, mapDispatchToProps)(ConnectedImagesList);

export default ImagesList;
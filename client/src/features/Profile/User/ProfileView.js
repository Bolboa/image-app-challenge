import React from "react";


const ProfileImages = ({ click_handler, saved_images }) => (

  <div className="profile">
    <button onClick={ () => click_handler() }>Home</button>
      {
        saved_images.images.map((image, i) => {
          return <img key={ i } src={ image } />
        })
      }
  </div>
);

export default ProfileImages;
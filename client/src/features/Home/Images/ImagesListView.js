import React from "react";


const ImagesList = ({ live_images }) => (
  <div className="Images">
    {
      live_images && live_images.map((image, i) => {
        return <img className={ String(i) } key={ i } src={ image.largeImageURL } />;
      })
    }
  </div>
);

export default ImagesList;
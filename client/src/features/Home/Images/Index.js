import React, { Component } from "react";
import { connect } from "react-redux";
import { images, reset_images } from "./images_actions";
import ImagesList from "./ImagesListView";


const mapStateToProps = state => {
  return { 
    fetch_user_details: state.fetch_user_details,
    fetch_images: state.fetch_images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    images: (page) => dispatch(images(page)),
    reset_images: () => dispatch(reset_images())
  };
}


class ConnectedImages extends Component {

  constructor(props) {
    super(props);

    
    // Scroll to the top of the page
    // every time the page loads.
    // Also load in the first page.
    window.onload = () => {
      window.scrollTo(0,0);
      this.props.images(1);
    }

    // Load another page every time we reach the bottom
    // of the window.
    window.onscroll = () => {
      
      // Check to see if we are at the bottom of the window.
      if (window.innerHeight + document.documentElement.scrollTop 
          === document.documentElement.offsetHeight) {
            
            // Load the next page.
            this.props.images(this.props.fetch_images.page);

      }
    }

  }


  componentDidMount = () => {
    
    // Clear the saved images in the persisted state.
    this.props.reset_images();
    
  }


  render() {

    // Load the state from the reducer.
    const { page, loading, images, error } = this.props.fetch_images;
    
    // Images to be rendered.
    const live_images = [];

    // Loop through the images in the state and add them
    // to the list of images to be rendered.
    if (images && images.length > 0) {
      images.forEach((image) => {
        live_images.push(image);
      });
    }
    
    return (
      
      <ImagesList live_images={ live_images } />

    );
  }
}


const Images = connect(mapStateToProps, mapDispatchToProps)(ConnectedImages);

export default Images;
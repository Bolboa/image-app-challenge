import React, { Component } from "react";
import { connect } from "react-redux";
import { images } from "./images_actions";


const mapStateToProps = state => {
  return { 
    fetch_user_details: state.fetch_user_details,
    fetch_images: state.fetch_images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    images: () => dispatch(images())
  };
}


class ConnectedImages extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    
    // Retrieve images.
    this.props.images();
    
  }

  render() {
    return (
      <div>
        {
          this.props.fetch_images.images.hits.map((image, i) => {
            return <img key={i} src={image.largeImageURL} />;
          })
        }
      </div>
    );
  }
}


const Images = connect(mapStateToProps, mapDispatchToProps)(ConnectedImages);

export default Images;
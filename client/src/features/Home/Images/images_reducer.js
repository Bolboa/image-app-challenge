const initial_state = {
  loading: false,
  images: {},
  error: null
};


const fetch_images = (state = initial_state, action) => {

  switch (action.type) {
    
    case "FETCH_IMAGES_BEGIN":
      
      return {
        ...state,
        loading: true
      };
    
    
    case "FETCH_IMAGES_SUCCESS":

      return {
        ...state,
        loading: false,
        images: {...action.payload},
        error: null
      }
    
    
    case "FETCH_IMAGES_FAILURE":

      return {
        ...state,
        loading: false,
        images: {},
        error: action.payload
      }
    
    
    default:
      return state;
      
  }
}

export default fetch_images;
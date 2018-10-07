const initial_state = {
  loading: false,
  name: "",
  images: [],
  error: ""
};
  
  
const saved_images = (state = initial_state, action) => {
  
  switch (action.type) {
      
    case "SAVE_IMAGE_BEGIN":
        
      return {
        ...state,
        loading: true
      };
      
      
    case "SAVE_IMAGE_SUCCESS":
      
      // Ensure the correct type.
      let result;
      if (JSON.stringify(state.images) === '{}') {
        result = [];
      }
      else {
        result = [...state.images];
      }

      return {
        ...state,
        loading: false,
        images: [...result],
        error: ""
      }
      
      
    case "SAVE_IMAGE_FAILURE":
  
      return {
        ...state,
        loading: false,
        error: String(action.payload)
      }
  
      case "LOAD_IMAGES_BEGIN":
        
      return {
        ...state,
        loading: true
      };
      
      
    case "LOAD_IMAGES_SUCCESS":

      return {
        ...state,
        loading: false,
        name: action.payload.name,
        images: [...action.payload.images],
        error: ""
      }
      
      
    case "LOAD_IMAGES_FAILURE":
  
      return {
        ...state,
        loading: false,
        error: String(action.payload)
      }


    case "DELETE_IMAGE_BEGIN":
      
      return {
        ...state,
        loading: true
      };


    case "DELETE_IMAGE_SUCCESS":

      return {
        ...state,
        loading: false,
        images: [...state.images.filter(item => item !== action.payload)],
        error: ""
      }

    
    case "DELETE_IMAGE_FAILURE":

      return {
        ...state,
        loading: false,
        error: String(action.payload)
      }
      
         
    default:
      return state;
        
  }
}
  
export default saved_images;
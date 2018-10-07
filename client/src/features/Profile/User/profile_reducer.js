const initial_state = {
  loading: false,
  name: "",
  images: [],
  error: null
};
  
  
const saved_images = (state = initial_state, action) => {
  
  switch (action.type) {
      
    case "SAVE_IMAGE_BEGIN":
        
      return {
        ...state,
        loading: true
      };
      
      
    case "SAVE_IMAGE_SUCCESS":
      
      return {
        ...state,
        loading: false,
        images: [...state.images],
        error: null
      }
      
      
    case "SAVE_IMAGE_FAILURE":
  
      return {
        ...state,
        loading: false,
        error: action.payload
      }
  
      case "LOAD_IMAGES_BEGIN":
        
      return {
        ...state,
        loading: true
      };
      
      
    case "LOAD_IMAGES_SUCCESS":
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        name: action.payload.name,
        images: [...action.payload.images],
        error: null
      }
      
      
    case "LOAD_IMAGES_FAILURE":
  
      return {
        ...state,
        loading: false,
        error: action.payload
      }
        
      
    default:
      return state;
        
  }
}
  
export default saved_images;
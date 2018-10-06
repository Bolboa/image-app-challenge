import PersistedState from "../../../util/persisted_state";

const initial_state = {
  page: 0,
  loading: false,
  images: [],
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
      //console.log(...state.images);

      
      return {
        ...state,
        page: action.payload.page + 1,
        loading: false,
        images: [...state.images, ...action.payload.data.hits],
        error: null
      }
    
    
    case "FETCH_IMAGES_FAILURE":

      return {
        ...state,
        loading: false,
        images: [],
        error: action.payload
      }

    case "RESET_IMAGES":
      console.log("inside");
      const persisted_state = new PersistedState();
      const saved_images = persisted_state.load_state();

      const {["fetch_images"]: deleted, ...rest} = saved_images;
      persisted_state.save_state(rest);

      return {
        ...state,
        page: 0,
        loading: false,
        images: [],
        error: null
      }
    
    
    default:
      return state;
      
  }
}

export default fetch_images;
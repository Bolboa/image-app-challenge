const initial_state = {
  loading: false,
  users: [],
  error: null
};
  
  
const users_list = (state = initial_state, action) => {
  
  switch (action.type) {

    case "LOAD_USERS_BEGIN":
      
      return {
        ...state,
        loading: true,
        error: null
      };
  
  
    case "LOAD_USERS_SUCCESS": 

      return {
        ...state,
        loading: false,
        users: [...action.payload.users]
      };
  
      
    case "LOAD_USERS_FAILURE":
  
      return {
        ...state,
        loading: false,
        error: action.payload
      };
        
      
    default:
      return state;
        
  }
};
  
export default users_list;
/*
Saves and loads state from local storage.
*/
class PersistedState {
  
  /*
  Load a state into local storage.
  */
  load_state = () => {
    
    try {

      // Check is a state already exists in local storage.
      let saved_state = localStorage.getItem(process.env.REDIRECT_URI + ":state");
      
      if (saved_state == null) {
        
        // Default state is returned.
        return this.initalize_state();

      }

      return JSON.parse(saved_state);

    } catch (err) {

      // If there is an error,
      // the default state is returned.
      return this.initalize_state();

    }
  }


  /*
  Save a state into local storage.
  */
  save_state = (state) => {
    
    try {
      
      // Save state to local storage.
      localStorage.setItem(process.env.REDIRECT_URI + ":state", JSON.stringify(state));

    } catch (err) {};

  }


  /*
  Returns an empty state which tells the store
  to return the default states from the reducers.
  */
  initalize_state = () => {
    return {};
  }

}

export default PersistedState;
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer/root_reducer";
import thunk from "redux-thunk";
import PersistedState from "../util/persisted_state";


// Saves and loads states in case a window is reloaded.
const persisted_state = new PersistedState();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// Store continuously saves the state on every change.
store.subscribe(()=>{
  persisted_state.save_state(store.getState());
});

export default store;
import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// reducers
import mainReducer from "./modules/main";
import { reducer as toastrReducer } from "react-redux-toastr";

const rootReducer = combineReducers({
  main: mainReducer,
  toastr: toastrReducer,
});

export default rootReducer;

// Template

// Persist Config:
// const sideBarPersistConfig = {
//   key: "sidebar",
//   storage,
//   whitelist: ["role", "sideBarType"],
// }
// Persist Reducer:
// sidebar: persistReducer(sideBarPersistConfig, sideBarReducer),

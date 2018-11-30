import AppState from "../State/AppState";
import { combineReducers } from "redux";
import ImageViewReducer from "./ImageView/ImageViewReducer";
import WindowReducer from "./Window/WindowReducer";

let rootReducer = combineReducers({
  imageView: ImageViewReducer,
  window: WindowReducer
});

type x = keyof AppState;

export default rootReducer;

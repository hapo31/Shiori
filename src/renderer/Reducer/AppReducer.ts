import { combineReducers } from "redux";
import ImageViewReducer from "./ImageView/ImageViewReducer";
import WindowReducer from "./Window/WindowReducer";
import FileReducer from "./FIle/FileReducer";

let rootReducer = combineReducers({
  imageView: ImageViewReducer,
  window: WindowReducer,
  file: FileReducer
});

export default rootReducer;

console.log("InitialState:", rootReducer({} as any, { type: null }));

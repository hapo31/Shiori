import { createStore } from "redux";
import AppReducer from "../Reducer/AppReducer";

let store = createStore(AppReducer);

export default store;

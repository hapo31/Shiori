import {
  WindowAction,
  WindowActionType
} from "../../Actions/Window/WindowActions";
import { ipcRenderer } from "electron";
import { WindowEvent } from "../../../events/Window";

export default function WindowReducer(state = {}, action: WindowAction) {
  switch (action.type) {
    case WindowActionType.WINDOW_SIZE_CHANGE: {
      const { width, height } = action;
      ipcRenderer.send(WindowEvent.changeWindowSizeRequest, width, height);
      return state;
    }

    case WindowActionType.APPLICATION_CLOSE: {
      ipcRenderer.send(WindowEvent.closeApplication);
      return state;
    }

    default:
      return state;
  }
}

import AppState from "../State/AppState";
import { FileActionType, FileAction } from "../Actions/File/FileAction";
import { ipcRenderer } from "electron";
import { FileEvent } from "../../events/File";
import {
  WindowActionType,
  WindowAction
} from "../Actions/Window/WindowActions";
import { WindowEvent } from "../../events/Window";

type Actions = FileAction | WindowAction;

const initialState = {
  index: -1,
  files: [],
  dirPath: ""
};

export default function AppReducer(
  state: AppState = initialState,
  action: Actions
): AppState {
  console.log({ action });
  switch (action.type) {
    case FileActionType.CHANGEFILES: {
      return {
        ...state,
        // フォルダが変わったらindexを0に戻す
        index: 0,
        files: action.files
      };
    }
    case FileActionType.OPENDIALOG: {
      ipcRenderer.send(FileEvent.openDialogRequest, action.option);
      return state;
    }

    case FileActionType.REQUEST_FILE_ENUMRATE: {
      ipcRenderer.send(FileEvent.fileChangeRequest, action.dirPath);
      return {
        ...state,
        dirPath: action.dirPath
      };
    }
    case FileActionType.INCREMENT_INDEX: {
      // index + 1 が length 以上ならインクリメントしない
      const nextIndex =
        state.index + 1 > state.files.length ? state.index : state.index + 1;
      return {
        ...state,
        index: nextIndex
      };
    }
    case FileActionType.DECREMENT_INDEX: {
      // index - 1 が 0未満ならデクリメントしない
      const nextIndex = state.index - 1 < 0 ? 0 : state.index - 1;
      return {
        ...state,
        index: nextIndex
      };
    }

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

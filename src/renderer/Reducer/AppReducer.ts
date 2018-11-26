import AppState from "../State/AppState";
import { ActionType, FileAction } from "../Actions/File/FileAction";
import { ipcRenderer } from "electron";
import { FileEvent } from "../../events/File";

type Actions = FileAction;

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
    case ActionType.CHANGEFILES: {
      return {
        ...state,
        // フォルダが変わったらindexを0に戻す
        index: 0,
        files: action.files
      };
    }
    case ActionType.OPENDIALOG: {
      ipcRenderer.send(FileEvent.openDialogRequest, action.option);
      return state;
    }

    case ActionType.REQUEST_FILE_ENUMRATE: {
      ipcRenderer.send(FileEvent.fileChangeRequest, action.dirPath);
      return {
        ...state,
        dirPath: action.dirPath
      };
    }
    case ActionType.INCREMENT_INDEX: {
      // index + 1 が length 以上ならインクリメントしない
      const nextIndex =
        state.index + 1 > state.files.length ? state.index : state.index + 1;
      return {
        ...state,
        index: nextIndex
      };
    }
    case ActionType.DECREMENT_INDEX: {
      // index - 1 が 0未満ならデクリメントしない
      const nextIndex = state.index - 1 < 0 ? 0 : state.index - 1;
      return {
        ...state,
        index: nextIndex
      };
    }
    default:
      return state;
  }
}

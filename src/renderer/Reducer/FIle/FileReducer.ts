import { FileEvent } from "../../../events/File";
import { ipcRenderer } from "electron";
import { FileActionType, FileAction } from "../../Actions/File/FileActions";

const initialState = {};

export default function FileReducer(state = initialState, action: FileAction) {
  switch (action.type) {
    case FileActionType.OPENDIALOG: {
      ipcRenderer.send(FileEvent.openDialogRequest, action.option);
      return state;
    }

    case FileActionType.REQUEST_FILE_ENUMRATE: {
      ipcRenderer.send(FileEvent.fileEnumrateRequest, action.dirPath);
      return state;
    }

    default:
      return state;
  }
}

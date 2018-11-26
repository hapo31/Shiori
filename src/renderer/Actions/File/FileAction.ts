import { createAppAction } from "../ActionType";
import { OpenDialogOptions } from "electron";

export enum ActionType {
  FOLDERCHANGE = "FOLDERCHANGE",
  OPENDIALOG = "OPENDIALOG",
  INDEX_INCREMENT = "INDEX_INCREMENT",
  INDEX_DECREMENT = "INDEX_DECREMENT"
}

const folderChange = createAppAction(
  ActionType.FOLDERCHANGE,
  (files: string[]) => ({
    files
  })
);

const openDialog = createAppAction(
  ActionType.OPENDIALOG,
  (option: OpenDialogOptions, callback: (filePaths: string) => void) => ({
    ...option,
    callback
  })
);

const indexIncrement = createAppAction(ActionType.INDEX_INCREMENT);

const indexDecrement = createAppAction(ActionType.INDEX_DECREMENT);

export type FileAction = ReturnType<
  | typeof folderChange
  | typeof openDialog
  | typeof indexIncrement
  | typeof indexDecrement
>;

export const fileActions = {
  folderChange,
  openDialog,
  indexIncrement,
  indexDecrement
};

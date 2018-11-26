import { createAppAction } from "../ActionType";
import { OpenDialogOptions } from "electron";

export enum ActionType {
  CHANGEFILES = "CHANGEFILES",
  OPENDIALOG = "OPENDIALOG",
  REQUEST_FILE_ENUMRATE = "REQUEST_FILE_ENUMRATE",
  INCREMENT_INDEX = "INCREMENT_INDEX",
  DECREMENT_INDEX = "DECREMENT_INDEX"
}

const changeFiles = createAppAction(
  ActionType.CHANGEFILES,
  (files: string[]) => ({
    files
  })
);

const openDialog = createAppAction(
  ActionType.OPENDIALOG,
  (option: OpenDialogOptions) => ({
    option
  })
);

const requestFileEnumerate = createAppAction(
  ActionType.REQUEST_FILE_ENUMRATE,
  (dirPath: string) => ({
    dirPath
  })
);

const incrementIndex = createAppAction(ActionType.INCREMENT_INDEX);

const decrementIndex = createAppAction(ActionType.DECREMENT_INDEX);

export type FileAction = ReturnType<
  | typeof changeFiles
  | typeof openDialog
  | typeof requestFileEnumerate
  | typeof incrementIndex
  | typeof decrementIndex
>;

export const fileActions = {
  changeFiles,
  openDialog,
  requestFileEnumerate,
  incrementIndex,
  decrementIndex
};

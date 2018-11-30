import { OpenDialogOptions } from "electron";
import { createAppAction } from "../ActionType";

export enum FileActionType {
  OPENDIALOG = "OPENDIALOG",
  REQUEST_FILE_ENUMRATE = "REQUEST_FILE_ENUMRATE"
}
const openDialog = createAppAction(
  FileActionType.OPENDIALOG,
  (option: OpenDialogOptions) => ({
    option
  })
);

const requestFileEnumerate = createAppAction(
  FileActionType.REQUEST_FILE_ENUMRATE,
  (dirPath: string) => ({
    dirPath
  })
);

export type FileAction = ReturnType<
  typeof openDialog | typeof requestFileEnumerate
>;

export const fileActions = {
  openDialog,
  requestFileEnumerate
};

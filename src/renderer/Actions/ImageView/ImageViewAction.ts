import { createAppAction } from "../ActionType";
import { OpenDialogOptions } from "electron";

export enum ImageViewActionType {
  CHANGEFILES = "CHANGEFILES",
  OPENDIALOG = "OPENDIALOG",
  REQUEST_FILE_ENUMRATE = "REQUEST_FILE_ENUMRATE",
  INCREMENT_INDEX = "INCREMENT_INDEX",
  DECREMENT_INDEX = "DECREMENT_INDEX"
}

const changeFiles = createAppAction(
  ImageViewActionType.CHANGEFILES,
  (files: string[]) => ({
    files
  })
);

const openDialog = createAppAction(
  ImageViewActionType.OPENDIALOG,
  (option: OpenDialogOptions) => ({
    option
  })
);

const requestFileEnumerate = createAppAction(
  ImageViewActionType.REQUEST_FILE_ENUMRATE,
  (dirPath: string) => ({
    dirPath
  })
);

const incrementIndex = createAppAction(ImageViewActionType.INCREMENT_INDEX);

const decrementIndex = createAppAction(ImageViewActionType.DECREMENT_INDEX);

export type ImageViewAction = ReturnType<
  | typeof changeFiles
  | typeof openDialog
  | typeof requestFileEnumerate
  | typeof incrementIndex
  | typeof decrementIndex
>;

export const imageViewActions = {
  changeFiles,
  openDialog,
  requestFileEnumerate,
  incrementIndex,
  decrementIndex
};

import { createAppAction } from "../ActionType";
import { OpenDialogOptions } from "electron";

export enum ImageViewActionType {
  CHANGEFILES = "CHANGEFILES",

  INCREMENT_INDEX = "INCREMENT_INDEX",
  DECREMENT_INDEX = "DECREMENT_INDEX"
}

const changeFiles = createAppAction(
  ImageViewActionType.CHANGEFILES,
  (files: string[]) => ({
    files
  })
);

const incrementIndex = createAppAction(ImageViewActionType.INCREMENT_INDEX);

const decrementIndex = createAppAction(ImageViewActionType.DECREMENT_INDEX);

export type ImageViewAction = ReturnType<
  typeof changeFiles | typeof incrementIndex | typeof decrementIndex
>;

export const imageViewActions = {
  changeFiles,
  incrementIndex,
  decrementIndex
};

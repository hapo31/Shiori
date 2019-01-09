import { createAppAction } from "../ActionType";

export enum ImageViewActionType {
  CHANGEFILES = "CHANGEFILES",
  INCREMENT_INDEX = "INCREMENT_INDEX",
  DECREMENT_INDEX = "DECREMENT_INDEX",
  LOAD_STATE = "LOAD_STATE",
  SAVE_STATE = "SAVE_STATE"
}

const changeFiles = createAppAction(
  ImageViewActionType.CHANGEFILES,
  (files: string[]) => ({
    files
  })
);

const incrementIndex = createAppAction(ImageViewActionType.INCREMENT_INDEX);

const decrementIndex = createAppAction(ImageViewActionType.DECREMENT_INDEX);

const loadState = createAppAction(ImageViewActionType.LOAD_STATE);

const saveState = createAppAction(ImageViewActionType.SAVE_STATE);

export type ImageViewAction = ReturnType<
  | typeof changeFiles
  | typeof incrementIndex
  | typeof decrementIndex
  | typeof loadState
  | typeof saveState
>;

export const imageViewActions = {
  changeFiles,
  incrementIndex,
  decrementIndex,
  loadState,
  saveState
};

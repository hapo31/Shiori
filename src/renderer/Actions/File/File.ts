import { createAppAction } from "../ActionType";

export enum ActionType {
  FOLDERCHANGE = "FOLDERCHANGE",
  INDEX_INCREMENT = "INDEX_INCREMENT",
  INDEX_DECREMENT = "INDEX_DECREMENT"
}

const folderChange = createAppAction(
  ActionType.FOLDERCHANGE,
  (files: string[]) => ({
    files
  })
);

const indexIncrement = createAppAction(ActionType.INDEX_INCREMENT);

const indexDecrement = createAppAction(ActionType.INDEX_DECREMENT);

export type FileAction = ReturnType<
  typeof folderChange | typeof indexIncrement | typeof indexDecrement
>;

export const fileActions = {
  folderChange,
  indexIncrement,
  indexDecrement
};

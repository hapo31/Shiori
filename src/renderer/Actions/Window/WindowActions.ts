import { createAppAction } from "../ActionType";

export enum WindowActionType {
  WINDOW_SIZE_CHANGE = "WINDOW_SIZE_CHANGE",
  APPLICATION_CLOSE = "APPLICATION_CLOSE",
  APPLICATION_STATE_SAVE = "APPLICATION_STATE_SAVE",
  APPLICATION_STATE_LOAD = "APPLICATION_STATE_LOAD",
  DEVTOOL_OPEN = "DEVTOOL_OPEN"
}

const windowSizeChange = createAppAction(
  WindowActionType.WINDOW_SIZE_CHANGE,
  (width: number, height: number) => ({
    width,
    height
  })
);

const applicationClose = createAppAction(WindowActionType.APPLICATION_CLOSE);

const applicationStateSave = createAppAction(
  WindowActionType.APPLICATION_STATE_SAVE
);

const applicationStateLoad = createAppAction(
  WindowActionType.APPLICATION_STATE_LOAD
);

const devtoolOpen = createAppAction(WindowActionType.DEVTOOL_OPEN);

export type WindowAction = ReturnType<
  | typeof windowSizeChange
  | typeof applicationClose
  | typeof applicationStateSave
  | typeof applicationStateLoad
  | typeof devtoolOpen
>;

export const windowActions = {
  windowSizeChange,
  applicationClose,
  applicationStateSave,
  applicationStateLoad,
  devtoolOpen
};

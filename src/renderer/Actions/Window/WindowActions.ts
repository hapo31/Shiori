import { createAppAction } from "../ActionType";

export enum WindowActionType {
  WINDOW_SIZE_CHANGE = "WINDOW_SIZE_CHANGE",
  APPLICATION_CLOSE = "APPLICATION_CLOSE",
  APPLICATION_STATE_SAVE = "APPLICATION_STATE_SAVE",
  APPLICATION_STATE_LOAD = "APPLICATION_STATE_LOAD"
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

export type WindowAction = ReturnType<
  | typeof windowSizeChange
  | typeof applicationClose
  | typeof applicationStateSave
  | typeof applicationStateLoad
>;

export const windowActions = {
  windowSizeChange,
  applicationClose,
  applicationStateSave,
  applicationStateLoad
};

import { createAppAction } from "../ActionType";

export enum WindowActionType {
  WINDOW_SIZE_CHANGE = "WINDOW_SIZE_CHANGE",
  APPLICATION_CLOSE = "APPLICATION_CLOSE"
}

const windowSizeChange = createAppAction(
  WindowActionType.WINDOW_SIZE_CHANGE,
  (width: number, height: number) => ({
    width,
    height
  })
);

const applicationClose = createAppAction(WindowActionType.APPLICATION_CLOSE);

export type WindowAction = ReturnType<
  typeof windowSizeChange | typeof applicationClose
>;

export const windowActions = {
  windowSizeChange,
  applicationClose
};

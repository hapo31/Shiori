import { createAppAction } from "../ActionType";

export enum WindowActionType {
  WINDOW_SIZE_CHANGE = "WINDOW_SIZE_CHANGE"
}

const windowSizeChange = createAppAction(
  WindowActionType.WINDOW_SIZE_CHANGE,
  (width: number, height: number) => ({
    width,
    height
  })
);

export type WindowAction = ReturnType<typeof windowSizeChange>;

export const windowActions = {
  windowSizeChange
};

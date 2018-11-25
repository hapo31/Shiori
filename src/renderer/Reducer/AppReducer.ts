import AppState from "../State/AppState";
import { ActionType, FileAction } from "../Actions/File/File";

type Actions = FileAction;

const initialState = {
  index: -1,
  files: []
};

export default function AppReducer(
  state: AppState = initialState,
  action: Actions
): AppState {
  switch (action.type) {
    case ActionType.FOLDERCHANGE: {
      return {
        // フォルダが変わったらindexを0に戻す
        index: 0,
        files: action.files
      };
    }
    case ActionType.INDEX_INCREMENT: {
      // index + 1 が length 以上ならインクリメントしない
      const nextIndex =
        state.index + 1 >= state.files.length ? state.index : state.index + 1;
      return {
        index: nextIndex,
        ...state
      };
    }
    case ActionType.INDEX_DECREMENT: {
      // index - 1 が 0未満ならデクリメントしない
      const nextIndex = state.index - 1 < 0 ? 0 : state.index - 1;
      return {
        index: nextIndex,
        ...state
      };
    }
    default:
      return state;
  }
}

import { fileActions } from "./File/FileAction";
import { windowActions } from "./Window/WindowActions";

// アクションを別ファイルに追加したら import してここに spread する
export default { ...fileActions, ...windowActions };

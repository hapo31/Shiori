import { fileActions } from "./File/FileAction";

// アクションを別ファイルに追加したら import してここに spread する
export default { ...fileActions };

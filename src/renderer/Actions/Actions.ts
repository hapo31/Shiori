import { fileActions } from "./File/File";

// アクションを別ファイルに追加したら import してここに spread する
export default { ...fileActions };

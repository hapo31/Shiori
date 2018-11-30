import { imageViewActions } from "./ImageView/ImageViewAction";
import { windowActions } from "./Window/WindowActions";

// アクションを別ファイルに追加したら import してここに spread する
export default { ...imageViewActions, ...windowActions };

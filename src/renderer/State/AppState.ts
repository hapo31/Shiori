import FileState from "./FilesState/FileState";
import ImageViewState from "./ImageViewState/ImageViewState";
import WindowState from "./Window/WindowState";

export default interface AppState {
  imageView: ImageViewState;
  window: WindowState;
  file: FileState;
}

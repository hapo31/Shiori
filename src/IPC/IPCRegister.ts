import { ipcMain, BrowserWindow, dialog, OpenDialogOptions } from "electron";
import path from "path";
import { FileEvent } from "../events/File";
import ReadFiles from "../File/ReadFiles";
import { WindowEvent } from "../events/Window";

/**
 * 渡されたディレクトリのパスに含まれている画像ファイルを列挙する
 * @param window
 */
export function EnumerateImageFile(window: BrowserWindow) {
  ipcMain.on(
    FileEvent.fileChangeRequest,
    async (event: any, dirpath: string) => {
      const fileNames = await ReadFiles(dirpath);
      event.sender.send(
        FileEvent.fileChangeResponse,
        fileNames
          .filter(
            file =>
              file.endsWith(".jpg") ||
              file.endsWith(".jpeg") ||
              file.endsWith(".png")
          )
          .map(fileName => path.join(dirpath, fileName))
      );
    }
  );
}

/**
 * ダイアログを開く
 * @param window
 */
export function OpenDialog(window: BrowserWindow) {
  ipcMain.on(
    FileEvent.openDialogRequest,
    (event: any, options: OpenDialogOptions) => {
      dialog.showOpenDialog(window, options, filePaths => {
        if (filePaths && filePaths.length > 0) {
          event.sender.send(FileEvent.openDialogResponse, filePaths[0]);
        }
      });
    }
  );
}

/**
 * window サイズを変更する
 * @param window
 */
export function ChangeWindowSize(window: BrowserWindow) {
  ipcMain.on(
    WindowEvent.changeWindowSizeRequest,
    (event: any, width: number, height: number) => {
      console.log({ width, height });
      const bounds = window.getBounds();
      window.setBounds({ width, height, x: bounds.x, y: bounds.y });
    }
  );
}

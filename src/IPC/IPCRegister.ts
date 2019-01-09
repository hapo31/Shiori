import { ipcMain, BrowserWindow, dialog, OpenDialogOptions } from "electron";
import path from "path";
import fs from "fs";
import { FileEvent } from "../events/File";
import ReadFiles from "../File/ReadFiles";
import { WindowEvent } from "../events/Window";
import AppState from "../renderer/State/AppState";

/**
 * 渡されたディレクトリのパスに含まれている画像ファイルを列挙する
 * @param window
 */
export function EnumerateImageFile(window: BrowserWindow) {
  ipcMain.on(
    FileEvent.fileEnumrateRequest,
    async (event: Electron.Event, dirpath: string) => {
      const fileNames = await ReadFiles(dirpath);
      event.sender.send(
        FileEvent.fileEnumrateResponse,
        fileNames.map(fileName => path.join(dirpath, fileName))
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
    (event: Electron.Event, options: OpenDialogOptions) => {
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
    (_: Electron.Event, width: number, height: number) => {
      const bounds = window.getBounds();
      window.setBounds({ width, height, x: bounds.x, y: bounds.y });
    }
  );
}

/**
 * アプリケーションを閉じる
 * @param window
 */
export function CloseApplicationWindow(window: BrowserWindow) {
  ipcMain.on(WindowEvent.closeApplication, (_: Electron.Event) => {
    window.close();
  });
}

/**
 * アプリケーションの state を json として保存する
 */
export function SaveApplicationState() {
  ipcMain.on(
    WindowEvent.saveApplicationState,
    (_: Electron.Event, state: AppState) => {
      console.log(state);
      fs.writeFile(
        "app.json",
        JSON.stringify(state),
        { encoding: "utf-8" },
        () => {
          /* NOP */
        }
      );
    }
  );
}

/**
 * アプリケーションの state の json を読み込む
 */
export function LoadApplicationState() {
  ipcMain.on(
    WindowEvent.loadApplicationStateRequest,
    (event: Electron.Event, state: AppState) => {
      fs.readFile("app.json", { encoding: "utf-8" }, (err, result) => {
        event.returnValue = result ? JSON.parse(result) : undefined;
      });
    }
  );
}

export function OpenDevtool(window: BrowserWindow) {
  ipcMain.on(WindowEvent.openDevtool, (_: Electron.Event) => {
    if (!window.isDestroyed()) {
      window.webContents.openDevTools();
    }
  });
}

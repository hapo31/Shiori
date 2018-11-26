import { BrowserWindow, app, App, ipcMain } from "electron";
import * as IPCRegister from "./IPC/IPCRegister";
import { FileEvent } from "./events/File";
import ReadFiles from "./File/ReadFiles";

class MyApp {
  private mainWindow: BrowserWindow | null = null;
  private app: App;
  private mainURL: string = `file://${__dirname}/index.html`;

  constructor(app: App) {
    this.app = app;
    this.app.on("window-all-closed", this.onWindowAllClosed.bind(this));
    this.app.on("ready", this.create.bind(this));
    this.app.on("activate", this.onActivated.bind(this));
  }

  private onWindowAllClosed() {
    this.app.quit();
  }

  private create() {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 800,
      minWidth: 800,
      minHeight: 800,
      acceptFirstMouse: true,
      titleBarStyle: "hidden"
    });

    this.mainWindow.loadURL(this.mainURL);

    this.mainWindow.webContents.openDevTools();

    IPCRegister.FileEnumerate(this.mainWindow);
    IPCRegister.OpenDialog(this.mainWindow);

    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
    });
  }

  private onReady() {
    this.create();
  }

  private onActivated() {
    if (this.mainWindow === null) {
      this.create();
    }
  }
}

const myApp: MyApp = new MyApp(app);

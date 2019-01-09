import { BrowserWindow, app, App, Menu } from "electron";
import * as IPCRegister from "./IPC/IPCRegister";

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
      title: "Shiori",
      x: 0,
      y: 0,
      width: 400,
      height: 400,
      // TODO: 最低ウインドウサイズは考えもの
      minWidth: 100,
      minHeight: 100,
      acceptFirstMouse: true,
      frame: false
      // titleBarStyle: "hiddenInset"
    });

    this.mainWindow.loadURL(this.mainURL);

    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);

    IPCRegister.EnumerateImageFile(this.mainWindow);
    IPCRegister.OpenDialog(this.mainWindow);
    IPCRegister.ChangeWindowSize(this.mainWindow);
    IPCRegister.CloseApplicationWindow(this.mainWindow);
    IPCRegister.LoadApplicationState();
    IPCRegister.SaveApplicationState();
    IPCRegister.OpenDevtool(this.mainWindow);

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

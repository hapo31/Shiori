import { BrowserWindow, app, App, ipcMain } from "electron";
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
      height: 400,
      minWidth: 500,
      minHeight: 200,
      acceptFirstMouse: true,
      titleBarStyle: "hidden"
    });

    this.mainWindow.loadURL(this.mainURL);

    this.mainWindow.webContents.openDevTools();

    ipcMain.on(FileEvent.folderChange, this.onFolderChange);

    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
    });
  }

  private onFolderChange = async (event: any, dirPath: string) => {
    console.log(dirPath);
    const paths = await ReadFiles(dirPath);
    event.sender.send(FileEvent.folderChanged, dirPath, paths);
  };

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

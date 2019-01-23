import { ipcRenderer } from "electron";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ImageView from "./ImageView/ImageView";
import AppState from "../State/AppState";
import Actions from "../Actions/Actions";
import { FileEvent } from "../../events/File";
import AppRegionArea from "./AppRegionArea/AppRegionArea";

type State = {
  windowHeight: number;
  windowWidth: number;
  isVisibleAppRegion: boolean;
};

type ChildProps = AppState & typeof Actions;
class App extends React.Component<ChildProps, State> {
  state = {
    windowHeight: 0,
    windowWidth: 0,
    isVisibleAppRegion: true
  };

  constructor(props: ChildProps) {
    super(props);

    // openDialogRequest の結果を受信する
    ipcRenderer.on(
      FileEvent.openDialogResponse,
      (_: Electron.Event, dirPath: string) => {
        props.requestFileEnumerate(dirPath);
      }
    );
    // fileEnumrateResponse の結果を受信する
    ipcRenderer.on(
      FileEvent.fileEnumrateResponse,
      (_: Electron.Event, paths: string[]) => {
        props.changeFiles(
          paths.filter(
            file =>
              file.endsWith(".jpg") ||
              file.endsWith(".jpeg") ||
              file.endsWith(".png") ||
              file.endsWith(".gif")
          )
        );
      }
    );

    window.onkeydown = this.onKeyDownWindow;
    window.onresize = this.onResizeWindow;
    window.onclose = this.onCloseApp;
  }

  componentDidMount() {
    this.props.applicationStateLoad();
  }

  render() {
    const { imageView } = this.props;

    return (
      <>
        <AppRegionArea
          isVisible={this.state.isVisibleAppRegion}
          isVisibleBorder={imageView.files.length === 0}
          borderPixelSize={15}
        />
        <ImageView
          maxWidth={window.innerWidth}
          maxHeight={window.innerHeight}
          imgUrl={imageView.files[imageView.index]}
          onChangeImage={this.onChangeImage}
          onDropImage={this.onDropImage}
          onDoubleClick={this.openDialog}
        />
      </>
    );
  }

  /**
   * アプリへのキー操作を拾う
   */
  private onKeyDownWindow = (event: KeyboardEvent) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowRight":
        this.props.incrementIndex();
        break;
      case "ArrowLeft":
        this.props.decrementIndex();
        break;

      case "o":
        if (event.ctrlKey) {
          this.openDialog();
        }

      case "I":
        // Ctrl + Shift + I
        if (event.ctrlKey || event.metaKey) {
          this.props.devtoolOpen();
        }
    }
  };

  /**
   * フォルダ選択ダイアログを開く
   */
  private openDialog = () => {
    this.props.openDialog({
      properties: ["openDirectory"],
      title: "画像フォルダを選択",
      defaultPath: "."
    });
  };

  /**
   * 画像が切り替わったときにウインドウサイズを変える
   */
  private onChangeImage = (width: number, height: number) => {
    const maxWidth = window.screen.availWidth - window.screenLeft;
    const maxHeight = window.screen.availHeight - window.screenTop;
    const w = maxWidth > width ? width : maxWidth;
    const h = maxHeight > height ? height : maxHeight;

    this.props.windowSizeChange(w, h);
  };

  /**
   * 画像またはフォルダがドロップされたときにその画像を含むディレクトリまたはディレクトリそのものを開く
   */
  private onDropImage = (file: File, isDirectory: boolean) => {
    const dirName = isDirectory
      ? file.path
      : file.path
          .split(/[/\\]/)
          .slice(0, -1)
          .join("/");
    this.props.requestFileEnumerate(dirName);
  };

  /**
   * ウインドウがリサイズされたらステートを更新(なんのために？)
   */
  private onResizeWindow = (_: UIEvent) => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  private onCloseApp = () => {
    this.props.applicationStateSave();
    this.props.applicationClose();
  };
}

const AppContainer = connect(
  (state: AppState): AppState => state,
  dispatch => bindActionCreators(Actions, dispatch)
)(App);

export default AppContainer;

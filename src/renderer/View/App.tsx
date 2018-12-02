import { ipcRenderer } from "electron";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ImageView from "./ImageView/ImageView";
import AppState from "../State/AppState";
import Actions from "../Actions/Actions";
import { FileEvent } from "../../events/File";
import Header from "./Header/Header";

type State = {
  windowHeight: number;
  windowWidth: number;
};

type ChildProps = AppState & typeof Actions;
class App extends React.Component<ChildProps, State> {
  state = {
    windowHeight: 0,
    windowWidth: 0
  };

  constructor(props: ChildProps) {
    super(props);

    ipcRenderer.on(FileEvent.openDialogResponse, (_: any, dirPath: string) => {
      props.requestFileEnumerate(dirPath);
    });
    ipcRenderer.on(
      FileEvent.fileEnumrateResponse,
      (_: any, paths: string[]) => {
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

    window.onkeydown = this.onKeyDown;
    window.onresize = this.onWindowResize;
  }

  render() {
    const { imageView } = this.props;

    return (
      <div>
        <Header
          title={imageView.files[imageView.index]}
          onClickClose={this.onClickCloseApp}
        />
        <ImageView
          maxWidth={window.innerWidth}
          maxHeight={window.innerHeight}
          imgUrl={imageView.files[imageView.index]}
          isLast={imageView.index === imageView.files.length}
          onChangeImage={this.onChangeImage}
          onDropImage={this.onDropImage}
          onClick={this.onOpenDialog}
        />
      </div>
    );
  }

  private onKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowRight":
        this.props.incrementIndex();
        break;
      case "ArrowLeft":
        this.props.decrementIndex();
        break;
    }
  };

  private onOpenDialog = () => {
    this.props.openDialog({
      properties: ["openDirectory"],
      title: "画像フォルダを選択",
      defaultPath: "."
    });
  };

  private onChangeImage = (width: number, height: number) => {
    const w = window.screen.width > width ? width : window.screen.width;
    const h = window.screen.height > height ? height : window.screen.height;

    this.props.windowSizeChange(w, h);
  };

  private onDropImage = (file: File, isDirectory: boolean) => {
    const dirName = isDirectory
      ? file.path
      : file.path
          .split(/[/\\]/)
          .slice(0, -1)
          .join("/");
    this.props.requestFileEnumerate(dirName);
  };

  private onWindowResize = (_: UIEvent) => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  private onClickCloseApp = () => {
    this.props.applicationClose();
  };
}

const AppContainer = connect(
  (state: AppState): AppState => state,
  dispatch => bindActionCreators(Actions, dispatch)
)(App);

export default AppContainer;

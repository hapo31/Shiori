import { ipcRenderer } from "electron";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ImageView from "./ImageView/ImageView";
import AppState from "../State/AppState";
import Actions from "../Actions/Actions";
import { FileEvent } from "../../events/File";
import Header from "./Header/Header";

type ChildProps = AppState & typeof Actions;
class App extends React.Component<ChildProps> {
  constructor(props: ChildProps) {
    super(props);

    ipcRenderer.on(FileEvent.openDialogResponse, (_: any, dirPath: string) => {
      props.requestFileEnumerate(dirPath);
    });
    ipcRenderer.on(FileEvent.fileChangeResponse, (_: any, paths: string[]) => {
      props.changeFiles(paths);
    });

    window.onkeydown = this.onKeyDown;
  }

  render() {
    const { imageView } = this.props;

    return (
      <div>
        <Header
          title={imageView.files[imageView.index]}
          onClickClose={this.onClickCloseApp}
        />
        {/* TODO: ファイル選択なんか別の手段考える */}
        <button onClick={this.onOpenDialog}>Select File</button>
        <ImageView
          maxWidth={window.screen.width}
          maxHeight={window.screen.height}
          onChangeImage={this.onChangeImage}
          imgUrl={imageView.files[imageView.index]}
        />
      </div>
    );
  }

  private ref = (element: HTMLElement | null) => {
    if (element) {
      // focus() しないとキー操作が働かない
      element.focus();
    }
  };

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
    this.props.windowSizeChange(width, height + 50);
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

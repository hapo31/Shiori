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
  }

  render() {
    return (
      <div ref={this.ref} onKeyDown={this.onKeyDown}>
        <Header onClickClose={this.onClickCloseApp} />
        <button onClick={this.onOpenDialog}>Select File</button>
        <ImageView
          onChangeImage={this.onChangeImage}
          imgUrl={this.props.files[this.props.index]}
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

  private onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
    this.props.windowSizeChange(width, height);
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

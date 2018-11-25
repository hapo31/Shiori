import React from "react";
import ImageView from "./ImageView/ImageView";

import { ipcRenderer } from "electron";
import { FileEvent } from "../../events/File";

import { connect } from "react-redux";
import AppState from "../State/AppState";
import { bindActionCreators } from "redux";
import { fileActions } from "../Actions/File/File";

type Props = {
  index: number;
  files: string[];
};

type StateProps = Props;

type ChildProps = StateProps & typeof fileActions;
class App extends React.Component<ChildProps> {
  constructor(props: ChildProps) {
    super(props);
    ipcRenderer.on(FileEvent.folderChange, (_: unknown, paths: string[]) => {});
  }

  render() {
    const { folderChange } = this.props;
    return (
      <div onKeyPress={this.onKeyPress}>
        <ImageView
          imgUrl={this.props.files[this.props.index]}
          onchange={folderChange}
        />
      </div>
    );
  }

  private onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = this.props.index;
    switch (event.key) {
      case "ArrowRight":
        // TODO: reduxのactionに置き換え
        this.setState({
          index: (index + 1) % this.props.files.length
        });
    }
  };
}

const connecter = connect(
  (state: AppState): StateProps => ({
    ...state
  }),
  dispatch => bindActionCreators(fileActions, dispatch)
);

const AppContainer = connecter(App);

export default AppContainer;

import React from "react";
import ImageView from "./ImageView/ImageView";

import { ipcRenderer } from "electron";
import { FileEvent } from "../../events/File";

type Props = {};

type State = {
  index: number;
  files: string[];
};

export default class App extends React.Component<Props, State> {
  state = {
    index: 0,
    files: []
  };

  constructor(props: Props) {
    super(props);
    ipcRenderer.on(FileEvent.folderChange, (_: unknown, paths: string[]) => {});
  }

  render() {
    return (
      <div onKeyPress={this.onKeyPress}>
        <ImageView
          imgUrl={this.state.files[this.state.index]}
          onchange={this.onChange}
        />
      </div>
    );
  }

  private onChange = (filePaths: string[]) => {
    console.log(filePaths);
    this.setState({
      index: 0,
      files: filePaths
    });
  };

  private onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(this.state.index);
    const index = this.state.index;
    switch (event.key) {
      case "ArrowRight":
        this.setState({
          index: (index + 1) % this.state.files.length
        });
    }
  };
}

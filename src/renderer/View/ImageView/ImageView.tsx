import React from "react";
import { remote, ipcRenderer } from "electron";
import { FileEvent } from "../../../events/File";

type Props = {
  imgUrl: string;
};

export default class ImageView extends React.Component<Props> {
  render() {
    return (
      <div>
        <img src={this.props.imgUrl} alt="" />
      </div>
    );
  }
}

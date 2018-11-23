import React from "react";
import { remote, ipcRenderer } from "electron";
import { FileEvent } from "../../../events/File";

type Props = {
  imgUrl: string;
  onchange: (filePaths: string[]) => void;
};

export default class ImageView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    ipcRenderer.on(
      FileEvent.folderChanged,
      (event: unknown, dirName: string, filePaths: string[]) => {
        const fullPaths = filePaths
          .filter(
            path =>
              path.endsWith("png") ||
              path.endsWith("jpg") ||
              path.endsWith("jpeg")
          )
          .map(path => `${dirName}/${path}`);

        props.onchange(fullPaths);
      }
    );
  }

  render() {
    return (
      <>
        <button onClick={this.onclick}>Select File</button>
        <img src={this.props.imgUrl} alt="" />
      </>
    );
  }

  private onclick = () => {
    remote.dialog.showOpenDialog(
      null as any,
      {
        properties: ["openDirectory"],
        title: "hogehoge",
        defaultPath: ".",
        filters: [{ name: "Image file", extensions: ["png", "jpg"] }]
      },
      filePaths => {
        if (filePaths.length > 0) {
          ipcRenderer.send(FileEvent.folderChange, filePaths[0]);
        }
      }
    );
  };
}

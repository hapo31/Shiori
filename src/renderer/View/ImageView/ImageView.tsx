import React, { forwardRef } from "react";
import styled from "styled-components";
import FitImage from "../StyledComponent/FitImage";

type Props = {
  maxWidth: number;
  maxHeight: number;
  imgUrl: string;
  isLast: boolean;
  onChangeImage: (width: number, height: number) => void;
  onDropImage: (file: File, isDirectory: boolean) => void;
  onClick: () => void;
};

type State = {
  height: number;
  width: number;
};

const BorderContainer = styled.div`
  -webkit-user-drag: none;
  text-align: center;
  font-size: 10px;
  height: 100%;
  width: 100%;
  border: solid #ddd;
  border-radius: 20px;
  vertical-align: middle;

  &:hover {
    background-color: #ccc;
  }
`;

const LastScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export default class ImageView extends React.Component<Props, State> {
  state = {
    width: 0,
    height: 0
  };

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "fixed",
          left: 0,
          top: 0
        }}
        onClick={this.onClick}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        {(() => {
          if (this.props.isLast) {
            return <LastScreen />;
          } else if (this.props.imgUrl == null) {
            return (
              <BorderContainer>
                フォルダまたは画像をドラッグ＆ドロップ
              </BorderContainer>
            );
          } else {
            return (
              <FitImage
                maxWidth={this.props.maxWidth}
                maxHeight={this.props.maxHeight}
                onLoad={this.onLoad}
                src={this.props.imgUrl}
                alt=""
              />
            );
          }
        })()}
      </div>
    );
  }

  private onDragOver: React.DragEventHandler = event => {
    event.preventDefault();
  };

  private onDrop: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();

    if (event.dataTransfer.items.length > 0) {
      // ドラッグアンドドロップした画像の1つ目を取得する
      const file = event.dataTransfer.items[0].getAsFile();
      if (file != null && (file.type === "image/png" || file.type === "")) {
        this.props.onDropImage(file, file.type === "");
      }
    }
  };

  private onClick = () => {
    this.props.onClick();
  };

  private onLoad = async (event: React.FormEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    this.props.onChangeImage(target.naturalWidth, target.naturalHeight);
  };
}

import React, { forwardRef } from "react";
import styled from "styled-components";
import FitImage from "../StyledComponent/FitImage";

type Props = {
  maxWidth: number;
  maxHeight: number;
  imgUrl: string;
  onChangeImage: (width: number, height: number) => void;
  onDropImage: (file: File, isDirectory: boolean) => void;
  onDoubleClick: () => void;
};

type State = {
  height: number;
  width: number;
};

const Outer = styled.div`
  width: 100%;
  height: 100%;
  display: table;
  position: fixed;
  left: 0;
  top: 0;
`;

const MessageContainer = styled.div`
  -webkit-user-drag: none;
  user-select: none;
  text-align: center;
  font-size: 10px;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  display: table-cell;

  &:hover {
    background-color: #ccc;
  }
`;

export default class ImageView extends React.Component<Props, State> {
  state = {
    width: 0,
    height: 0
  };

  render() {
    return (
      <Outer
        onDoubleClick={this.onDoubleClick}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        {(() => {
          if (this.props.imgUrl == null) {
            return (
              <MessageContainer>
                フォルダまたは画像をドラッグ＆ドロップ
              </MessageContainer>
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
      </Outer>
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

  private onDoubleClick = () => {
    this.props.onDoubleClick();
  };

  private onLoad = async (event: React.FormEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    this.props.onChangeImage(target.naturalWidth, target.naturalHeight);
  };
}

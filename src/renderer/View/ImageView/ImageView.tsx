import React from "react";

type Props = {
  maxWidth: number;
  maxHeight: number;
  imgUrl: string;
  onChangeImage: (width: number, height: number) => void;
};

type State = {
  height: number;
  width: number;
};

export default class ImageView extends React.Component<Props, State> {
  state = {
    width: 0,
    height: 0
  };

  render() {
    return (
      <div
        style={{
          maxWidth: this.props.maxWidth,
          maxHeight: this.props.maxHeight,
          width: this.state.width,
          height: this.state.height
        }}
      >
        <img
          style={{ display: "block", width: "auto", height: "auto" }}
          onLoad={this.onLoad}
          src={this.props.imgUrl}
          alt=""
        />
      </div>
    );
  }

  private onLoad = (event: React.FormEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    this.props.onChangeImage(target.width, target.height);
    this.setState({
      width: target.width,
      height: target.height
    });

    console.log({
      maxHeight: this.props.maxHeight,
      maxWidth: this.props.maxWidth
    });
  };
}

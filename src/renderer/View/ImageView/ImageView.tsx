import React from "react";

type Props = {
  imgUrl: string;
  onChangeImage: (width: number, height: number) => void;
};

export default class ImageView extends React.Component<Props> {
  render() {
    return (
      <div>
        <img onLoad={this.onLoad} src={this.props.imgUrl} alt="" />
      </div>
    );
  }

  private onLoad = (event: React.FormEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    this.props.onChangeImage(target.width + 50, target.height + 200);
  };
}

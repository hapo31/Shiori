import React from "react";
import styled from "styled-components";

type Props = {
  isVisible: boolean;
  borderPixelSize: number;
  isVisibleBorder: boolean;
};

const AppRegionTip = styled.div`
  position: fixed;
  background-color: ${(props: { isVisibleBorder: boolean }) =>
    props.isVisibleBorder ? "#ddd" : "#fff"};
  -webkit-app-region: drag;
`;

const framePosition = "3px";

export default class AppRegionArea extends React.PureComponent<Props> {
  render() {
    if (this.props.isVisible) {
      return (
        <>
          {/* 上 */}
          <AppRegionTip
            isVisibleBorder={this.props.isVisibleBorder}
            style={{
              left: framePosition,
              top: framePosition,
              width: "calc(100% - 6px)",
              height: `${this.props.borderPixelSize}px`
            }}
          />
          {/* 左 */}
          <AppRegionTip
            isVisibleBorder={this.props.isVisibleBorder}
            style={{
              left: framePosition,
              top: framePosition,
              width: `${this.props.borderPixelSize}px`,
              height: "calc(100% - 6px)"
            }}
          />
          {/* 右 */}
          <AppRegionTip
            isVisibleBorder={this.props.isVisibleBorder}
            style={{
              right: framePosition,
              top: framePosition,
              width: `${this.props.borderPixelSize}px`,
              height: "calc(100% - 6px)"
            }}
          />
          {/* 下 */}
          <AppRegionTip
            isVisibleBorder={this.props.isVisibleBorder}
            style={{
              left: framePosition,
              bottom: framePosition,
              width: "calc(100% - 6px)",
              height: `${this.props.borderPixelSize}px`
            }}
          />
        </>
      );
    }
    return <></>;
  }
}

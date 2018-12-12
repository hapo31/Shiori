import React, { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  isVisible: boolean;
};

const AppRegionTip = styled.div`
  position: fixed;
  background-color: #ccc;
  -webkit-app-region: drag;
`;

const frameSpace = "3px";
const defaultHeight = "20px";
const defaultWidth = "20px";

export default class AppRegionArea extends React.PureComponent<Props> {
  render() {
    if (this.props.isVisible) {
      return (
        <>
          {/* 上 */}
          <AppRegionTip
            style={{
              left: frameSpace,
              top: frameSpace,
              width: "calc(100% - 6px)",
              height: defaultHeight
            }}
          />
          {/* 左 */}
          <AppRegionTip
            style={{
              left: frameSpace,
              top: frameSpace,
              width: defaultWidth,
              height: "calc(100% - 6px)"
            }}
          />
          {/* 右 */}
          <AppRegionTip
            style={{
              right: frameSpace,
              top: frameSpace,
              width: defaultWidth,
              height: "calc(100% - 6px)"
            }}
          />
          {/* 下 */}
          <AppRegionTip
            style={{
              left: frameSpace,
              bottom: frameSpace,
              width: "calc(100% - 6px)",
              height: defaultHeight
            }}
          />
        </>
      );
    }
    return <></>;
  }
}

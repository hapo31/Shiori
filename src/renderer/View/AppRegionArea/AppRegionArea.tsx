import React from "react";
import styled from "styled-components";

type Props = {
  isVisible: boolean;
  borderPixelSize: number;
  isVisibleBorder: boolean;
  children?: JSX.Element;
};

const AppRegion = styled.div`
  position: fixed;
  background-color: ${(props: { isVisibleBorder: boolean }) =>
    props.isVisibleBorder ? "#ddd" : "#fff"};
  -webkit-app-region: drag;
`;

const framePosition = "3px";

const AppRegionArea = (props: Props) => {
  return (
    <div>
      {/* 上 */}
      <AppRegion
        isVisibleBorder={props.isVisibleBorder}
        style={{
          left: framePosition,
          top: framePosition,
          width: "calc(100% - 6px)",
          height: `${props.borderPixelSize}px`
        }}
      />
      {/* 左 */}
      <AppRegion
        isVisibleBorder={props.isVisibleBorder}
        style={{
          left: framePosition,
          top: framePosition,
          width: `${props.borderPixelSize}px`,
          height: "calc(100% - 6px)"
        }}
      />
      {/* 右 */}
      <AppRegion
        isVisibleBorder={props.isVisibleBorder}
        style={{
          right: framePosition,
          top: framePosition,
          width: `${props.borderPixelSize}px`,
          height: "calc(100% - 6px)"
        }}
      />
      {/* 下 */}
      <AppRegion
        isVisibleBorder={props.isVisibleBorder}
        style={{
          left: framePosition,
          bottom: framePosition,
          width: "calc(100% - 6px)",
          height: `${props.borderPixelSize}px`
        }}
      />
      {props.children}
    </div>
  );
};

export default AppRegionArea;

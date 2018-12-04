import React, { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  isVisible: boolean;
};

const AppRegionTip = styled.div`
  position: fixed;
  background-color: #ccc;
  -webkit-app-region: drag;
  height: 50px;
  width: 50px;
`;

export default class AppRegionArea extends React.PureComponent<Props> {
  render() {
    if (this.props.isVisible) {
      return (
        <>
          {/* 左上 */}
          <AppRegionTip style={{ top: "5px", left: "5px" }} />
          {/* 右上 */}
          <AppRegionTip style={{ top: "5px", right: "5px" }} />
          {/* 左下 */}
          <AppRegionTip style={{ left: "5px", bottom: "5px" }} />
          {/* 右下 */}
          <AppRegionTip style={{ right: "5px", bottom: "5px" }} />
        </>
      );
    }
    return <></>;
  }
}

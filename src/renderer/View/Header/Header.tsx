import React, { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  onClickClose: () => void;
};

const AppRegionArea = styled.div`
  text-align: center;
  height: 30px;
  flex: 1;
  -webkit-app-region: drag;
`;

const VirticalRight = styled.div`
  text-align: right;
  width: 25px;
`;

export default class Header extends React.Component<Props> {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <AppRegionArea>{this.props.title}</AppRegionArea>
        <VirticalRight>
          <button
            style={{ display: "block", width: "100%" }}
            onClick={this.props.onClickClose}
          >
            ×
          </button>
        </VirticalRight>
      </div>
    );
  }
}

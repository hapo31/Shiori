import React, { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  onClickClose: () => void;
};

const AppRegionArea = styled.div`
  height: 100%;
`;

export default class Header extends React.Component<Props> {
  render() {
    return (
      <>
        <AppRegionArea />
      </>
    );
  }
}

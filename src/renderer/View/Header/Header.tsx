import React from "react";
import VirticalRight from "../StyledComponent/VirticalRight";

type Props = {
  onClickClose: () => void;
};

export default class Header extends React.Component<Props> {
  render() {
    return (
      <VirticalRight>
        <button onClick={this.props.onClickClose}>×</button>
      </VirticalRight>
    );
  }
}

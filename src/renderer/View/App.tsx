import React from "react";
import ImageView from "./ImageView/ImageView";

import { connect } from "react-redux";
import AppState from "../State/AppState";
import { bindActionCreators } from "redux";
import Actions from "../Actions/Actions";

type Props = {
  index: number;
  files: string[];
};

type StateProps = Props;

type ChildProps = StateProps & typeof Actions;
class App extends React.Component<ChildProps> {
  constructor(props: ChildProps) {
    super(props);
  }

  render() {
    const { folderChange } = this.props;
    return (
      <div onKeyDown={this.onKeyDown}>
        <ImageView
          imgUrl={this.props.files[this.props.index]}
          onchange={folderChange}
        />
      </div>
    );
  }

  private onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowRight":
        this.props.indexIncrement();
        break;
      case "ArrowLeft":
        this.props.indexDecrement();
        break;
    }
  };
}

const AppContainer = connect(
  (state: AppState): StateProps => ({
    ...state
  }),
  dispatch => bindActionCreators(Actions, dispatch)
)(App);

export default AppContainer;

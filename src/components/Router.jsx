import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject('routerStore')
@observer
class Router extends Component {
  render() {
    return (
      <this.props.routerStore.currentRoute.component />
    );
  }
}

export default Router;

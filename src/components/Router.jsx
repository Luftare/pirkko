import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject('routerStore')
@observer
class Router extends Component {
  render() {
    console.log(this.props.routerStore.params)
    return (
      <div>
        <this.props.routerStore.currentRoute.component />
      </div>
    );
  }
}

export default Router;

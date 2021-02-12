import React from "react";

import { withRouter } from "react-router-dom";

class NotFoundPage extends React.Component<any, any> {
  render() {
    const path = this.props.location.pathname;

    return (
      <p>Location &quot;<b>{path}</b>&quot; not found!</p>
    );
  }
}

export default withRouter(NotFoundPage);
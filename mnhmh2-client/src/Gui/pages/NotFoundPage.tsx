import React, { ReactNode } from "react";

import { withRouter } from "react-router-dom";

class NotFoundPage extends React.Component<any, any> {
    render(): ReactNode {
        const path = this.props.location.pathname;

        return (
            <p>Location &quot;<b>{path}</b>&quot; not found!</p>
        );
    }
}

export default withRouter(NotFoundPage);
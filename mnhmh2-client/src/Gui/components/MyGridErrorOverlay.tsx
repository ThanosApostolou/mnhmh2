import React, { ReactNode } from "react";

import { Tooltip, Button, Grid } from "@material-ui/core";
import { Refresh, Print, Add, Edit } from "@material-ui/icons";

export class MyGridErrorOverlay extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log("props: ", this.props);
    }

    render(): ReactNode {

        return (
            <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                <pre id="json" style={{whiteSpace: "pre-wrap"}}>
                    {JSON.stringify(this.props.options.error, null, 2)}
                </pre>
            </Grid>
        );
    }
}
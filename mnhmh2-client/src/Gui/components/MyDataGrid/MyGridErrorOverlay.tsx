import React, { ReactNode } from "react";

import { Grid } from "@material-ui/core";
import { GridSlotComponentProps } from "@material-ui/data-grid";

export class MyGridErrorOverlay extends React.Component<GridSlotComponentProps & any, any> {

    constructor(props: GridSlotComponentProps & any) {
        super(props);
        console.log("props: ", this.props);
    }

    render(): ReactNode {
        let error = "unknown error";
        if (this.props.error) {
            error = JSON.stringify(this.props.error, null, 2);
        }
        return (
            <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                <pre id="json" style={{whiteSpace: "pre-wrap"}}>
                    {error}
                </pre>
            </Grid>
        );
    }
}
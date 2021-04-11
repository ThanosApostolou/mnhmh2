import React, { ReactNode } from "react";

import { Grid } from "@material-ui/core";
import { GridSlotComponentProps } from "@material-ui/data-grid";

export class MyGridErrorOverlay extends React.Component<GridSlotComponentProps & any, any> {

    constructor(props: GridSlotComponentProps & any) {
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
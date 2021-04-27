import React, { ReactNode } from "react";

import { Grid, Tooltip, Button } from "@material-ui/core";
import { GridFooterContainer, GridFooterContainerProps, GridPagination } from "@material-ui/data-grid";

export class MyGridFooter extends React.Component<MyGridFooterProps, any> {
    constructor(props: GridFooterContainerProps) {
        super(props);
    }

    render(): ReactNode {

        return (
            <GridFooterContainer>
                <Grid container direction="row" justify="space-between" alignContent="center" alignItems="center">
                    <Grid item>
                        <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
                            {this.props.actions}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
                            <GridPagination />
                        </Grid>
                    </Grid>
                </Grid>
            </GridFooterContainer>
        );
    }
}

export interface MyGridFooterProps extends GridFooterContainerProps {
    actions?: ReactNode;
}
import React, { ReactNode } from "react";

import { Tooltip, Button, Grid } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

import { GridColDef, DataGrid, GridFooter, GridToolbar, GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton, GridDensitySelector, GridPagination, GridBaseComponentProps } from "@material-ui/data-grid";

export class MyGridToolbar extends React.Component<GridBaseComponentProps, any> {
    constructor(props: GridBaseComponentProps) {
        super(props);
        console.log("props: ", this.props);
    }

    render(): ReactNode {

        return (
            <GridToolbarContainer>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                    <GridColumnsToolbarButton />
                    <GridFilterToolbarButton />
                    <GridDensitySelector />
                    <GridPagination />
                    <div style={{flexGrow: 1}} />
                    <Tooltip title="Refresh Table Data" aria-label="refresh">
                        <Button onClick={this.props.options.onRefreshClick}>
                            <Refresh />
                        </Button>
                    </Tooltip>
                </Grid>
            </GridToolbarContainer>
        );
    }
}
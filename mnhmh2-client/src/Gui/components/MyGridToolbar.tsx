import React, { ReactNode } from "react";

import { Tooltip, Button, IconButton, Grid, TextField } from "@material-ui/core";
import { Refresh, Search, Print, Add, Edit } from "@material-ui/icons";

import { GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton, GridDensitySelector, GridPagination, GridBaseComponentProps } from "@material-ui/data-grid";

export class MyGridToolbar extends React.Component<MyGridToolbarProps, any> {
    constructor(props: any) {
        super(props);
        console.log("props: ", this.props);
    }

    render(): ReactNode {

        return (
            <GridToolbarContainer>
                <Grid container direction="column">
                    <Grid container direction="row" justify="center" alignContent="center" alignItems="center">
                        <form>
                            <TextField InputLabelProps={{ shrink: true }} label="search" />
                            <Tooltip title="Search" aria-label="search">
                                <IconButton size="small">
                                    <Search />
                                </IconButton>
                            </Tooltip>
                        </form>
                        <Button variant="contained">
                            Προσθήκη
                            <Add />
                        </Button>
                        <Button variant="contained">
                            Τροποποίηση
                            <Edit />
                        </Button>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
                        <GridColumnsToolbarButton />
                        <GridFilterToolbarButton />
                        <GridDensitySelector />
                        <div style={{flexGrow: 1}} />
                        <Tooltip title="Refresh Table Data" aria-label="refresh">
                            <IconButton size="small" onClick={this.props.onRefreshClick}>
                                <Refresh />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Print" aria-label="print">
                            <IconButton size="small">
                                <Print />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </GridToolbarContainer>
        );
    }
}

export interface MyGridToolbarProps extends GridBaseComponentProps {
    onRefreshClick: () => void;
}
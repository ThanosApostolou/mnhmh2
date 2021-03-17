import React, { ReactNode } from "react";

import { Tooltip, Button, Grid } from "@material-ui/core";
import { Refresh, Print, Add, Edit } from "@material-ui/icons";

import { GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton, GridDensitySelector, GridPagination, GridBaseComponentProps } from "@material-ui/data-grid";

export class MyGridToolbar extends React.Component<MyGridToolbarProps, any> {

    constructor(props: MyGridToolbarProps) {
        super(props);
        console.log("props: ", this.props);
    }

    render(): ReactNode {

        return (
            <GridToolbarContainer>
                <Grid container direction="column">
                    <Grid container direction="row" justify="space-between" alignContent="center" alignItems="center">
                        <Grid item>
                            <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
                                <Button size="small" color="primary" onClick={this.props.onAddClick}>
                                    <Add />
                                    &nbsp;Προσθηκη
                                </Button>
                                <Button size="small" color="primary" onClick={this.props.onEditClick} disabled={this.props.selectedRow === null}>
                                    <Edit />
                                    &nbsp;Τροποποιηση
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
                                <GridColumnsToolbarButton />
                                <GridFilterToolbarButton />
                                <GridDensitySelector />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
                                <Tooltip title="Refresh Table Data" aria-label="refresh">
                                    <Button color="primary" size="small" onClick={this.props.onRefreshClick}>
                                        <Refresh />
                                    &nbsp;Ανανεωση
                                    </Button>
                                </Tooltip>
                                <Tooltip color="primary" title="Print" aria-label="print">
                                    <Button size="small" onClick={this.props.onPrintClick}>
                                        <Print />
                                    &nbsp;Εκτυπωση
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </GridToolbarContainer>
        );
    }
}

export interface MyGridToolbarProps extends GridBaseComponentProps {
    selectedRow?: any;
    onAddClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onEditClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onRefreshClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onPrintClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
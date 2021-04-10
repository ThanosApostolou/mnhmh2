import React, { ReactNode } from "react";

import { Tooltip, Button, Grid } from "@material-ui/core";
import { Refresh, Print, Add, Edit, Restore } from "@material-ui/icons";

import { GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton, GridToolbarExport, GridToolbarContainerProps, GridDensity, GridColDef } from "@material-ui/data-grid";

import { MyGridDensityComp } from "./MyGridDensityComp";
import { MyGridColumnsComp } from "./MyGridColumnsComp";

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
                                <MyGridColumnsComp columns={this.props.columns} onColumnsChange={this.props.onColumnsChange.bind(this)} />
                                <GridColumnsToolbarButton />
                                <GridFilterToolbarButton />
                                <MyGridDensityComp density={this.props.density} onDensityChange={this.props.onDensityChange.bind(this)} />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
                                <Tooltip color="primary" title="Επαναφορά αλλαγών πίνακα" aria-label="print">
                                    <Button size="small" onClick={this.props.onRestoreClick}>
                                        <Restore />
                                    &nbsp;Επαναφορά
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Ανανέωση Δεδομένων Πίνακα" aria-label="refresh">
                                    <Button color="primary" size="small" onClick={this.props.onRefreshClick}>
                                        <Refresh />
                                    &nbsp;Ανανεωση
                                    </Button>
                                </Tooltip>
                                <Tooltip color="primary" title="Εκτύπωση" aria-label="print">
                                    <Button size="small" onClick={this.props.onPrintClick}>
                                        <Print />
                                    &nbsp;Εκτυπωση
                                    </Button>
                                </Tooltip>
                                <GridToolbarExport />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </GridToolbarContainer>
        );
    }
}

export interface MyGridToolbarProps extends GridToolbarContainerProps {
    selectedRow?: any;
    density?: GridDensity;
    columns?: GridColDef[];
    onAddClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onEditClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onColumnsChange?: (columns: GridColDef[]) => void;
    onDensityChange?: (density: GridDensity) => void;
    onRestoreClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onRefreshClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onPrintClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
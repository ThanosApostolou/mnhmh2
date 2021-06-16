import React, { ReactNode } from "react";
import { Card, CardContent, TextField, Tooltip, IconButton, Grid, Snackbar } from "@material-ui/core";
import { Search, Clear } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";


import { ImportsExportsTblDataGrid } from "./ImportsExportsTblDataGrid";
import { ImportsExportsTbl } from "../../../entities/ImportsExportsTbl";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddEditActions } from "../../components/AddEditActions";
import { ImportsExportsTblAdd } from "./ImportsExportsTblAdd";
import { ImportsExportsTblEdit } from "./ImportsExportsTblEdit";

export class ImportsExportsTblPage extends React.Component<Record<string, never>, ImportsExportsTblPageState> {
    state: Readonly<ImportsExportsTblPageState>;
    search: string;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            importsExportsTbl: null,
            selectedImportsExportsTbl: null,
            rows: [],
            loading: true,
            search: null,
            fromDate: "",
            toDate: "",
            error: null,
            openAddDrawer: false,
            openEditDrawer: false,
            openSnackbar: false,
            snackbarMessage: "",
            fetchData: false
        };
        this.search = "";
    }

    fetchData(): void {
        this.setState({fetchData: !this.state.fetchData});
    }
    onFetchData(): void {
        this.setState({selectedImportsExportsTbl: null});
    }

    onRowSelected(importsExportsTbl: ImportsExportsTbl): void {
        this.setState({selectedImportsExportsTbl: importsExportsTbl});
    }

    onAddClick(): void {
        this.setState({openAddDrawer: true});
    }
    onAddSave(): void {
        this.setState({openAddDrawer: false, snackbarMessage: "Επιτυχία προσθήκης συγκριτικού!", openSnackbar: true});
        this.fetchData();
    }
    onAddCancel(): void {
        this.setState({openAddDrawer: false});
    }

    onEditClick(): void {
        this.setState({openEditDrawer: true});
    }
    onEditSave(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία τροποποίησης συγκριτικού!", openSnackbar: true});
        this.fetchData();
    }
    onEditDelete(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία διαγραφής συγκριτικού!", openSnackbar: true});
        this.fetchData();
    }
    onEditCancel(): void {
        this.setState({openEditDrawer: false});
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({search: this.search});
        this.fetchData();
    }

    render(): ReactNode {
        const actions = <AddEditActions disabledEdit={this.state.selectedImportsExportsTbl === null} onAddClick={this.onAddClick.bind(this)} onEditClick={this.onEditClick.bind(this)} />;
        return (
            <Grid container direction="column" style={{height: "100%"}}>
                <Card elevation={6} style={{width: "100%"}}>
                    <CardContent>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center" spacing={2}>
                                <Grid item>
                                    <TextField size="small" InputLabelProps={{ shrink: true }} label="search" onChange={(event) => this.search = event.target.value} />
                                </Grid>
                                <Grid item>
                                    <TextField id="datetime-local" label="Από" type="datetime-local" value={this.state.fromDate}
                                        onChange={(event) => this.setState({fromDate: event.target.value})}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton size="small" onClick={(e) => this.setState({fromDate: ""})}>
                                                    <Clear />
                                                </IconButton>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField id="datetime-local" label="Μέχρι" type="datetime-local" value={this.state.toDate}
                                        onChange={(event) => this.setState({toDate: event.target.value})}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton size="small" onClick={(e) => this.setState({toDate: ""})}>
                                                    <Clear />
                                                </IconButton>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Search" aria-label="search">
                                        <IconButton size="small" type="submit" value="Submit">
                                            <Search />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
                <ImportsExportsTblDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="importsexportstbls" fetchData={this.state.fetchData}
                    fromDate={this.state.fromDate}
                    toDate={this.state.toDate}
                    search={this.state.search}
                    onFetchData={this.onFetchData.bind(this)}
                />
                <ImportsExportsTblAdd openAddDrawer={this.state.openAddDrawer}
                    onAddSave={this.onAddSave.bind(this)}
                    onAddCancel={this.onAddCancel.bind(this)}
                />
                <ImportsExportsTblEdit importsExportsTbl={this.state.selectedImportsExportsTbl}
                    openEditDrawer={this.state.openEditDrawer}
                    onEditSave={this.onEditSave.bind(this)}
                    onEditDelete={this.onEditDelete.bind(this)}
                    onEditCancel={this.onEditCancel.bind(this)}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={2000}
                    onClose={() => this.setState({openSnackbar: false})}
                >
                    <Alert variant="filled" severity="success" onClose={() => this.setState({openSnackbar: false})}>
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }
}

export interface ImportsExportsTblPageState {
    importsExportsTbl: ImportsExportsTbl[];
    selectedImportsExportsTbl: ImportsExportsTbl;
    rows: GridRowsProp;
    loading: boolean;
    search: string;
    fromDate: string;
    toDate: string;
    error: any;
    openAddDrawer: boolean;
    openEditDrawer: boolean;
    openSnackbar: boolean;
    snackbarMessage: string;
    fetchData: boolean;
}
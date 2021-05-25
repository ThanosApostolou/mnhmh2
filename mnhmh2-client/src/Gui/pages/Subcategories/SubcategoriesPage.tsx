import React, { ReactNode } from "react";
import { Card, CardContent, TextField, Tooltip, IconButton, Grid, Snackbar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";


import { SubcategoryDataGrid } from "./SubcategoryDataGrid";
import { Subcategory } from "../../../entities/Subcategory";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddEditActions } from "../../components/AddEditActions";
//import { AmmunitionStoresAdd } from "./AmmunitionStoresAdd";
//import { AmmunitionStoresEdit } from "./AmmunitionStoresEdit";

export class SubcategoriesPage extends React.Component<Record<string, never>, SubcategoriesPageState> {
    state: Readonly<SubcategoriesPageState>;
    search: string;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            subcategories: null,
            selectedSubcategory: null,
            rows: [],
            loading: true,
            search: null,
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
        this.setState({selectedSubcategory: null});
    }

    onRowSelected(subcategory: Subcategory): void {
        this.setState({selectedSubcategory: subcategory});
    }

    onAddClick(): void {
        this.setState({openAddDrawer: true});
    }
    onAddSave(): void {
        this.setState({openAddDrawer: false, snackbarMessage: "Επιτυχία προσθήκης υποκατηγορίας!", openSnackbar: true});
        this.fetchData();
    }
    onAddCancel(): void {
        this.setState({openAddDrawer: false});
    }

    onEditClick(): void {
        this.setState({openEditDrawer: true});
    }
    onEditSave(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία τροποποίησης υποκατηγορίας!", openSnackbar: true});
        this.fetchData();
    }
    onEditDelete(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία διαγραφής υποκατηγορίας!", openSnackbar: true});
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
        const actions = <AddEditActions disabledEdit={this.state.selectedSubcategory === null} onAddClick={this.onAddClick.bind(this)} onEditClick={this.onEditClick.bind(this)} />;
        return (
            <Grid container direction="column" style={{height: "100%"}}>
                <Card elevation={6} style={{width: "100%"}}>
                    <CardContent>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
                                <TextField size="small" InputLabelProps={{ shrink: true }} label="search" onChange={(event) => this.search = event.target.value} />
                                <Tooltip title="Search" aria-label="search">
                                    <IconButton size="small" type="submit" value="Submit">
                                        <Search />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
                <SubcategoryDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="subcategories" fetchData={this.state.fetchData}
                    search={this.state.search}
                    onFetchData={this.onFetchData.bind(this)}
                />
                {/*
                <AmmunitionStoresAdd openAddDrawer={this.state.openAddDrawer}
                    onAddSave={this.onAddSave.bind(this)}
                    onAddCancel={this.onAddCancel.bind(this)}
                />
                <AmmunitionStoresEdit store={this.state.selectedPortion}
                    openEditDrawer={this.state.openEditDrawer}
                    onEditSave={this.onEditSave.bind(this)}
                    onEditDelete={this.onEditDelete.bind(this)}
                    onEditCancel={this.onEditCancel.bind(this)}
                />
                */}
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

export interface SubcategoriesPageState {
    subcategories: Subcategory[];
    selectedSubcategory: Subcategory;
    rows: GridRowsProp;
    loading: boolean;
    search: string;
    error: any;
    openAddDrawer: boolean;
    openEditDrawer: boolean;
    openSnackbar: boolean;
    snackbarMessage: string;
    fetchData: boolean;
}
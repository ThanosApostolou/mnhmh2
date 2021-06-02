import React, { ReactNode } from "react";
import { Card, CardContent, TextField, Tooltip, IconButton, Grid, Snackbar, Select, MenuItem, InputLabel } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { ApiConsumer } from "../../../ApiConsumer";
import { DirectMaterialBorrowerDataGrid } from "./DirectMaterialBorrowerDataGrid";
import { DirectMaterialBorrower } from "../../../entities/DirectMaterialBorrower";
import { Borrower } from "../../../entities/Borrower";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddEditActions } from "../../components/AddEditActions";
import { CancelTokenSource } from "axios";
//import { SubcategoriesAdd } from "./SubcategoriesAdd";
//import { AmmunitionStoresEdit } from "./AmmunitionStoresEdit";

export class DirectMaterialBorrowersPage extends React.Component<Record<string, never>, DirectMaterialBorrowersPageState> {
    state: Readonly<DirectMaterialBorrowersPageState>;
    search: string;
    cancelTokenSource: CancelTokenSource;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            directMaterialBorrowers: null,
            selectedDirectMaterialBorrower: null,
            rows: [],
            loading: true,
            search: null,
            selectedBorrowerId: null,
            borrowers: [null],
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
        this.setState({selectedDirectMaterialBorrower: null});
    }

    onRowSelected(directMaterialBorrower: DirectMaterialBorrower): void {
        this.setState({selectedDirectMaterialBorrower: directMaterialBorrower});
    }

    onAddClick(): void {
        this.setState({openAddDrawer: true});
    }
    onAddSave(): void {
        this.setState({openAddDrawer: false, snackbarMessage: "Επιτυχία προσθήκης χρεωστικού!", openSnackbar: true});
        this.fetchData();
    }
    onAddCancel(): void {
        this.setState({openAddDrawer: false});
    }

    onEditClick(): void {
        this.setState({openEditDrawer: true});
    }
    onEditSave(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία τροποποίησης χρεωστικού!", openSnackbar: true});
        this.fetchData();
    }
    onEditDelete(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία διαγραφής χρεωστικού!", openSnackbar: true});
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

    componentDidMount(): void {
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        Borrower.listFromApi(this.cancelTokenSource, null, null, null, null).then((data: any) => {
            this.setState({borrowers: [null].concat(data)});
        }).catch((error) => {
            this.setState({borrowers: [null]});
            this.setState({error: error});
        }).finally(() => {
            this.setState({loading: false});
            console.log("borrowers", this.state.borrowers);
        });
    }

    onComponentWillUnmount(): void {
        this.cancelTokenSource.cancel("cancel fetching data");
    }

    render(): ReactNode {
        const borrowersMenuItems = [];
        for (const borrower of this.state.borrowers) {
            const menuItem = <MenuItem value={borrower ? borrower.Id : null}>{borrower ? borrower.Name : " "}</MenuItem>;
            borrowersMenuItems.push(menuItem);
        }
        const actions = <AddEditActions disabledEdit={this.state.selectedDirectMaterialBorrower === null} onAddClick={this.onAddClick.bind(this)} onEditClick={this.onEditClick.bind(this)} />;
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
                                    <InputLabel id="label">Μερικός Διαχειριστής</InputLabel>
                                    <Select autoWidth={false} labelId="label" id="select"
                                        value={this.state.selectedBorrowerId}
                                        onChange={(event: React.ChangeEvent<{ value: any }>) => {
                                            this.setState({selectedBorrowerId: event.target.value});
                                            console.log("selectedBorrowerId", this.state.selectedBorrowerId);
                                        }}
                                    >
                                        {borrowersMenuItems}
                                    </Select>
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
                <DirectMaterialBorrowerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="directmaterialborrowers" fetchData={this.state.fetchData}
                    search={this.state.search}
                    borrowerId={this.state.selectedBorrowerId}
                    onFetchData={this.onFetchData.bind(this)}
                />
                {/*
                <SubcategoriesAdd openAddDrawer={this.state.openAddDrawer}
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

export interface DirectMaterialBorrowersPageState {
    directMaterialBorrowers: DirectMaterialBorrower[];
    selectedDirectMaterialBorrower: DirectMaterialBorrower;
    rows: GridRowsProp;
    loading: boolean;
    search: string;
    selectedBorrowerId: number;
    borrowers: Borrower[];
    error: any;
    openAddDrawer: boolean;
    openEditDrawer: boolean;
    openSnackbar: boolean;
    snackbarMessage: string;
    fetchData: boolean;
}
import React, { ReactNode } from "react";
import { Card, CardContent, TextField, Tooltip, IconButton, Grid, Snackbar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";


import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { AmmunitionPortion } from "../../../entities/AmmunitionPortion";
import { CancelTokenSource } from "axios";
import { ApiConsumer } from "../../../ApiConsumer";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";
//import { ManagersAdd } from "./ManagersAdd";
//import { ManagersEdit } from "./ManagersEdit";

export class AmmunitionPortionsPage extends React.Component<Record<string, never>, AmmunitionPortionsPageState> {
    state: Readonly<AmmunitionPortionsPageState>;
    cancelTokenSource: CancelTokenSource;
    search: string;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            portions: null,
            selectedPortion: null,
            rows: [],
            loading: true,
            search: null,
            error: null,
            openAddDrawer: false,
            openEditDrawer: false,
            openSnackbar: false,
            snackbarMessage: ""
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.search = "";
    }

    fetchData(): void {
        console.log("fetch data", this.search);
        this.cancelFetchData();
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.setState({rows: []});
        this.setState({loading : true});
        AmmunitionPortion.listFromApi(this.cancelTokenSource).then((data: any) => {
            this.setState({portions: data});
            this.setState({rows: AmmunitionPortion.getRows(this.state.portions)});
        }).catch((error) => {
            this.setState({portions: null});
            this.setState({rows: []});
            this.setState({error: error});
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    cancelFetchData(): void {
        this.cancelTokenSource.cancel("cancel fetching data");
    }

    onRowSelected(params: GridRowSelectedParams): void {
        if (this.state.portions && this.state.portions !== null && this.state.portions.length > 0) {
            this.setState({selectedPortion: this.state.portions[params.data.AA - 1]});
        } else {
            this.setState({selectedPortion: null});
        }

        console.log("manager", this.state.selectedPortion);
    }

    onAddClick(): void {
        this.setState({openAddDrawer: true});
    }
    onAddSave(): void {
        this.setState({openAddDrawer: false, snackbarMessage: "Επιτυχία προσθήκης μέλους επιτροπής!", openSnackbar: true});
        this.fetchData();
    }
    onAddCancel(): void {
        this.setState({openAddDrawer: false});
    }

    onEditClick(): void {
        this.setState({openEditDrawer: true});
    }
    onEditSave(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία τροποποίησης μέλους επιτροπής!", openSnackbar: true});
        this.fetchData();
    }
    onEditDelete(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία διαγραφής μέλους επιτροπής!", openSnackbar: true});
        this.fetchData();
    }
    onEditCancel(): void {
        this.setState({openEditDrawer: false});
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.fetchData();
    }

    render(): ReactNode {
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
                <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={AmmunitionPortion.getColumns()} storagePrefix="ammunitionportions"
                    fetchData={this.fetchData.bind(this)}
                    cancelFetchData={this.cancelFetchData.bind(this)}
                    onRowSelected={this.onRowSelected.bind(this)}
                    onAddClick={this.onAddClick.bind(this)}
                    onEditClick={this.onEditClick.bind(this)}
                />
                {/*<ManagersAdd openAddDrawer={this.state.openAddDrawer}
                    onAddSave={this.onAddSave.bind(this)}
                    onAddCancel={this.onAddCancel.bind(this)}
                />
                <ManagersEdit manager={this.state.selectedGroup}
                    openEditDrawer={this.state.openEditDrawer}
                    onEditSave={this.onEditSave.bind(this)}
                    onEditDelete={this.onEditDelete.bind(this)}
                    onEditCancel={this.onEditCancel.bind(this)}
                />*/}
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

export interface AmmunitionPortionsPageState {
    portions: AmmunitionPortion[];
    selectedPortion: AmmunitionPortion;
    rows: GridRowsProp;
    loading: boolean;
    search: string;
    error: any;
    openAddDrawer: boolean;
    openEditDrawer: boolean;
    openSnackbar: boolean;
    snackbarMessage: string;
}
import React, { ReactNode } from "react";
import { Card, CardContent, TextField, Tooltip, IconButton, Grid, Snackbar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";


import { DataComp } from "../../components/DataComp";
import { Group } from "../../../entities/Group";
import { CancelTokenSource } from "axios";
import { ApiConsumer } from "../../../ApiConsumer";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";
//import { ManagersAdd } from "./ManagersAdd";
//import { ManagersEdit } from "./ManagersEdit";

export class GroupsPage extends React.Component<Record<string, never>, GroupsPageState> {
    state: Readonly<GroupsPageState>;
    cancelTokenSource: CancelTokenSource;
    search: string;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            groups: null,
            selectedGroup: null,
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
        Group.listFromApi(this.cancelTokenSource, this.search).then((data: any) => {
            this.setState({groups: data});
            this.setState({rows: Group.getRows(this.state.groups)});
        }).catch((error) => {
            this.setState({groups: null});
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
        console.log("index", params.data.AA - 1);
        if (this.state.groups && this.state.groups !== null && this.state.groups.length > 0) {
            this.setState({selectedGroup: this.state.groups[params.data.AA - 1]});
        } else {
            this.setState({selectedGroup: null});
        }

        console.log("manager", this.state.selectedGroup);
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
                <DataComp  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={Group.getColumns()} storagePrefix="groups"
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

export interface GroupsPageState {
    groups: Group[];
    selectedGroup: Group;
    rows: GridRowsProp;
    loading: boolean;
    search: string;
    error: any;
    openAddDrawer: boolean;
    openEditDrawer: boolean;
    openSnackbar: boolean;
    snackbarMessage: string;
}
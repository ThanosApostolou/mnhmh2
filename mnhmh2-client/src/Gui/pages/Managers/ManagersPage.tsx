import React, { ReactNode } from "react";
import { Card, CardContent, TextField, Tooltip, IconButton, Grid, Snackbar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";


import { DataComp } from "../../components/DataComp";
import { Manager } from "../../../entities/Manager";
import { CancelTokenSource } from "axios";
import { ApiConsumer } from "../../../ApiConsumer";
import { GridRowsProp } from "@material-ui/data-grid";
import { ManagersAdd } from "./ManagersAdd";

export class ManagersPage extends React.Component<null, ManagersPageState> {
    state: Readonly<ManagersPageState>;
    cancelTokenSource: CancelTokenSource;
    search: string;

    constructor(props: null) {
        super(props);
        this.state = {
            data: null,
            rows: [],
            loading: true,
            search: null,
            error: null,
            openAddDrawer: false,
            addSnackbarOpen: false
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
        Manager.listFromApi(this.cancelTokenSource, this.search).then((data: any) => {
            this.setState({data: data});
            this.setState({rows: Manager.getRows(this.state.data)});
        }).catch((error) => {
            this.setState({data: null});
            this.setState({rows: []});
            this.setState({error: error});
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    cancelFetchData(): void {
        this.cancelTokenSource.cancel("cancel fetching data");
    }

    onAddClick(): void {
        this.setState({openAddDrawer: true});
    }

    onAddSave(): void {
        this.setState({openAddDrawer: false, addSnackbarOpen: true});
        this.fetchData();
    }

    onAddCancel(): void {
        this.setState({openAddDrawer: false});
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
                <DataComp  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={Manager.getColumns()} storagePrefix="manager"
                    fetchData={this.fetchData.bind(this)}
                    cancelFetchData={this.cancelFetchData.bind(this)}
                    onAddClick={this.onAddClick.bind(this)}
                />
                <ManagersAdd openAddDrawer={this.state.openAddDrawer}
                    onAddSave={this.onAddSave.bind(this)}
                    onAddCancel={this.onAddCancel.bind(this)}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.addSnackbarOpen}
                    autoHideDuration={2000}
                    onClose={() => this.setState({addSnackbarOpen: false})}
                >
                    <Alert variant="filled" severity="success" onClose={() => this.setState({addSnackbarOpen: false})}>
                    Επιτυχία προσθήκης μέλους επιτροπής!
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }
}

export interface ManagersPageState {
    data: Manager[];
    rows: GridRowsProp;
    loading: boolean;
    search: string;
    error: any;
    openAddDrawer: boolean;
    addSnackbarOpen: boolean;
}
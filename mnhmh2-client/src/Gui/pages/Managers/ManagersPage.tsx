import React, { ReactNode } from "react";
import { Card, CardContent, TextField, Tooltip, IconButton, Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { Manager } from "../../../entities/Manager";
import { ManagersAdd } from "./ManagersAdd";
import { ManagersEdit } from "./ManagersEdit";
import { AddEditActions } from "../../components/AddEditActions";
import { ManagerDataGrid } from "./ManagerDataGrid";
import { MySnackbar } from "../../components/MySnackbar";

export class ManagersPage extends React.Component<Record<string, never>, ManagersPageState> {
    state: Readonly<ManagersPageState>;
    search: string;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            selectedManager: null,
            search: null,
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
        this.setState({selectedManager: null});
    }

    onRowSelected(manager: Manager): void {
        this.setState({selectedManager: manager});
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
        this.setState({search: this.search});
        this.fetchData();
    }

    render(): ReactNode {
        const actions = <AddEditActions disabledEdit={this.state.selectedManager === null} onAddClick={this.onAddClick.bind(this)} onEditClick={this.onEditClick.bind(this)} />;
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
                <ManagerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="managers" fetchData={this.state.fetchData}
                    search={this.state.search}
                    onFetchData={this.onFetchData.bind(this)}
                />
                <ManagersAdd openAddDrawer={this.state.openAddDrawer}
                    onAddSave={this.onAddSave.bind(this)}
                    onAddCancel={this.onAddCancel.bind(this)}
                />
                <ManagersEdit manager={this.state.selectedManager}
                    openEditDrawer={this.state.openEditDrawer}
                    onEditSave={this.onEditSave.bind(this)}
                    onEditDelete={this.onEditDelete.bind(this)}
                    onEditCancel={this.onEditCancel.bind(this)}
                />
                <MySnackbar
                    open={this.state.openSnackbar}
                    onClose={() => this.setState({openSnackbar: false})}
                    severity="success"
                    message={this.state.snackbarMessage}
                />
            </Grid>
        );
    }
}

export interface ManagersPageState {
    selectedManager: Manager;
    search: string;
    openAddDrawer: boolean;
    openEditDrawer: boolean;
    openSnackbar: boolean;
    snackbarMessage: string;
    fetchData: boolean;
}
import React, { ReactNode } from "react";
import { Card, CardContent, TextField, Tooltip, IconButton, Grid, Snackbar, Select, MenuItem, InputLabel } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { ApiConsumer } from "../../../ApiConsumer";
import { MaterialTabDataGrid } from "./MaterialTabDataGrid";
import { MaterialTab } from "../../../entities/MaterialTab";
import { Group } from "../../../entities/Group";
import { Category } from "../../../entities/Category";
import { GridRowsProp } from "@material-ui/data-grid";
import { AddEditActions } from "../../components/AddEditActions";
import { CancelTokenSource } from "axios";
import { MaterialTabsAdd } from "./MaterialTabsAdd";
//import { AmmunitionStoresEdit } from "./AmmunitionStoresEdit";

export class MaterialTabsPage extends React.Component<Record<string, never>, MaterialTabsPageState> {
    state: Readonly<MaterialTabsPageState>;
    search: string;
    cancelTokenSource: CancelTokenSource;
    cancelTokenSource2: CancelTokenSource;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            materialTabs: null,
            selectedMaterialTab: null,
            rows: [],
            loading: true,
            search: null,
            selectedGroupId: null,
            groups: [null],
            selectedCategoryId: null,
            categories: [null],
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
        this.setState({selectedMaterialTab: null});
    }

    onRowSelected(materialTab: MaterialTab): void {
        this.setState({selectedMaterialTab: materialTab});
    }

    onAddClick(): void {
        this.setState({openAddDrawer: true});
    }
    onAddSave(): void {
        this.setState({openAddDrawer: false, snackbarMessage: "Επιτυχία προσθήκης καρτέλας υλικού!", openSnackbar: true});
        this.fetchData();
    }
    onAddCancel(): void {
        this.setState({openAddDrawer: false});
    }

    onEditClick(): void {
        this.setState({openEditDrawer: true});
    }
    onEditSave(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία τροποποίησης καρτέλας υλικού!", openSnackbar: true});
        this.fetchData();
    }
    onEditDelete(): void {
        this.setState({openEditDrawer: false, snackbarMessage: "Επιτυχία διαγραφής καρτέλας υλικού!", openSnackbar: true});
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
        Group.listFromApi(this.cancelTokenSource, null, null, null).then((data: any) => {
            this.setState({groups: [null].concat(data)});
        }).catch((error) => {
            this.setState({groups: [null]});
            this.setState({error: error});
        }).finally(() => {
            this.setState({loading: false});
        });
        this.cancelTokenSource2 = ApiConsumer.getCancelTokenSource();
        Category.listFromApi(this.cancelTokenSource2, null, null, null).then((data: any) => {
            this.setState({categories: [null].concat(data)});
        }).catch((error) => {
            this.setState({categories: [null]});
            this.setState({error: error});
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    onComponentWillUnmount(): void {
        this.cancelTokenSource.cancel("cancel fetching data");
    }

    render(): ReactNode {
        const groupsMenuItems = [];
        for (const group of this.state.groups) {
            const menuItem = <MenuItem value={group ? group.Id : null}>{group ? group.Name : " "}</MenuItem>;
            groupsMenuItems.push(menuItem);
        }
        const categoriesMenuItems = [];
        for (const category of this.state.categories) {
            const menuItem = <MenuItem value={category ? category.Id : null}>{category ? category.Name : " "}</MenuItem>;
            categoriesMenuItems.push(menuItem);
        }
        const actions = <AddEditActions disabledEdit={this.state.selectedMaterialTab === null} onAddClick={this.onAddClick.bind(this)} onEditClick={this.onEditClick.bind(this)} />;
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
                                    <InputLabel id="label">Ομάδα</InputLabel>
                                    <Select autoWidth={false} labelId="label" id="select"
                                        value={this.state.selectedGroupId}
                                        onChange={(event: React.ChangeEvent<{ value: any }>) => {
                                            this.setState({selectedGroupId: event.target.value});
                                            setTimeout(() => {
                                                this.fetchData();
                                            }, 0);
                                        }}
                                    >
                                        {groupsMenuItems}
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <InputLabel id="label">Συγκρότημα</InputLabel>
                                    <Select autoWidth={false} labelId="label" id="select"
                                        value={this.state.selectedCategoryId}
                                        onChange={(event: React.ChangeEvent<{ value: any }>) => {
                                            this.setState({selectedCategoryId: event.target.value});
                                            setTimeout(() => {
                                                this.fetchData();
                                            }, 0);
                                        }}
                                    >
                                        {categoriesMenuItems}
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
                <MaterialTabDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="materialtabs" fetchData={this.state.fetchData}
                    search={this.state.search}
                    groupId={this.state.selectedGroupId}
                    categoryId={this.state.selectedCategoryId}
                    onFetchData={this.onFetchData.bind(this)}
                />
                <MaterialTabsAdd openAddDrawer={this.state.openAddDrawer}
                    onAddSave={this.onAddSave.bind(this)}
                    onAddCancel={this.onAddCancel.bind(this)}
                />
                {/*
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

export interface MaterialTabsPageState {
    materialTabs: MaterialTab[];
    selectedMaterialTab: MaterialTab;
    rows: GridRowsProp;
    loading: boolean;
    search: string;
    selectedGroupId: number;
    groups: Group[];
    selectedCategoryId: number;
    categories: Category[];
    error: any;
    openAddDrawer: boolean;
    openEditDrawer: boolean;
    openSnackbar: boolean;
    snackbarMessage: string;
    fetchData: boolean;
}
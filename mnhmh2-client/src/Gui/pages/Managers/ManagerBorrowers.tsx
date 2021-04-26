import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { Manager } from "../../../entities/Manager";
import { Borrower } from "../../../entities/Borrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { GridRowSelectedParams, GridRowsProp } from "@material-ui/data-grid";
import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";
import { BorrowerDataGrid } from "../Borrowers/BorrowerDataGrid";

import { AddRemoveActions } from "../../components/AddRemoveActions";

export class ManagerBorrowers extends React.Component<ManagerBorrowersProps, ManagerBorrowersState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: ManagerBorrowersProps) {
        super(props);
        this.state = {
            borrowers: null,
            selectedBorrower: null,
            rows: [],
            loading: true,
            search: null,
            error: null,
            fetchData: false
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    /*componentDidUpdate(props: ManagersEditProps): void {
        if (props.openEditDrawer != this.props.openEditDrawer && this.props.openEditDrawer) {
            this.cancelTokenSource.cancel("cancel sending data");
            this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
            Manager.fromApiWithBorrowers(this.cancelTokenSource, this.props.manager.Id).then(([manager, borrowers] ) => {
                console.log("borrowers:", borrowers);
                this.setState({borrowers: borrowers});
            });
        }
    }*/

    /*fetchData(): void {
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        Manager.fromApiWithBorrowers(this.cancelTokenSource, this.props.manager.Id).then(([manager, borrowers] ) => {
            console.log("borrowers:", borrowers);
            this.setState({borrowers: borrowers});
            this.setState({rows: Borrower.getRowsNomanager(this.state.borrowers)});
        }).catch((error) => {
            this.setState({borrowers: null});
            this.setState({rows: []});
            this.setState({error: error});
        }).finally(() => {
            this.setState({loading: false});
        });
    }*/
    fetchData(): void {
        this.setState({fetchData: !this.state.fetchData});
    }

    onRowSelected(borrower: Borrower): void {
        this.setState({selectedBorrower: borrower});
    }

    onAddClick(): void {
        null;
    }
    onRemoveClick(): void {
        const selectedBorrower = this.state.selectedBorrower;
        selectedBorrower.Manager = null;
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        Borrower.updateInApi(this.cancelTokenSource, selectedBorrower).then(() => {
            this.setState({loading: false});
            this.fetchData();
        }).catch((error) => {
            console.log(error);
            this.setState({loading: false});
        });
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.state.selectedBorrower === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.onRemoveClick.bind(this)} />;
        return (
            <BorrowerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="manager_borrowers" fetchData={this.state.fetchData}
                search={this.state.search}
                withManager={false}
                managerId={this.props.manager.Id}
            />
        );
    }
}

export interface ManagerBorrowersProps {
    manager: Manager;
}

export interface ManagerBorrowersState {
    borrowers: Borrower[]
    selectedBorrower: Borrower;
    rows: GridRowsProp;
    loading: boolean;
    search: string;
    error: any;
    fetchData: boolean;
}

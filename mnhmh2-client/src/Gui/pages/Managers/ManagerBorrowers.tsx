import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { Manager } from "../../../entities/Manager";
import { Borrower } from "../../../entities/Borrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { GridRowsProp } from "@material-ui/data-grid";
import { MyDataGrid } from "../../components/MyDataGrid/MyDataGrid";

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
            error: null
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

    fetchData(): void {
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
    }

    cancelFetchData(): void {
        this.cancelTokenSource.cancel("cancel fetching data");
    }

    render(): ReactNode {
        return (
            <MyDataGrid  error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={Borrower.getColumnsNomanager()} storagePrefix="manager_borrowers"
                fetchData={this.fetchData.bind(this)}
                cancelFetchData={this.cancelFetchData.bind(this)}
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
}

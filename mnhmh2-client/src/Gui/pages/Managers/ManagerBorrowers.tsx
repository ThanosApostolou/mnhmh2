import React, { ReactNode } from "react";
import { Dialog } from "@material-ui/core";

import { Manager } from "../../../entities/Manager";
import { Borrower } from "../../../entities/Borrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import {  GridRowsProp } from "@material-ui/data-grid";
import { BorrowerDataGrid } from "../Borrowers/BorrowerDataGrid";

import { AddRemoveActions } from "../../components/AddRemoveActions";
import { ManagerBorrowersAdd } from "./ManagerBorrowersAdd";

export class ManagerBorrowers extends React.Component<ManagerBorrowersProps, ManagerBorrowersState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: ManagerBorrowersProps) {
        super(props);
        this.state = {
            borrowers: null,
            selectedBorrower: null,
            loading: true,
            fetchData: false,
            openDialog: false
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    fetchData(): void {
        this.setState({fetchData: !this.state.fetchData});
    }

    onFetchData(): void {
        this.setState({selectedBorrower: null});
    }

    onRowSelected(borrower: Borrower): void {
        this.setState({selectedBorrower: borrower});
    }

    onAddClick(): void {
        this.setState({openDialog: true});
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

    onAddSelect(): void {
        this.setState({openDialog: false});
        this.fetchData();
    }

    onAddCancel(): void {
        this.setState({openDialog: false});
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.state.selectedBorrower === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <BorrowerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="manager_borrowers_dialog" fetchData={this.state.fetchData}
                    withManager={false}
                    managerId={this.props.manager.Id}
                    onFetchData={this.onFetchData.bind(this)}
                />
                <ManagerBorrowersAdd manager={this.props.manager} openDialog={this.state.openDialog} onSelect={this.onAddSelect.bind(this)} onCancel={this.onAddCancel.bind(this)} />
            </React.Fragment>
        );
    }
}

export interface ManagerBorrowersProps {
    manager: Manager;
}

export interface ManagerBorrowersState {
    borrowers: Borrower[]
    selectedBorrower: Borrower;
    loading: boolean;
    fetchData: boolean;
    openDialog: boolean;
}

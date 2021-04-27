import React, { ReactNode } from "react";
import { Dialog, DialogContent } from "@material-ui/core";

import { Manager } from "../../../entities/Manager";
import { Borrower } from "../../../entities/Borrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import {  GridRowsProp } from "@material-ui/data-grid";
import { BorrowerDataGrid } from "../Borrowers/BorrowerDataGrid";

import { AddRemoveActions } from "../../components/AddRemoveActions";

export class ManagerBorrowersAdd extends React.Component<ManagerBorrowersAddProps, ManagerBorrowersAddState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: ManagerBorrowersAddProps) {
        super(props);
        this.state = {
            borrowers: null,
            selectedBorrower: null,
            loading: true,
            fetchData: false
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

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
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <BorrowerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="manager_borrowers_add" fetchData={this.state.fetchData}
                            withManager={true}
                            notManagerId={this.props.manager.Id}
                        />
                    </DialogContent>
                </Dialog>
            );
        }
    }
}

export interface ManagerBorrowersAddProps {
    manager: Manager;
    openDialog: boolean;
    handleDialogClose(): void;
}

export interface ManagerBorrowersAddState {
    borrowers: Borrower[]
    selectedBorrower: Borrower;
    loading: boolean;
    fetchData: boolean;
}

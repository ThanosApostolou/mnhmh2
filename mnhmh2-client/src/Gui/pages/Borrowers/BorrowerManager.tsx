import React, { ReactNode } from "react";
import { Dialog } from "@material-ui/core";

import { Manager } from "../../../entities/Manager";
import { Borrower } from "../../../entities/Borrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import {  GridRowsProp } from "@material-ui/data-grid";
import { ManagerDataGrid } from "../Managers/ManagerDataGrid";

import { AddRemoveActions } from "../../components/AddRemoveActions";
import { BorrowerManagerAdd } from "./BorrowerManagerAdd";

export class BorrowerManager extends React.Component<BorrowerManagerProps, BorrowerManagerState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: BorrowerManagerProps) {
        super(props);
        this.state = {
            managers: null,
            selectedManager: null,
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
        this.setState({selectedManager: null});
    }

    onRowSelected(manager: Manager): void {
        this.setState({selectedManager: manager});
    }

    onAddClick(): void {
        this.setState({openDialog: true});
    }
    onRemoveClick(): void {
        const borrower = this.props.borrower;
        borrower.Manager = null;
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        Borrower.updateInApi(this.cancelTokenSource, borrower).then(() => {
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
        const actions = <AddRemoveActions disabledRemove={this.state.selectedManager === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <ManagerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="borrower_manager" fetchData={this.state.fetchData}
                    Id={this.props.borrower.Manager ? this.props.borrower.Manager.Id : -1000}
                    notId={this.props.borrower.Manager ? null : -1000}
                    onFetchData={this.onFetchData.bind(this)}
                />
                <BorrowerManagerAdd borrower={this.props.borrower} openDialog={this.state.openDialog} onSelect={this.onAddSelect.bind(this)} onCancel={this.onAddCancel.bind(this)} />
            </React.Fragment>
        );
    }
}

export interface BorrowerManagerProps {
    borrower: Borrower;
}

export interface BorrowerManagerState {
    managers: Manager[]
    selectedManager: Manager;
    loading: boolean;
    fetchData: boolean;
    openDialog: boolean;
}

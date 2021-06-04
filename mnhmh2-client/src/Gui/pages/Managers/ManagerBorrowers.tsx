import React, { ReactNode } from "react";
import { CancelTokenSource } from "axios";

import { Manager } from "../../../entities/Manager";
import { Borrower } from "../../../entities/Borrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { BorrowerDataGrid } from "../Borrowers/BorrowerDataGrid";
import { AddRemoveActions } from "../../components/AddRemoveActions";
import { BorrowerSelectDialog } from "../Borrowers/BorrowerSelectDialog";

export class ManagerBorrowers extends React.Component<ManagerBorrowersProps, ManagerBorrowersState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: ManagerBorrowersProps) {
        super(props);
        this.state = {
            selectedBorrower: null,
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
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        Borrower.updateInApi(this.cancelTokenSource, selectedBorrower).then(() => {
            this.fetchData();
        }).catch((error) => {
            console.log(error);
        });
    }

    onAddSelect(borrower: Borrower): void {
        borrower.Manager = this.props.manager;
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        Borrower.updateInApi(this.cancelTokenSource, borrower).then(() => {
            this.setState({openDialog: false});
            this.fetchData();
        }).catch((error) => {
            console.log(error);
        });
    }

    onAddCancel(): void {
        this.setState({openDialog: false});
    }

    render(): ReactNode {
        const actions = <AddRemoveActions disabledRemove={this.state.selectedBorrower === null} onAddClick={this.onAddClick.bind(this)} onRemoveClick={this.onRemoveClick.bind(this)} />;
        return (
            <React.Fragment>
                <BorrowerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="manager_borrowers" fetchData={this.state.fetchData}
                    withManager={false}
                    managerId={this.props.manager.Id}
                    onFetchData={this.onFetchData.bind(this)}
                />
                <BorrowerSelectDialog openDialog={this.state.openDialog} onSelectClick={this.onAddSelect.bind(this)} onCancelClick={this.onAddCancel.bind(this)} />
            </React.Fragment>
        );
    }
}

export interface ManagerBorrowersProps {
    manager: Manager;
}

export interface ManagerBorrowersState {
    selectedBorrower: Borrower;
    fetchData: boolean;
    openDialog: boolean;
}

import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { Manager } from "../../../entities/Manager";
import { Borrower } from "../../../entities/Borrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { BorrowerDataGrid } from "../Borrowers/BorrowerDataGrid";

import { SelectActions } from "../../components/SelectActions";

export class ManagerBorrowersAdd extends React.Component<ManagerBorrowersAddProps, ManagerBorrowersAddState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: ManagerBorrowersAddProps) {
        super(props);
        this.state = {
            borrowers: null,
            selectedBorrower: null,
            loading: false,
            fetchData: false
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

    onSelectClick(): void {
        const selectedBorrower = this.state.selectedBorrower;
        selectedBorrower.Manager = this.props.manager;
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        Borrower.updateInApi(this.cancelTokenSource, selectedBorrower).then(() => {
            this.setState({loading: false});
            this.props.onSelect();
        }).catch((error) => {
            console.log(error);
            this.setState({loading: false});
        });
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedBorrower === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Λοιποί Μερικοί Διαχειριστές
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <BorrowerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="manager_borrowers_add" fetchData={this.state.fetchData}
                            withManager={true}
                            notManagerId={this.props.manager.Id}
                            onFetchData={this.onFetchData.bind(this)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction="row" justify="flex-end">

                            <Button variant="contained" style={{margin: "10px"}} disabled={this.state.loading} onClick={this.props.onCancel}>
                                ΑΚΥΡΩΣΗ
                            </Button>
                        </Grid>

                    </DialogActions>
                </Dialog>
            );
        }
    }
}

export interface ManagerBorrowersAddProps {
    manager: Manager;
    openDialog: boolean;
    onSelect(): void;
    onCancel(): void;
}

export interface ManagerBorrowersAddState {
    borrowers: Borrower[]
    selectedBorrower: Borrower;
    loading: boolean;
    fetchData: boolean;
}

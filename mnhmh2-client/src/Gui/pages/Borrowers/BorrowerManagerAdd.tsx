import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { Manager } from "../../../entities/Manager";
import { Borrower } from "../../../entities/Borrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { ManagerDataGrid } from "../Managers/ManagerDataGrid";

import { SelectActions } from "../../components/SelectActions";

export class BorrowerManagerAdd extends React.Component<BorrowerManagerAddProps, BorrowerManagerAddState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: BorrowerManagerAddProps) {
        super(props);
        this.state = {
            managers: null,
            selectedManager: null,
            loading: false,
            fetchData: false
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

    onSelectClick(): void {
        //const selectedBorrower = this.state.selectedManager;
        //selectedBorrower.Manager = this.props.borrower;
        const borrower = this.props.borrower;
        borrower.Manager = this.state.selectedManager;
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        Borrower.updateInApi(this.cancelTokenSource, borrower).then(() => {
            this.setState({loading: false});
            this.props.onSelect();
        }).catch((error) => {
            console.log(error);
            this.setState({loading: false});
        });
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedManager === null} onSelectClick={this.onSelectClick.bind(this)} />;
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
                        <ManagerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="borrower_manager_add" fetchData={this.state.fetchData}
                            notId={this.props.borrower.Manager ? this.props.borrower.Manager.Id : null}
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

export interface BorrowerManagerAddProps {
    borrower: Borrower;
    openDialog: boolean;
    onSelect(): void;
    onCancel(): void;
}

export interface BorrowerManagerAddState {
    managers: Manager[]
    selectedManager: Manager;
    loading: boolean;
    fetchData: boolean;
}

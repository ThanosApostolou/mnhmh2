import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { Borrower } from "../../../entities/Borrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { BorrowerDataGrid } from "./BorrowerDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class BorrowerSelectDialog extends React.Component<BorrowerSelectDialogProps, BorrowerSelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: BorrowerSelectDialogProps) {
        super(props);
        this.state = {
            selectedBorrower: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedBorrower: null});
    }

    onRowSelected(borrower: Borrower): void {
        this.setState({selectedBorrower: borrower});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedBorrower);
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
                            Μερικοί Διαχειριστές
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <BorrowerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="borrowers_select"
                            onFetchData={this.onFetchData.bind(this)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction="row" justify="flex-end">
                            <Button variant="contained" style={{margin: "10px"}} onClick={this.props.onCancelClick}>
                                ΑΚΥΡΩΣΗ
                            </Button>
                        </Grid>
                    </DialogActions>
                </Dialog>
            );
        }
    }
}

export interface BorrowerSelectDialogProps {
    openDialog: boolean;
    onSelectClick(borrower: Borrower): void;
    onCancelClick(): void;
}

export interface BorrowerSelectDialogState {
    selectedBorrower: Borrower;
}

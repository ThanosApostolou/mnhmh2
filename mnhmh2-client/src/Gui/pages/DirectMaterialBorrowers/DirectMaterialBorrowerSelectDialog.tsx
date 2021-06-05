import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { DirectMaterialBorrower } from "../../../entities/DirectMaterialBorrower";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { DirectMaterialBorrowerDataGrid } from "./DirectMaterialBorrowerDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class DirectMaterialBorrowerSelectDialog extends React.Component<DirectMaterialBorrowerSelectDialogProps, DirectMaterialBorrowerSelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: DirectMaterialBorrowerSelectDialogProps) {
        super(props);
        this.state = {
            selectedDirectMaterialBorrower: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedDirectMaterialBorrower: null});
    }

    onRowSelected(directMaterialBorrower: DirectMaterialBorrower): void {
        this.setState({selectedDirectMaterialBorrower: directMaterialBorrower});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedDirectMaterialBorrower);
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedDirectMaterialBorrower === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Χρεωστικά
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <DirectMaterialBorrowerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="directmaterialborrowers_select"
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

export interface DirectMaterialBorrowerSelectDialogProps {
    openDialog: boolean;
    onSelectClick(directMaterialBorrower: DirectMaterialBorrower): void;
    onCancelClick(): void;
}

export interface DirectMaterialBorrowerSelectDialogState {
    selectedDirectMaterialBorrower: DirectMaterialBorrower;
}

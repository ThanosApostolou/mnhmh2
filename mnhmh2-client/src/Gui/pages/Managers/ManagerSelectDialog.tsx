import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { Manager } from "../../../entities/Manager";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { ManagerDataGrid } from "./ManagerDataGrid";

import { SelectActions } from "../../components/SelectActions";

export class ManagerSelectDialog extends React.Component<ManagerSelectDialogProps, ManagerSelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: ManagerSelectDialogProps) {
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
        this.props.onSelectClick(this.state.selectedManager);
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
                            Μέλη Επιτροπής
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <ManagerDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="managers_select"
                            fetchData={this.state.fetchData}
                            onFetchData={this.onFetchData.bind(this)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Grid container direction="row" justify="flex-end">

                            <Button variant="contained" style={{margin: "10px"}} disabled={this.state.loading} onClick={this.props.onCancelClick}>
                                ΑΚΥΡΩΣΗ
                            </Button>
                        </Grid>

                    </DialogActions>
                </Dialog>
            );
        }
    }
}

export interface ManagerSelectDialogProps {
    openDialog: boolean;
    onSelectClick(manager: Manager): void;
    onCancelClick(): void;
}

export interface ManagerSelectDialogState {
    managers: Manager[]
    selectedManager: Manager;
    loading: boolean;
    fetchData: boolean;
}

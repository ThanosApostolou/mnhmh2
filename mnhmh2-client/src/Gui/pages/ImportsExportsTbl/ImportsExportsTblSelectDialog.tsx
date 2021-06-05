import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { ImportsExportsTbl } from "../../../entities/ImportsExportsTbl";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { ImportsExportsTblDataGrid } from "./ImportsExportsTblDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class ImportsExportsTblSelectDialog extends React.Component<ImportsExportsTblSelectDialogProps, ImportsExportsTblSelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: ImportsExportsTblSelectDialogProps) {
        super(props);
        this.state = {
            selectedImportsExportsTbl: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedImportsExportsTbl: null});
    }

    onRowSelected(importsExportsTbl: ImportsExportsTbl): void {
        this.setState({selectedImportsExportsTbl: importsExportsTbl});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedImportsExportsTbl);
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedImportsExportsTbl === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Συγκριτικές
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <ImportsExportsTblDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="importsexportstbls_select"
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

export interface ImportsExportsTblSelectDialogProps {
    openDialog: boolean;
    onSelectClick(importsExportsTbl: ImportsExportsTbl): void;
    onCancelClick(): void;
}

export interface ImportsExportsTblSelectDialogState {
    selectedImportsExportsTbl: ImportsExportsTbl;
}

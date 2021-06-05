import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { MaterialTab } from "../../../entities/MaterialTab";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { MaterialTabDataGrid } from "./MaterialTabDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class MaterialTabSelectDialog extends React.Component<MaterialTabSelectDialogProps, MaterialTabSelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: MaterialTabSelectDialogProps) {
        super(props);
        this.state = {
            selectedMaterialTab: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedMaterialTab: null});
    }

    onRowSelected(materialTab: MaterialTab): void {
        this.setState({selectedMaterialTab: materialTab});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedMaterialTab);
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedMaterialTab === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Καρτέλες Υλικών
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <MaterialTabDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="materialtabs_select"
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

export interface MaterialTabSelectDialogProps {
    openDialog: boolean;
    onSelectClick(materialTab: MaterialTab): void;
    onCancelClick(): void;
}

export interface MaterialTabSelectDialogState {
    selectedMaterialTab: MaterialTab;
}

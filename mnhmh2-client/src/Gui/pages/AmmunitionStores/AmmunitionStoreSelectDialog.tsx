import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { AmmunitionStore } from "../../../entities/AmmunitionStore";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { AmmunitionStoreDataGrid } from "./AmmunitionStoreDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class AmmunitionStoreSelectDialog extends React.Component<AmmunitionStoreSelectDialogProps, AmmunitionStoreSelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: AmmunitionStoreSelectDialogProps) {
        super(props);
        this.state = {
            selectedAmmunitionStore: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedAmmunitionStore: null});
    }

    onRowSelected(ammunitionStore: AmmunitionStore): void {
        this.setState({selectedAmmunitionStore: ammunitionStore});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedAmmunitionStore);
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedAmmunitionStore === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Αποθήκες
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <AmmunitionStoreDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="stores_select"
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

export interface AmmunitionStoreSelectDialogProps {
    openDialog: boolean;
    onSelectClick(ammunitionStore: AmmunitionStore): void;
    onCancelClick(): void;
}

export interface AmmunitionStoreSelectDialogState {
    selectedAmmunitionStore: AmmunitionStore;
}

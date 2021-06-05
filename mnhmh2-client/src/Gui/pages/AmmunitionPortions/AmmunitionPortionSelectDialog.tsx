import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { AmmunitionPortion } from "../../../entities/AmmunitionPortion";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { AmmunitionPortionDataGrid } from "./AmmunitionPortionDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class AmmunitionPortionSelectDialog extends React.Component<AmmunitionPortionSelectDialogProps, AmmunitionPortionSelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: AmmunitionPortionSelectDialogProps) {
        super(props);
        this.state = {
            selectedAmmunitionPortion: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedAmmunitionPortion: null});
    }

    onRowSelected(ammunitionPortion: AmmunitionPortion): void {
        this.setState({selectedAmmunitionPortion: ammunitionPortion});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedAmmunitionPortion);
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedAmmunitionPortion === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Πυρομαχικά
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <AmmunitionPortionDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="portions_select"
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

export interface AmmunitionPortionSelectDialogProps {
    openDialog: boolean;
    onSelectClick(ammunitionPortion: AmmunitionPortion): void;
    onCancelClick(): void;
}

export interface AmmunitionPortionSelectDialogState {
    selectedAmmunitionPortion: AmmunitionPortion;
}

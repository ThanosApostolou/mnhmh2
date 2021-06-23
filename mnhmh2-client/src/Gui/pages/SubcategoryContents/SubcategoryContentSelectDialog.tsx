import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { SubcategoryContent } from "../../../entities/SubcategoryContent";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { SubcategoryContentDataGrid } from "./SubcategoryContentDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class SubcategoryContentSelectDialog extends React.Component<SubcategoryContentSelectDialogProps, SubcategoryContentSelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: SubcategoryContentSelectDialogProps) {
        super(props);
        this.state = {
            selectedSubcategoryContent: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedSubcategoryContent: null});
    }

    onRowSelected(subcategoryContent: SubcategoryContent): void {
        this.setState({selectedSubcategoryContent: subcategoryContent});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedSubcategoryContent);
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedSubcategoryContent === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Περιεχόμενα Υποσυγκροτημάτων
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <SubcategoryContentDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="subcategorycontents_select"
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

export interface SubcategoryContentSelectDialogProps {
    openDialog: boolean;
    onSelectClick(subcategoryContent: SubcategoryContent): void;
    onCancelClick(): void;
}

export interface SubcategoryContentSelectDialogState {
    selectedSubcategoryContent: SubcategoryContent;
}

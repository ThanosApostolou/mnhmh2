import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { Subcategory } from "../../../entities/Subcategory";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { SubcategoryContentDataGrid } from "./SubcategoryContentDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class SubcategorySelectDialog extends React.Component<SubcategorySelectDialogProps, SubcategorySelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: SubcategorySelectDialogProps) {
        super(props);
        this.state = {
            selectedSubcategory: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedSubcategory: null});
    }

    onRowSelected(subcategory: Subcategory): void {
        this.setState({selectedSubcategory: subcategory});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedSubcategory);
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedSubcategory === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Υποσυγκροτήματα
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <SubcategoryContentDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="subcategories_select"
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

export interface SubcategorySelectDialogProps {
    openDialog: boolean;
    onSelectClick(subcategory: Subcategory): void;
    onCancelClick(): void;
}

export interface SubcategorySelectDialogState {
    selectedSubcategory: Subcategory;
}

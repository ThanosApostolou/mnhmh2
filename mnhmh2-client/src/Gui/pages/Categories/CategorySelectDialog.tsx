import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { Category } from "../../../entities/Category";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { CategoryDataGrid } from "./CategoryDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class CategorySelectDialog extends React.Component<CategorySelectDialogProps, CategorySelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: CategorySelectDialogProps) {
        super(props);
        this.state = {
            selectedCategory: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedCategory: null});
    }

    onRowSelected(category: Category): void {
        this.setState({selectedCategory: category});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedCategory);
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedCategory === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Συγκροτήματα
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <CategoryDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="categories_select"
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

export interface CategorySelectDialogProps {
    openDialog: boolean;
    onSelectClick(category: Category): void;
    onCancelClick(): void;
}

export interface CategorySelectDialogState {
    selectedCategory: Category;
}

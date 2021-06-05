import React, { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from "@material-ui/core";

import { Group } from "../../../entities/Group";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { GroupDataGrid } from "./GroupDataGrid";
import { SelectActions } from "../../components/SelectActions";

export class GroupSelectDialog extends React.Component<GroupSelectDialogProps, GroupSelectDialogState> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: GroupSelectDialogProps) {
        super(props);
        this.state = {
            selectedGroup: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    onFetchData(): void {
        this.setState({selectedGroup: null});
    }

    onRowSelected(group: Group): void {
        this.setState({selectedGroup: group});
    }

    onSelectClick(): void {
        this.props.onSelectClick(this.state.selectedGroup);
    }

    render(): ReactNode {
        const actions = <SelectActions disabledSelect={this.state.selectedGroup === null} onSelectClick={this.onSelectClick.bind(this)} />;
        if (!this.props.openDialog) {
            return null;
        } else {
            return (
                <Dialog open={this.props.openDialog} maxWidth={false} fullWidth={true} style={{height: "100vh"}}>
                    <DialogTitle>
                        <Grid container direction="row" justify="center">
                            Ομάδες
                        </Grid>
                    </DialogTitle>
                    <DialogContent style={{height: "100vh", display: "flex", flexGrow: 1}}>
                        <GroupDataGrid actions={actions} onRowSelected={this.onRowSelected.bind(this)} storagePrefix="groups_select"
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

export interface GroupSelectDialogProps {
    openDialog: boolean;
    onSelectClick(group: Group): void;
    onCancelClick(): void;
}

export interface GroupSelectDialogState {
    selectedGroup: Group;
}

import React, { ReactNode } from "react";
import { Button, Dialog, DialogContent, DialogActions } from "@material-ui/core";


export class SettingsDialog extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    /**
     * Cancels settings changes and calls parent's handleCloseSettingsDialog()
     */
    handleCancel() {
        console.log("handleCancel");
        this.props.handleCloseSettingsDialog();
    }
    /**
     * Saves settings changes and calls parent's handleCloseSettingsDialog()
     */
    handleSave() {
        console.log("handleSave");
        this.props.handleCloseSettingsDialog();
    }
    render(): ReactNode {
        return (
            <Dialog open={this.props.openSettingsDialog}  fullWidth={true} maxWidth="xl" disableBackdropClick disableEscapeKeyDown>
                <DialogContent>
                    adf
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleCancel.bind(this)}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSave.bind(this)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
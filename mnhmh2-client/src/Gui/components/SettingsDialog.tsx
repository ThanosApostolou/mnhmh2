import React, { ReactNode } from "react";
import { Button, Dialog, DialogContent, DialogActions, TextField, Switch, FormControlLabel, DialogTitle } from "@material-ui/core";


export class SettingsDialog extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            settingsChanged: false,
            serverSettingIsDefault: false,
        };
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
                <DialogTitle style={{textAlign: "center"}}>
                    Settings
                </DialogTitle>
                <DialogContent>
                    <TextField label="Server Address:" defaultValue="http://localhost:3000" disabled={this.state.serverSettingIsDefault } />
                    <FormControlLabel
                        control={<Switch name="default" checked={this.state.serverSettingIsDefault} onChange={() => this.setState({serverSettingIsDefault: !this.state.serverSettingIsDefault})} />}
                        label="default"
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleCancel.bind(this)}>
                        Cancel
                    </Button>
                    <Button disabled={!this.state.changed} onClick={this.handleSave.bind(this)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
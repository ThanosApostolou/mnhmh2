import React, { ReactNode } from "react";
import { Button, Dialog, DialogContent, DialogActions, TextField, Switch, Select, FormControlLabel, DialogTitle, MenuItem, InputLabel } from "@material-ui/core";

import App from "../../App";


export class SettingsDialog extends React.Component<any, any> {
    serverInputRef: React.RefObject<HTMLDivElement>;
    serverSwitchRef: React.RefObject<HTMLDivElement>;
    themeInputRef: React.RefObject<HTMLDivElement>
    themeSwitchRef: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.state = {
            settingsChanged: false,
            server: App.app.settingsmanager.server,
            isServerDefault: App.app.settingsmanager.isServerDefault,
            theme: App.app.settingsmanager.theme,
            isThemeDefault: App.app.settingsmanager.isThemeDefault
        };
    }
    /**
     * Cancels settings changes and calls parent's handleCloseSettingsDialog()
     */
    handleCancel() {
        this.props.handleCloseSettingsDialog();
    }
    /**
     * Saves settings changes and calls parent's handleCloseSettingsDialog()
     */
    handleSave() {
        let server = null;
        if (!this.state.isServerDefault) {
            server = this.state.server; 
        }
        let theme = null;
        if (!this.state.isThemeDefault) {
            theme = this.state.theme; 
        }
        console.log(this.state.server, this.state.isServerDefault, this.state.theme, this.state.isThemeDefault);
        App.app.settingsmanager.setSettings(server, theme);
        this.props.handleCloseSettingsDialog();
    }

    render(): ReactNode {
        return (
            <Dialog open={this.props.openSettingsDialog}  fullWidth={true} maxWidth="xl" disableBackdropClick disableEscapeKeyDown>
                <DialogTitle style={{textAlign: "center"}}>
                    Settings
                </DialogTitle>
                <DialogContent>
                    <TextField label="Server Address:" defaultValue={this.state.server} disabled={this.state.isServerDefault} onChange={(e) => this.setState({server: e.target.value})} />
                    <FormControlLabel
                        control={<Switch name="default" checked={this.state.isServerDefault} onChange={() => this.setState({isServerDefault: !this.state.isServerDefault})} />}
                        label="default"
                    />
                </DialogContent>
                <DialogContent>
                    <InputLabel shrink id="themeSelect" disabled={this.state.isThemeDefault}>Theme:</InputLabel>
                    <Select id="themeSelect" defaultValue={this.state.theme} disabled={this.state.isThemeDefault}
                        onChange={(e) => this.setState({theme: e.target.value})}
                    >
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="light">Light</MenuItem>
                    </Select>
                    <FormControlLabel
                        control={<Switch name="default" checked={this.state.isThemeDefault} onChange={() => this.setState({isThemeDefault: !this.state.isThemeDefault})} />}
                        label="default"
                    />
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
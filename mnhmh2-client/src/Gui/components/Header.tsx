import React, { ReactNode } from "react";

import { Grid, AppBar, Toolbar, MenuItem, Popover } from "@material-ui/core";
import { ArrowDropDown, ListAlt, MenuBook, CompareArrows, Whatshot, FolderOpen, Settings, AccountCircle, Group, GroupWork, GroupWorkTwoTone, RecentActors, Store, SupervisorAccount } from "@material-ui/icons";
import { NavLink, withRouter } from "react-router-dom";

import brainImage from "../../resources/brain-chip-white.png";
import { SettingsDialog } from "./SettingsDialog";
import App from "../../App";

class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            anchorMenuEl: null,
            openSettingsDialog: false
        };
    }

    handleClick(event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLLIElement>) {
        this.setState({anchorMenuEl: event.currentTarget});
    }

    handleClose() {
        this.setState({anchorMenuEl: null});
    }

    /**
     * Open Settings Dialog by setting openSettingsDialog state to true
     */
    handleOpenSettingsDialog() {
        this.setState({openSettingsDialog: true});
    }
    /**
     * Closes Settings Dialog by setting openSettingsDialog state to false
     */
    handleCloseSettingsDialog() {
        this.setState({openSettingsDialog: false});
    }

    render(): ReactNode {
        const path = this.props.location.pathname;
        const settingsdialog = this.state.openSettingsDialog === true ?  <SettingsDialog openSettingsDialog={this.state.openSettingsDialog} handleCloseSettingsDialog={this.handleCloseSettingsDialog.bind(this)} /> : null;
        return (
            <AppBar position="static" color={App.app.state.thememanager.type === "dark" ? "default" : "primary"}>
                <Toolbar variant="dense">
                    <Grid container alignItems="center">
                        <Grid item xs={11}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <MenuItem component={NavLink} to="/">
                                    <img src={brainImage} height="36" />
                                    &nbsp;ΜΝΗΜΗ 2
                                </MenuItem>
                                <MenuItem component={NavLink} to="/materialtabs" selected={path === "/materialtabs" ? true : false}>
                                    <ListAlt />
                                    &nbsp;Καρτέλες Υλικών
                                </MenuItem>
                                <MenuItem component={NavLink} to="/directmaterialborrowers" selected={path === "/directmaterialborrowers" ? true : false}>
                                    <MenuBook />
                                    &nbsp;Χρεωστικά
                                </MenuItem>
                                <MenuItem component={NavLink} to="/importsexportstbl" selected={path === "/importsexportstbl" ? true : false}>
                                    <CompareArrows />
                                    &nbsp;Συγρκιτικές
                                </MenuItem>
                                <MenuItem component={NavLink} to="/categories" selected={path === "/categories" ? true : false}>
                                    <GroupWork />
                                    &nbsp;Συγκροτήματα
                                </MenuItem>
                                <MenuItem component={NavLink} to="/subcategories" selected={path === "/subcategories" ? true : false}>
                                    <GroupWorkTwoTone />
                                    &nbsp;Υποσυγκροτήματα
                                </MenuItem>
                                <MenuItem component={NavLink} to="/ammunitionportions" selected={path === "/ammunitionportions" ? true : false}>
                                    <Whatshot />
                                    &nbsp;Πυρομαχικά
                                </MenuItem>
                                <MenuItem component={NavLink} to="/ammunitionstores" selected={path === "/ammunitionstores" ? true : false}>
                                    <Store />
                                    &nbsp;Αποθήκες
                                </MenuItem>
                                <MenuItem selected={path === "/borrowers" || path==="/groups" || path==="/managers" || path==="/subcategorycontents" ? true : false} onClick={this.handleClick.bind(this)}>
                                    <FolderOpen />
                                    &nbsp;Δεδομένα
                                    <ArrowDropDown />
                                </MenuItem>

                            </Grid>
                        </Grid>

                        <Grid item xs={1}>
                            <Grid container direction="row" justify="flex-end" alignItems="center">
                                <MenuItem onClick={this.handleOpenSettingsDialog.bind(this)}>
                                    <Settings />
                                </MenuItem>
                                <MenuItem onClick={this.handleClose.bind(this)}>
                                    <AccountCircle />
                                </MenuItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Popover anchorEl={this.state.anchorMenuEl} open={Boolean(this.state.anchorMenuEl)} onClose={this.handleClose.bind(this)}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <MenuItem component={NavLink} to="/subcategorycontents" selected={path === "/subcategorycontents" ? true : false} onClick={this.handleClose.bind(this)}>
                        <RecentActors />
                                            &nbsp;Περιεχόμενα Υποσυγκροτημάτων
                    </MenuItem>
                    <MenuItem component={NavLink} to="/borrowers" selected={path === "/borrowers" ? true : false} onClick={this.handleClose.bind(this)}>
                        <RecentActors />
                                            &nbsp;Μερικοί Διαχειριστές
                    </MenuItem>
                    <MenuItem component={NavLink} to="/groups" selected={path === "/groups" ? true : false} onClick={this.handleClose.bind(this)}>
                        <Group />
                                            &nbsp;Ομάδες
                    </MenuItem>
                    <MenuItem component={NavLink} to="/managers" selected={path === "/managers" ? true : false} onClick={this.handleClose.bind(this)}>
                        <SupervisorAccount />
                                            &nbsp;Επιτροπή
                    </MenuItem>
                </Popover>
                {settingsdialog}
            </AppBar>
        );
    }
}

export default withRouter(Header);
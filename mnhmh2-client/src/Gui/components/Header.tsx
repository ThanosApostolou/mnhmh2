import React from "react";

import { Grid, AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button } from "@material-ui/core";
import { ArrowDropDown, ListAlt, MenuBook, CompareArrows, Whatshot, FolderOpen, Settings, AccountCircle, Group, GroupWork, GroupWorkTwoTone, RecentActors, Store, SupervisorAccount } from "@material-ui/icons";
import { NavLink, withRouter } from "react-router-dom";

import brainImage from "../../resources/brain-chip-white.png";

class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    handleClick(event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLLIElement>) {
        this.setState({anchorEl: event.currentTarget});
    }

    handleClose() {
        this.setState({anchorEl: null});
    }

    render() {
        const path = this.props.location.pathname;

        return (
            <AppBar position="static" color="default">
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
                                <MenuItem component={NavLink} to="/debitnotes" selected={path === "/debitnotes" ? true : false}>
                                    <MenuBook />
                                    &nbsp;Χρεωστικά
                                </MenuItem>
                                <MenuItem component={NavLink} to="/comparisons" selected={path === "/comparisons" ? true : false}>
                                    <CompareArrows />
                                    &nbsp;Συγρκιτικές
                                </MenuItem>
                                <MenuItem component={NavLink} to="/compounds" selected={path === "/compounds" ? true : false}>
                                    <GroupWork />
                                    &nbsp;Συγκροτήματα
                                </MenuItem>
                                <MenuItem component={NavLink} to="/subcompounds" selected={path === "/subcompounds" ? true : false}>
                                    <GroupWorkTwoTone />
                                    &nbsp;Υποσυγκροτήματα
                                </MenuItem>
                                <MenuItem component={NavLink} to="/ammunition" selected={path === "/ammunition" ? true : false}>
                                    <Whatshot />
                                    &nbsp;Πυρομαχικά
                                </MenuItem>
                                <MenuItem component={NavLink} to="/warehouses" selected={path === "/warehouses" ? true : false}>
                                    <Store />
                                    &nbsp;Αποθήκες
                                </MenuItem>
                                <MenuItem selected={path === "/partialmanagers" || path==="/teams" || path==="/commition" ? true : false} onClick={this.handleClick.bind(this)}>
                                    <FolderOpen />
                                    &nbsp;Δεδομένα
                                    <ArrowDropDown />
                                </MenuItem>
                                <Popper id="simple-popper" open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl}>
                                    <Menu id="menu1" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this)}>                    
                                        <MenuItem component={NavLink} to="/partialmanagers" selected={path === "/partialmanagers" ? true : false} onClick={this.handleClose.bind(this)}>
                                            <RecentActors />
                                            &nbsp;Μερικοί Διαχειριστές
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/teams" selected={path === "/teams" ? true : false} onClick={this.handleClose.bind(this)}>
                                            <Group />
                                            &nbsp;Ομάδες
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/commition" selected={path === "/commition" ? true : false} onClick={this.handleClose.bind(this)}>
                                            <SupervisorAccount />
                                            &nbsp;Επιτροπή
                                        </MenuItem>
                                    </Menu>
                                </Popper>
                            </Grid>
                        </Grid>
          
                        <Grid item xs={1}>              
                            <Grid container direction="row" justify="flex-end" alignItems="center">
                                <MenuItem onClick={this.handleClose.bind(this)}>
                                    <Settings />
                                </MenuItem>
                                <MenuItem onClick={this.handleClose.bind(this)}>
                                    <AccountCircle />
                                </MenuItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(Header);
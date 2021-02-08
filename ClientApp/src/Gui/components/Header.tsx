import React from "react";

import { Grid, AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button } from "@material-ui/core";
import { ArrowDropDown, ListAlt, MenuBook, CompareArrows, Whatshot, FolderOpen, Settings, AccountCircle } from '@material-ui/icons';
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
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container alignItems="center">
            <Grid item xs={10}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Button variant="contained" color="primary" disableElevation component={NavLink} to="/">
                  <img src={brainImage} height="36" />
                  &nbsp;ΜΝΗΜΗ 2
                </Button>
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
                <MenuItem component={NavLink} to="/ammunition" selected={path === "/ammunition" ? true : false}>
                  <Whatshot />
                  &nbsp;Πυρομαχικά
                </MenuItem>
                <MenuItem onClick={this.handleClick.bind(this)}>
                  <FolderOpen />
                  &nbsp;Δεδομένα
                  <ArrowDropDown />
                </MenuItem>
                <Popper id="simple-popper" open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl}>
                  <Menu id="menu1" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this)}>
                    <MenuItem onClick={this.handleClose.bind(this)}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this)}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this)}>Logout</MenuItem>
                  </Menu>
                </Popper>
              </Grid>
            </Grid>
          
            <Grid item xs={2} alignContent="center" alignItems="center">
              
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Button variant="contained" color="primary" disableElevation>
                  <Settings />
                </Button>
                <Button variant="contained" color="primary" disableElevation>
                  <AccountCircle />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Header);
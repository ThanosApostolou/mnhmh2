import React from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button } from "@material-ui/core";
import { ArrowDropDown } from '@material-ui/icons';
import { NavLink, withRouter } from "react-router-dom";

import brainImage from "../resources/brain-chip-white.png";

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
          <Button variant="contained" color="primary" disableElevation component={NavLink} to="/">
            <img src={brainImage} height="36" />
            ΜΝΗΜΗ 2
          </Button>
          <MenuItem component={NavLink} to="/materialtabs" selected={path === "/materialtabs" ? true : false}>Καρτέλες Υλικών</MenuItem>
          <MenuItem component={NavLink} to="/debitnotes" selected={path === "/debitnotes" ? true : false}>Χρεωστικά</MenuItem>
          <MenuItem component={NavLink} to="/comparisons" selected={path === "/comparisons" ? true : false}>Συγρκιτικές</MenuItem>
          <MenuItem component={NavLink} to="/ammunition" selected={path === "/ammunition" ? true : false}>Πυρομαχικά</MenuItem>
          <MenuItem onClick={this.handleClick.bind(this)}>
            Δεδομένα
            <ArrowDropDown />
          </MenuItem>
          <Popper id="simple-popper" open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl}>
            <Menu id="menu1" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this)}>
              <MenuItem onClick={this.handleClose.bind(this)}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}>My account</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}>Logout</MenuItem>
            </Menu>
          </Popper>
          <MenuItem onClick={this.handleClick.bind(this)}>
            Διαχείριση Βάσης Δεδομένων
            <ArrowDropDown />
          </MenuItem>
          <Popper id="simple-popper" open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl}>
            <Menu id="menu2" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this)}>
              <MenuItem onClick={this.handleClose.bind(this)}>Αρχικοποίηση</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}>My account</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}>Logout</MenuItem>
            </Menu>
          </Popper>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Header);
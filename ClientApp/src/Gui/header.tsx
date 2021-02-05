import React from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Button } from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";

class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const path = this.props.location.pathname;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <MenuItem component={NavLink} to="/" selected={path === "/" ? true : false}>ΜΝΗΜΗ 2</MenuItem>
          <MenuItem component={NavLink} to="/materialtabs" selected={path === "/materialtabs" ? true : false}>Καρτέλες Υλικών</MenuItem>
          <MenuItem component={NavLink} to="/debitnotes" selected={path === "/debitnotes" ? true : false}>Χρεωστικά</MenuItem>
          <MenuItem component={NavLink} to="/comparisons" selected={path === "/comparisons" ? true : false}>Συγρκιτικές</MenuItem>
          <MenuItem component={NavLink} to="/ammunition" selected={path === "/ammunition" ? true : false}>Πυρομαχικά</MenuItem>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Header);
import React from "react";

import { AppBar, Toolbar, IconButton, MenuItem, Typography, Button } from "@material-ui/core";

export class HomePage extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}


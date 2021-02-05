import React from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }),
);

export class Footer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    
    render() {
      const classes = useStyles();
      return (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>adf</Toolbar>
        </AppBar>
      );
    }
}
import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";

export class MySnackbar extends React.Component<MySnackbarProps, any> {
    constructor(props: MySnackbarProps) {
        super(props);
    }

    render(): React.ReactNode {
        if (!this.props.open) {
            return null;
        }
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={this.props.open}
                autoHideDuration={2000}
                onClose={this.props.onClose}
                style={this.props.style}
            >
                <Alert variant="filled" severity={this.props.severity} onClose={this.props.onClose}>
                    {this.props.message}
                    {this.props.children}
                </Alert>
            </Snackbar>
        );
    }
}

export interface MySnackbarProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    message: string;
    severity: Color;
    open: boolean;
    onClose: () => void;
}

export function a11yProps(index: number): any {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
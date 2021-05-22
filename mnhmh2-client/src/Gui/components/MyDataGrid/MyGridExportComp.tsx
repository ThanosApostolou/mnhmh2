import React, { ReactNode } from "react";

import { Button, Popover, MenuItem } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { GridColDef, GridRowsProp } from "@material-ui/data-grid";

export class MyGridExportComp extends React.Component<MyGridExportCompProps, MyGridExportCompState> {
    state: Readonly<MyGridExportCompState>;

    constructor(props: MyGridExportCompProps) {
        super(props);
        this.state = {
            anchorMenuEl: null
        };
    }

    downloadJSON(): void {
        this.setState({anchorMenuEl: null});
        const columns = [];
        for (const column of this.props.columns) {
            columns.push(column.headerName);
        }
        const data = JSON.stringify({
            columns: columns,
            rows: this.props.rows
        }, null, 4);
        const blob = new Blob([data], { type: "application/json" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "data.json";
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(link.href);
            document.body.removeChild(link);
        }, 100);
    }

    downloadXLSX(): void {
        this.setState({anchorMenuEl: null});
        const list = ["a", "b"];
        const data = new Blob([list.join("\n")], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(data);
        link.download = "data.json";
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(link.href);
            document.body.removeChild(link);
        }, 100);
    }

    render(): ReactNode {

        return (
            <div>
                <Button color="primary" size="small" onClick={(event) => this.setState({anchorMenuEl: event.currentTarget})}>
                    <GetApp />
                    &nbsp;EXPORT
                </Button>
                <Popover anchorEl={this.state.anchorMenuEl} open={Boolean(this.state.anchorMenuEl)} onClose={() => this.setState({anchorMenuEl: null})}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <MenuItem onClick={() => this.downloadJSON()}>
                        &nbsp;Download as json
                    </MenuItem>
                    <MenuItem onClick={() => this.downloadXLSX()}>
                        &nbsp;Download as xlsx
                    </MenuItem>
                </Popover>
            </div>
        );
    }
}

export interface MyGridExportCompProps {
    columns?: GridColDef[];
    rows: GridRowsProp;
}
export interface MyGridExportCompState {
    anchorMenuEl: HTMLButtonElement;
}
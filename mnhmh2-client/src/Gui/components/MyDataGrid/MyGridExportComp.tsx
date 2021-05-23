import React, { ReactNode } from "react";
import XLSX from "xlsx";

import { Button, Popover, MenuItem } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { GridColDef, GridRowData, GridRowsProp } from "@material-ui/data-grid";

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
        const header = [];
        for (const column of this.props.columns) {
            if (!column.hide) {
                header.push(column.headerName);
            }
        }
        const rows = [];
        for (const row of this.props.rows) {
            const datarow = [];
            for (const [key, value] of Object.entries(row)) {
                for (const column of this.props.columns) {
                    if (column.field === key) {
                        if (!column.hide) {
                            datarow.push(value);
                        }
                        break;
                    }
                }
            }
            rows.push(datarow);
        }
        const data = JSON.stringify({
            header: header,
            rows: rows
        }, null, 4);
        const blob = new Blob([data], { type: "application/json" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "data.json";
        link.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(link.href);
        }, 100);
    }

    downloadXLSX(): void {
        this.setState({anchorMenuEl: null});
        const header = []; // header row
        const wscols = []; // columns style
        for (const column of this.props.columns) {
            if (!column.hide) {
                header.push(column.headerName);
                wscols.push({wpx: column.width});
            }
        }
        const datarows = [header]; // all data
        for (const row of this.props.rows) {
            const datarow = []; // single row
            for (const [key, value] of Object.entries(row)) {
                for (const column of this.props.columns) {
                    if (column.field === key) {
                        if (!column.hide) {
                            datarow.push(value);
                        }
                        break;
                    }
                }
            }
            datarows.push(datarow);
        }
        const ws = XLSX.utils.aoa_to_sheet(datarows);
        ws["!cols"] = wscols;
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, "data.xlsx");
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
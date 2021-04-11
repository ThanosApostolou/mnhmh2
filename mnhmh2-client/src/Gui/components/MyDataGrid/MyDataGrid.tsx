import React, { ReactNode } from "react";

import { Card, Tooltip } from "@material-ui/core";
import { GridColDef, DataGrid, GridRowsProp, GridPageChangeParams, GridRowSelectedParams, GridCellParams, GridDensity } from "@material-ui/data-grid";

import App from "../../../App";
import { MyGridToolbar } from "./MyGridToolbar";
import { MyGridFooter } from "./MyGridFooter";
import { MyGridErrorOverlay } from "./MyGridErrorOverlay";

export class MyDataGrid extends React.Component<DataCompProps, DataCompState> {
    state: Readonly<DataCompState>;
    defaultPageSize: number;
    defaultDensity: GridDensity;
    defaultColumns: GridColDef[];

    constructor(props: DataCompProps) {
        super(props);
        this.defaultPageSize = 10;
        this.defaultDensity = "standard";
        this.defaultColumns = this.props.columns;

        this.state = {
            selectedRow: null,
            pageSize: this.defaultPageSize,
            page: 0,
            density: this.defaultDensity,
            columns: this.props.columns,
            textOverflowEllipsis: App.app.state.settingsmanager.textOverflowEllipsis
        };
        const columns: GridColDef[] = [];
        for (const column of this.props.columns) {
            column.renderCell = (params: GridCellParams) => {
                return (
                    <Tooltip title={params.value}>
                        <p style={{height: "100%", whiteSpace: "nowrap", overflowY: "hidden",
                            overflowX: this.state.textOverflowEllipsis ? "hidden" : "auto",
                            textOverflow: this.state.textOverflowEllipsis ? "ellipsis" : "clip"}}
                        >
                            {params.value}
                        </p>
                    </Tooltip>
                );
            };
            columns.push(column);
        }
        this.setState({columns: columns});
    }

    initStorage(): void {
        if (!window.localStorage.getItem(this.props.storagePrefix)) {
            this.saveStorage(this.defaultPageSize, this.defaultDensity, this.defaultColumns);
        }
    }

    readStorage(): void {
        const storage: Storage = JSON.parse(window.localStorage.getItem(this.props.storagePrefix));
        this.setState({pageSize: storage.pageSize, density: storage.density, columns: storage.columns});
    }

    saveStorage(pageSize: number, density: GridDensity, columns: GridColDef[]): void {
        const storage: Storage = {
            pageSize: pageSize,
            density: density,
            columns: columns
        };
        window.localStorage.setItem(this.props.storagePrefix, JSON.stringify(storage));
    }

    onPageSizeChange(params: GridPageChangeParams): void {
        console.log(params);
        this.saveStorage(params.pageSize, this.state.density, this.state.columns);
        this.readStorage();
    }

    onRowSelected(params: GridRowSelectedParams): void {
        console.log("row selected: ", params);
        this.setState({selectedRow: params.data});
        if (this.props.onRowSelected) {
            this.props.onRowSelected(params);
        }
    }

    onAddClick(event: React.MouseEvent<HTMLButtonElement>): void {
        console.log("add clicked", event);
        if (this.props.onAddClick) {
            this.props.onAddClick(event);
        }
    }
    onEditClick(event: React.MouseEvent<HTMLButtonElement>): void {
        console.log("edit clicked", event);
        if (this.props.onEditClick) {
            this.props.onEditClick(event);
        }
    }
    onColumnsSave(columns: GridColDef[]): void {
        this.setState({columns: []});
        setTimeout(() => {
            this.setState({columns: columns});
        }, 0);
        this.saveStorage(this.state.pageSize, this.state.density, columns);
        this.readStorage();
    }
    onDensityChange(density: GridDensity): void {
        this.saveStorage(this.state.pageSize, density, this.state.columns);
        this.readStorage();
    }
    onRestoreClick(): void {
        window.localStorage.removeItem(this.props.storagePrefix);
        this.initStorage();
        this.readStorage();
    }
    onRefreshClick(event: React.MouseEvent<HTMLButtonElement>): void {
        this.props.cancelFetchData();
        this.props.fetchData();
        this.setState({page: 0});
        if (this.props.onRefreshClick) {
            this.props.onRefreshClick(event);
        }
    }
    onPrintClick(event: React.MouseEvent<HTMLButtonElement>): void {
        if (this.props.onPrintClick) {
            this.props.onPrintClick(event);
        }
    }

    componentDidMount(): void {
        this.initStorage();
        this.readStorage();
        this.props.fetchData();
    }

    componentWillUnmount(): void {
        this.props.cancelFetchData();
    }

    render(): ReactNode {
        return (
            <div style={{flexGrow: 1}}>
                <Card elevation={6} style={{height: "100%", width: "100%"}}>
                    <DataGrid rows={this.props.rows} columns={this.state.columns} rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]} pagination showColumnRightBorder={true} showCellRightBorder={true}
                        pageSize={this.state.pageSize}
                        columnBuffer={10} rowHeight={64}
                        components={{
                            Footer: MyGridFooter,
                            Toolbar: MyGridToolbar,
                            ErrorOverlay: MyGridErrorOverlay
                        }}
                        componentsProps={{
                            toolbar: {
                                selectedRow: this.state.selectedRow,
                                density: this.state.density,
                                columns: this.state.columns,
                                onAddClick: this.onAddClick.bind(this),
                                onEditClick: this.onEditClick.bind(this),
                                onColumnsSave: this.onColumnsSave.bind(this),
                                onDensityChange: this.onDensityChange.bind(this),
                                onRestoreClick: this.onRestoreClick.bind(this),
                                onRefreshClick: this.onRefreshClick.bind(this),
                                onPrintClick: this.onPrintClick.bind(this),
                            }
                        }}
                        onPageSizeChange={this.onPageSizeChange.bind(this)}
                        onRowSelected={this.onRowSelected.bind(this)}
                        loading={this.props.loading}
                        error={this.props.error}
                        page={this.state.page}
                        density={this.state.density}                    />
                </Card>
            </div>
        );
    }
}

interface Storage {
    pageSize: number;
    density: GridDensity;
    columns: GridColDef[];
}

export interface DataCompState {
    selectedRow: any;
    pageSize: number;
    page: number;
    density: GridDensity;
    columns: GridColDef[];
    textOverflowEllipsis: boolean;
}

export interface DataCompProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    loading: boolean;
    error: any;
    storagePrefix: string;
    fetchData: () => void;
    cancelFetchData: () => void;
    onRowSelected?: (params: GridRowSelectedParams) => void;
    onAddClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onEditClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onRefreshClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onPrintClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
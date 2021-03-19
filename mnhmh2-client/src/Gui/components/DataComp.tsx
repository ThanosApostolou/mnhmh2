import React, { ReactNode } from "react";

import { Card } from "@material-ui/core";
import { GridColDef, DataGrid, GridRowsProp, GridPageChangeParams, GridRowSelectedParams } from "@material-ui/data-grid";

import { MyGridToolbar } from "./MyGridToolbar";
import { MyGridFooter } from "./MyGridFooter";
import { MyGridErrorOverlay } from "./MyGridErrorOverlay";

export class DataComp extends React.Component<DataCompProps, DataCompState> {
    state: Readonly<DataCompState>;

    constructor(props: DataCompProps) {
        super(props);
        this.state = {
            selectedRow: null,
            pageSize: 10,
            page: 0
        };
        console.log("error: ", this.props.error);
        console.log("storage", JSON.parse(window.localStorage.getItem(this.props.storagePrefix)));
    }

    readStorage(): void {
        const storage: Storage = JSON.parse(window.localStorage.getItem(this.props.storagePrefix));
        this.setState({pageSize: storage.pageSize});
    }

    saveStorage(pageSize: number): void {
        const storage: Storage = {
            pageSize: pageSize
        };
        window.localStorage.setItem(this.props.storagePrefix, JSON.stringify(storage));
    }

    onPageSizeChange(params: GridPageChangeParams): void {
        console.log(params);
        this.saveStorage(params.pageSize);
        //this.readStorage();
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
    onRefreshClick(event: React.MouseEvent<HTMLButtonElement>): void {
        console.log("refresh clicked", event);
        this.props.cancelFetchData();
        this.props.fetchData();
        this.setState({page: 0});
        if (this.props.onRefreshClick) {
            this.props.onRefreshClick(event);
        }
    }
    onPrintClick(event: React.MouseEvent<HTMLButtonElement>): void {
        console.log("print clicked", event);
        if (this.props.onPrintClick) {
            this.props.onPrintClick(event);
        }
    }

    componentDidMount(): void {
        if (!window.localStorage.getItem(this.props.storagePrefix)) {
            this.saveStorage(this.state.pageSize);
        }
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
                    <DataGrid rows={this.props.rows} columns={this.props.columns} rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]} pagination showColumnRightBorder={true} showCellRightBorder={true}
                        pageSize={this.state.pageSize}
                        components={{
                            Footer: MyGridFooter,
                            Toolbar: MyGridToolbar,
                            ErrorOverlay: MyGridErrorOverlay
                        }}
                        componentsProps={{
                            toolbar: {
                                selectedRow: this.state.selectedRow,
                                onAddClick: this.onAddClick.bind(this),
                                onEditClick: this.onEditClick.bind(this),
                                onRefreshClick: this.onRefreshClick.bind(this),
                                onPrintClick: this.onPrintClick.bind(this),
                            }
                        }}
                        onPageSizeChange={this.onPageSizeChange.bind(this)}
                        onRowSelected={this.onRowSelected.bind(this)}
                        loading={this.props.loading}
                        error={this.props.error}
                        page={this.state.page}
                    />
                </Card>
            </div>
        );
    }
}

interface Storage {
    pageSize: number;
}

export interface DataCompState {
    selectedRow: any;
    pageSize: number;
    page: number;
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
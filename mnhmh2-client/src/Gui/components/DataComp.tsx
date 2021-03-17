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
            selectedRow: null
        };
        console.log("error: ", this.props.error);
    }

    pageSizeChanged(params: GridPageChangeParams): void {
        console.log(params);
    }

    rowSelected(params: GridRowSelectedParams): void {
        console.log("row selected: ", params);
        this.setState({selectedRow: params.data});
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
                        onPageSizeChange={this.pageSizeChanged.bind(this)}
                        onRowSelected={this.rowSelected.bind(this)}
                        loading={this.props.loading}
                        error={this.props.error}
                    />
                </Card>
            </div>
        );
    }
}

export interface DataCompState {
    selectedRow: any;
}

export interface DataCompProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    loading: boolean;
    error: any;
    fetchData: () => void;
    cancelFetchData: () => void;
    onAddClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onEditClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onRefreshClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onPrintClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
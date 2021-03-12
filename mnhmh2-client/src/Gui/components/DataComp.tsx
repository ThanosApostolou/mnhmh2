import React, { ReactNode } from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button, Card } from "@material-ui/core";

import { GridColDef, DataGrid, GridFooter, GridToolbar, GridRowsProp, GridPageChangeParams, GridRowSelectedParams } from "@material-ui/data-grid";
import { MyGridToolbar } from "./MyGridToolbar";
import { MyGridFooter } from "./MyGridFooter";
import { CancelTokenSource } from "axios";
import { ApiConsumer } from "../../ApiConsumer";

export class DataComp extends React.Component<DataCompProps, DataCompState> {
    state: DataCompState;
    cancelTokenSource: CancelTokenSource;

    constructor(props: DataCompProps) {
        super(props);
        this.state = {
            data: null,
            rows: [],
            selectedRow: null
        };
    }

    pageSizeChanged(params: GridPageChangeParams): void {
        console.log(params);
    }

    rowSelected(params: GridRowSelectedParams): void {
        console.log(params);

    }

    componentDidMount(): void {
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.props.getData(this.cancelTokenSource).then((data: any) => {
            this.setState({data: data});
            this.setState({rows: this.props.getRows(this.state.data)});
        }).catch((error) => {
            this.setState({data: null});
            this.setState({rows: []});
        });
    }

    componentWillUnmount(): void {
        this.cancelTokenSource.cancel("commponent will unmount");
    }

    render(): ReactNode {

        return (
            <Card elevation={6} style={{height: "100%", width: "100%"}}>
                <DataGrid rows={this.state.rows} columns={this.props.columns} rowsPerPageOptions={[10, 15, 20, 25, 50, 100]} pagination showColumnRightBorder={true} showCellRightBorder={true}
                    components={{
                        Toolbar: MyGridToolbar,
                        Footer: MyGridFooter
                    }}
                    onPageSizeChange={this.pageSizeChanged.bind(this)}
                    onRowSelected={this.rowSelected.bind(this)}
                    loading={this.state.data == null}
                />
            </Card>
        );
    }
}

export interface DataCompState {
    data: any[];
    rows: GridRowsProp;
    selectedRow: any;
}

export interface DataCompProps {
    columns: GridColDef[];
    getData: (cancelTokenSource: CancelTokenSource) => Promise<any>;
    getRows: (data: any) => GridRowsProp;
}
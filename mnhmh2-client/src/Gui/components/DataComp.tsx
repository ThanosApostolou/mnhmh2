import React, { ReactNode } from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button, Card } from "@material-ui/core";

import { GridColDef, DataGrid, GridRowsProp, GridPageChangeParams, GridRowSelectedParams } from "@material-ui/data-grid";
import { MyGridToolbar } from "./MyGridToolbar";
import { MyGridFooter } from "./MyGridFooter";
import { CancelTokenSource } from "axios";
import { ApiConsumer } from "../../ApiConsumer";

export class DataComp extends React.Component<DataCompProps, DataCompState> {
    state: Readonly<DataCompState>;
    cancelTokenSource: CancelTokenSource;

    constructor(props: DataCompProps) {
        super(props);
        this.state = {
            data: null,
            rows: [],
            loading: true,
            selectedRow: null
        };
    }

    pageSizeChanged(params: GridPageChangeParams): void {
        console.log(params);
    }

    rowSelected(params: GridRowSelectedParams): void {
        console.log(params);

    }

    fetchData(): void {
        console.log("fetch data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.setState({rows: []});
        this.setState({loading : true});
        this.props.getData(this.cancelTokenSource).then((data: any) => {
            this.setState({data: data});
            this.setState({rows: this.props.getRows(this.state.data)});
        }).catch((error) => {
            this.setState({data: null});
            this.setState({rows: []});
        }).finally(() => {
            this.setState({loading : false});
        });
    }

    cancelFetchData(): void {
        this.cancelTokenSource.cancel("commponent will unmount");
    }

    refreshClicked(): void {
        console.log("refresh clicked");
        this.cancelFetchData();
        this.fetchData();
    }

    componentDidMount(): void {
        this.fetchData();
    }

    componentWillUnmount(): void {
        this.cancelFetchData();
    }

    render(): ReactNode {
        return (
            <Card elevation={6} style={{height: "100%", width: "100%"}}>
                <DataGrid rows={this.state.rows} columns={this.props.columns} rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]} pagination showColumnRightBorder={true} showCellRightBorder={true}
                    components={{
                        Footer: MyGridFooter,
                        Toolbar: MyGridToolbar
                    }}
                    componentsProps={{
                        toolbar: {
                            onRefreshClick: this.refreshClicked.bind(this)
                        }
                    }}
                    onPageSizeChange={this.pageSizeChanged.bind(this)}
                    onRowSelected={this.rowSelected.bind(this)}
                    loading={this.state.loading}
                />
            </Card>
        );
    }
}

export interface DataCompState {
    data: any[];
    rows: GridRowsProp;
    loading: boolean;
    selectedRow: any;
}

export interface DataCompProps {
    columns: GridColDef[];
    getData: (cancelTokenSource: CancelTokenSource) => Promise<any>;
    getRows: (data: any) => GridRowsProp;
}
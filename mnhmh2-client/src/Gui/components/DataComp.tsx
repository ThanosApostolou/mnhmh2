import React, { ReactNode } from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button, Card } from "@material-ui/core";

import { GridColDef, DataGrid, GridFooter, GridToolbar, GridRowsProp, GridPageChangeParams, GridRowSelectedParams } from "@material-ui/data-grid";
import { MyGridToolbar } from "./MyGridToolbar";
import { MyGridFooter } from "./MyGridFooter";

export class DataComp extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedRow: null
        };
    }

    pageSizeChanged(params: GridPageChangeParams) {
        console.log(params);
    }

    rowSelected(params: GridRowSelectedParams) {
        console.log(params);

    }
    
    render(): ReactNode {
        
        return (                
            <Card elevation={6} style={{height: "100%", width: "100%"}}>
                <DataGrid rows={this.props.rows} columns={this.props.columns} rowsPerPageOptions={[10, 25, 50, 100]} pagination showColumnRightBorder={true} showCellRightBorder={true}
                    components={{
                        Toolbar: MyGridToolbar,
                        Footer: MyGridFooter
                    }}
                    onPageSizeChange={this.pageSizeChanged.bind(this)}
                    onRowSelected={this.rowSelected.bind(this)}
                />
            </Card>
        );
    }
}
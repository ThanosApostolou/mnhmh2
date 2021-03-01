import React, { ReactNode } from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button, Card } from "@material-ui/core";

import { ColDef, DataGrid, GridFooter, GridToolbar, RowsProp } from "@material-ui/data-grid";

export class DataComp extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    
    render(): ReactNode {
        
        return (                
            <Card elevation={6} style={{height: "100%", maxWidth: "100%"}}>
                <DataGrid autoHeight rows={this.props.rows} columns={this.props.columns} rowsPerPageOptions={[10, 25, 50, 100]} pagination
                    components={{
                        Toolbar: GridToolbar,
                        Footer: GridFooter
                    }}
                />
            </Card>
        );
    }
}
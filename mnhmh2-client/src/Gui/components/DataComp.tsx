import React, { ReactNode } from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button, Card } from "@material-ui/core";

import { ColDef, DataGrid, GridToolbar, RowsProp } from "@material-ui/data-grid";

export class DataComp extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    
    render(): ReactNode {
        
        return (                
            <Card elevation={6} style={{maxWidth: "100%", minWidth: "500px"}}>
                <DataGrid autoHeight rows={this.props.rows} columns={this.props.columns} rowsPerPageOptions={[10, 25, 50, 100]} pagination
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Card>
        );
    }
}
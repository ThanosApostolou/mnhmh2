import React, { ReactNode } from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button, Card } from "@material-ui/core";

import { GridColDef, DataGrid, GridFooter, GridToolbar, GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton, GridDensitySelector, GridPagination } from "@material-ui/data-grid";

export class MyGridToolbar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    
    render() {
        
        return (                
            <GridToolbarContainer>
                <GridColumnsToolbarButton />
                <GridFilterToolbarButton />
                <GridDensitySelector />
                <GridPagination />
            </GridToolbarContainer>
        );
    }
}
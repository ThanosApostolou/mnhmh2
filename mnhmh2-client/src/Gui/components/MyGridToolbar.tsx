import React, { ReactNode } from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button, Card } from "@material-ui/core";

import { ColDef, DataGrid, GridFooter, GridToolbar, GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton, GridDensitySelector, GridPagination } from "@material-ui/data-grid";

export class MyGridToolbar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    
    render(): any {
        
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
import React, { ReactNode } from "react";

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Popper, Typography, Button, Card } from "@material-ui/core";

import { GridColDef, DataGrid, GridFooter, GridFooterContainer, GridColumnsToolbarButton, GridFilterToolbarButton, GridDensitySelector, GridPagination } from "@material-ui/data-grid";

export class MyGridFooter extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    
    render() {
        
        return (                
            <GridFooterContainer>
                <GridPagination />
            </GridFooterContainer>
        );
    }
}
import React, { ReactNode } from "react";

import { GridFooterContainer, GridFooterContainerProps, GridPagination } from "@material-ui/data-grid";

export class MyGridFooter extends React.Component<GridFooterContainerProps, any> {
    constructor(props: GridFooterContainerProps) {
        super(props);
    }

    render(): ReactNode {

        return (
            <GridFooterContainer>
                <GridPagination />
            </GridFooterContainer>
        );
    }
}
import React, { ReactNode } from "react";
import { AxiosResponse } from "axios";
import { CircularProgress, Container } from "@material-ui/core";

import App from "../../App";
import { DataComp } from "../components/DataComp";
import { ColDef, RowsProp } from "@material-ui/data-grid";
import { MaterialTab } from "../../entities/MaterialTab";

export class MaterialTabsPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        MaterialTab.listFromApi().then((materialtabs) => {
            this.setState({data: materialtabs});
        }).catch((error) => {
            this.setState({data: null});
        });
    }

    render(): ReactNode {
        let resultdom = null;
        
        const rows: RowsProp = [
            { id: 1, col1: "Hello", col2: "World" },
            { id: 2, col1: "XGrid", col2: "is Awesome" },
            { id: 3, col1: "Material-UI", col2: "is Amazing" },
            { id: 4, col1: "Hello", col2: "World" },
            { id: 5, col1: "XGrid", col2: "is Awesome" },
            { id: 6, col1: "Material-UI", col2: "is Amazing" }
        ];
        const columns: ColDef[] = [
            { field: "col1", headerName: "Column 1", flex: 1 },
            { field: "col2", headerName: "Column 2", flex: 1 },
            { field: "col3", headerName: "Column 3", flex: 1 },
        ];

        if (this.state.data === null) {
            resultdom = 
                <Container maxWidth={false} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress />
                </Container>
            ;
        } else {
            resultdom =
                <DataComp rows={rows} columns={columns} />;
                    <div>
                <code>
                            {JSON.stringify(this.state.data)}
                        </code>
            </div>
            ;
        }
        return (
            <div>
                { resultdom }
            </div>
        );
    }
}
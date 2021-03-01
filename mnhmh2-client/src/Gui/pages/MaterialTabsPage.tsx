import React, { ReactNode } from "react";
import { CircularProgress, Container } from "@material-ui/core";

import { DataComp } from "../components/DataComp";
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

        if (this.state.data === null) {
            resultdom = 
                <Container maxWidth={false} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress />
                </Container>
            ;
        } else {
            resultdom =
                <div>
                    <DataComp rows={MaterialTab.getRows(this.state.data)} columns={MaterialTab.getColumns()} />
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
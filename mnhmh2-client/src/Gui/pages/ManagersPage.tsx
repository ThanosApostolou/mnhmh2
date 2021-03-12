import React, { ReactNode } from "react";
import { CircularProgress, Container, Grid } from "@material-ui/core";

import { DataComp } from "../components/DataComp";
import { Manager } from "../../entities/Manager";

export class ManagersPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    render(): ReactNode {
        return (
            <Grid container direction="column" style={{height: "100%"}}>
                <DataComp getData={Manager.listFromApi} getRows={Manager.getRows} columns={Manager.getColumns()} />
            </Grid>
        );
    }
}
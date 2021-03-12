import React, { ReactNode } from "react";
import { CircularProgress, Container, Grid } from "@material-ui/core";

import { DataComp } from "../components/DataComp";
import { Group } from "../../entities/Group";

export class GroupsPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    render(): ReactNode {
        const resultdom = null;

        /*if (this.state.data === null) {
            resultdom =
                <Grid container direction="column" alignContent="center" alignItems="center" justify="center" style={{height: "100%"}}>
                    <CircularProgress />
                </Grid>
            ;
        } else {
            resultdom =
            <Grid container direction="column" style={{height: "100%"}}>
                <DataComp rows={Group.getRows(this.state.data)} columns={Group.getColumns()} />
            </Grid>
            ;
        }
        */
        return (
            <Grid container direction="column" style={{height: "100%"}}>
                <DataComp getData={Group.listFromApi} getRows={Group.getRows} columns={Group.getColumns()} />
            </Grid>
        );
    }
}
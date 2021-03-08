import React, { ReactNode } from "react";
import { CircularProgress, Container, Grid } from "@material-ui/core";

import { DataComp } from "../components/DataComp";
import { AmmunitionStore } from "../../entities/AmmunitionStore";

export class AmmunitionStoresPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        AmmunitionStore.listFromApi().then((stores) => {
            this.setState({data: stores});
        }).catch((error) => {
            this.setState({data: null});
        });
    }

    render(): ReactNode {
        let resultdom = null;

        if (this.state.data === null) {
            resultdom =                 
                <Grid container direction="column" alignContent="center" alignItems="center" justify="center" style={{height: "100%"}}>
                    <CircularProgress />
                </Grid>
            ;
        } else {
            resultdom =
            <Grid container direction="column" style={{height: "100%"}}>
                <DataComp rows={AmmunitionStore.getRows(this.state.data)} columns={AmmunitionStore.getColumns()} />
            </Grid>
            ;
        }
        return (resultdom);
    }
}
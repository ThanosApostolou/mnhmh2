import React, { ReactNode } from "react";
import { CircularProgress, Container, Grid } from "@material-ui/core";

import { DataComp } from "../components/DataComp";
import { AmmunitionPortion } from "../../entities/AmmunitionPortion";

export class AmmunitionPortionsPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount(): void {
        AmmunitionPortion.listFromApi().then((stores) => {
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
                <DataComp rows={AmmunitionPortion.getRows(this.state.data)} columns={AmmunitionPortion.getColumns()} />
            </Grid>
            ;
        }
        return (resultdom);
    }
}
import { DistributionCharge } from "../../entities/DistributionCharge";
import React, { ReactNode } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { DataComp } from "../components/DataComp";

export class DistributionChargesPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        DistributionCharge.listFromApi().then((distributioncharges) => {
            this.setState({data: distributioncharges});
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
                <DataComp rows={DistributionCharge.getRows(this.state.data)} columns={DistributionCharge.getColumns()} />
            </Grid>
            ;
        }
        return (resultdom);
    }
}
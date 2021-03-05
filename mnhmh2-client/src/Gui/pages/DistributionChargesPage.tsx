import { DistributionCharge } from "../../entities/DistributionCharge";
import React, { ReactNode } from "react";
import { CircularProgress, Container } from "@material-ui/core";
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
                <Container maxWidth={false} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress />
                </Container>
            ;
        } else {
            resultdom =
                <div>
                    <DataComp rows={DistributionCharge.getRows(this.state.data)} columns={DistributionCharge.getColumns()} />
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
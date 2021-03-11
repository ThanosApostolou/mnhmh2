import React, { ReactNode } from "react";
import { CircularProgress, Container, Grid } from "@material-ui/core";

import { DataComp } from "../components/DataComp";
import { ImportsExportsTbl } from "../../entities/ImportsExportsTbl";

export class ImportsExportsTblPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount(): void {
        ImportsExportsTbl.listFromApi().then((ietbls) => {
            this.setState({data: ietbls});
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
                <DataComp rows={ImportsExportsTbl.getRows(this.state.data)} columns={ImportsExportsTbl.getColumns()} />
            </Grid>
            ;
        }
        return (resultdom);
    }
}
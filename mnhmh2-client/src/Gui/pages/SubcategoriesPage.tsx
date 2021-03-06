import React, { ReactNode } from "react";
import { CircularProgress, Container, Grid } from "@material-ui/core";

import { DataComp } from "../components/DataComp";
import { Subcategory } from "../../entities/Subcategory";

export class SubcategoriesPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        Subcategory.listFromApi().then((groups) => {
            this.setState({data: groups});
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
                <DataComp rows={Subcategory.getRows(this.state.data)} columns={Subcategory.getColumns()} />
            </Grid>
            ;
        }
        return (resultdom);
    }
}
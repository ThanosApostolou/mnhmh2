import { DirectMaterialBorrower } from "../../entities/DirectMaterialBorrower";
import React, { ReactNode } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { DataComp } from "../components/DataComp";

export class DirectMaterialBorrowersPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        DirectMaterialBorrower.listFromApi().then((dmbs) => {
            this.setState({data: dmbs});
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
                <DataComp rows={DirectMaterialBorrower.getRows(this.state.data)} columns={DirectMaterialBorrower.getColumns()} />
            </Grid>
            ;
        }
        return (resultdom);
    }
}
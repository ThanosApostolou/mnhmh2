import { DirectMaterialBorrower } from "../../entities/DirectMaterialBorrower";
import React, { ReactNode } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { DataComp } from "../components/DataComp";
import { ApiConsumer } from "../../ApiConsumer";
import { CancelTokenSource } from "axios";


export class DirectMaterialBorrowersPage extends React.Component<any, any> {
    cancelTokenSource: CancelTokenSource;

    constructor(props: any) {
        super(props);
        this.state = {
            data: null
        };
        this.cancelTokenSource = null;
    }
    componentDidMount(): void {
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        DirectMaterialBorrower.listFromApi(this.cancelTokenSource).then((dmbs) => {
            this.setState({data: dmbs});
        }).catch((error) => {
            if (!ApiConsumer.isCancel(error)) {
                this.setState({data: null});
            }
        });
    }

    componentWillUnmount(): void {
        this.cancelTokenSource.cancel("commponent will unmount");
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
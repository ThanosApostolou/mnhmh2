import React, { ReactNode } from "react";
import { Card, CardContent, AccordionSummary, TextField, Tooltip, IconButton, Grid } from "@material-ui/core";
import { ExpandMore, Search } from "@material-ui/icons";

import { DataComp } from "../components/DataComp";
import { Manager } from "../../entities/Manager";
import { CancelTokenSource } from "axios";
import { ApiConsumer } from "../../ApiConsumer";
import { GridRowsProp } from "@material-ui/data-grid";

export class ManagersPage extends React.Component<null, ManagersPageState> {
    state: Readonly<ManagersPageState>;
    cancelTokenSource: CancelTokenSource;

    constructor(props: null) {
        super(props);
        this.state = {
            data: null,
            rows: [],
            loading: true,
            search: null,
            error: null
        };
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
    }

    fetchData(): void {
        console.log("fetch data");
        this.cancelFetchData();
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.setState({rows: []});
        this.setState({loading : true});
        Manager.listFromApi(this.cancelTokenSource).then((data: any) => {
            this.setState({data: data});
            this.setState({rows: Manager.getRows(this.state.data)});
        }).catch((error) => {
            this.setState({data: null});
            this.setState({rows: []});
            this.setState({error: error});
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    cancelFetchData(): void {
        this.cancelTokenSource.cancel("cancel fetching data");
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.fetchData();
    }

    render(): ReactNode {
        return (
            <Grid container direction="column" style={{height: "100%"}}>
                <Card elevation={6} style={{width: "100%"}}>
                    <CardContent>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
                                <TextField size="small" InputLabelProps={{ shrink: true }} label="search" />
                                <Tooltip title="Search" aria-label="search">
                                    <IconButton size="small" type="submit" value="Submit">
                                        <Search />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
                <DataComp fetchData={this.fetchData.bind(this)} cancelFetchData={this.cancelFetchData.bind(this)} error={this.state.error} rows={this.state.rows} loading={this.state.loading} columns={Manager.getColumns()} />
            </Grid>
        );
    }
}

export interface ManagersPageState {
    data: Manager[];
    rows: GridRowsProp;
    loading: boolean;
    search: string;
    error: any;
}
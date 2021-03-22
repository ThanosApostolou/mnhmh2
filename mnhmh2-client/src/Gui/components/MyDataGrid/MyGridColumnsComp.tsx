import React, { ReactNode } from "react";

import { Button, Popover, Grid, Card, CardContent, CardActions, IconButton, Switch, TextField } from "@material-ui/core";
import { ViewColumn, ArrowUpward, ArrowDownward } from "@material-ui/icons";
import { GridColDef } from "@material-ui/data-grid";

export class MyGridColumnsComp extends React.Component<MyGridColumnsCompProps, MyGridColumnsCompState> {
    state: Readonly<MyGridColumnsCompState>;

    constructor(props: MyGridColumnsCompProps) {
        super(props);
        this.state = {
            anchorMenuEl: null,
            columns: this.props.columns,
        };
    }

    onColumnsSave(): void {
        this.setState({anchorMenuEl: null, columns: this.props.columns});
    }

    onVisibilityChange(index: number): void {
        const columns = this.state.columns;
        columns[index].hide = !columns[index].hide;
        this.setState({columns: columns});
    }

    render(): ReactNode {
        const rowItems = [];
        for (const [index, column] of this.state.columns.entries()) {
            console.log("column", column);
            rowItems.push(
                <Grid container direction="row" justify="space-between" alignContent="center" alignItems="center">
                    <Grid item>
                        <Grid container direction="row" alignContent="center" alignItems="center">
                            <IconButton edge="start" size="small" aria-label="up" disabled={index <= 0}>
                                <ArrowUpward />
                            </IconButton>
                            <IconButton edge="start" size="small" aria-label="down" disabled={index >=  this.state.columns.length-1}>
                                <ArrowDownward />
                            </IconButton>
                            <Switch color="primary" checked={!column.hide} onChange={() => this.onVisibilityChange(index)} />
                            <b style={{margin: "10px 10px"}}>
                                {column.headerName}
                            </b>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justify="flex-end" alignContent="center" alignItems="center">
                            <TextField type="number" defaultValue={column.width} />
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        return (
            <div>
                <Button color="primary" size="small" onClick={(event) => this.setState({anchorMenuEl: event.currentTarget})}>
                    <ViewColumn />
                    &nbsp;ΣΤΗΛΕΣ
                </Button>
                <Popover anchorEl={this.state.anchorMenuEl} open={Boolean(this.state.anchorMenuEl)} onClose={() => this.setState({anchorMenuEl: null})}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                {rowItems}
                            </Grid>
                        </CardContent>
                        <CardActions>

                        </CardActions>

                    </Card>
                </Popover>
            </div>
        );
    }
}

export interface MyGridColumnsCompProps {
    columns: GridColDef[];
    onColumnsSave?: (columns: GridColDef[]) => void;
    onColumnsCancel?: () => void;
}
export interface MyGridColumnsCompState {
    anchorMenuEl: HTMLButtonElement;
    columns: GridColDef[];
}
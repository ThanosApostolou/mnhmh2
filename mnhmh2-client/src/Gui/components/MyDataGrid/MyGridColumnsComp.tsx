import React, { ReactNode } from "react";

import { Button, Popover, Grid, Card, CardContent, CardActions, IconButton, Switch, TextField } from "@material-ui/core";
import { ViewColumn, ArrowUpward, ArrowDownward } from "@material-ui/icons";
import { GridColDef } from "@material-ui/data-grid";

export class MyGridColumnsComp extends React.Component<MyGridColumnsCompProps, MyGridColumnsCompState> {
    state: Readonly<MyGridColumnsCompState>;
    initialColumns: GridColDef[];

    constructor(props: MyGridColumnsCompProps) {
        super(props);
        this.initialColumns = JSON.parse(JSON.stringify(this.props.columns));
        this.state = {
            anchorMenuEl: null,
            columns: this.initialColumns,
        };
    }

    onColumnsCancel(): void {
        this.setState((state) => ({
            columns: this.initialColumns,
            anchorMenuEl: null
        }));
        if (this.props.onColumnsCancel) {
            this.props.onColumnsCancel();
        }
    }

    onColumnsSave(): void {
        this.setState({anchorMenuEl: null, columns: this.initialColumns});

        this.props.onColumnsChange(this.state.columns);
        console.log(this.state.columns);
    }

    onPositionMoveStart(index: number): void {
        const columns = this.state.columns;
        if (index > 0) {
            const temp = columns[index-1];
            columns[index-1] = columns[index];
            columns[index] = temp;
        }
        this.setState({columns: columns});
    }
    onPositionMoveBack(index: number): void {
        const columns = this.state.columns;
        if (index < columns.length-1) {
            const temp = columns[index+1];
            columns[index+1] = columns[index];
            columns[index] = temp;
        }
        this.setState({columns: columns});
    }
    onVisibilityChange(index: number): void {
        const columns = this.state.columns;
        columns[index].hide = !columns[index].hide;
        this.setState({columns: columns});
    }
    onWidthChange(event, index: number): void {
        const columns = this.state.columns;
        columns[index].width = parseInt(event.target.value);
        this.setState({columns: columns});
    }
    onColumnsReset(): void {
        //TODO
    }

    componentDidMount(): void {
        this.initialColumns = JSON.parse(JSON.stringify(this.props.columns));
        this.setState({columns: this.initialColumns});
    }

    render(): ReactNode {
        const rowItems = [];
        for (const [index, column] of this.state.columns.entries()) {
            rowItems.push(
                <Grid container direction="row" justify="space-between" alignContent="center" alignItems="center">
                    <Grid item>
                        <Grid container direction="row" alignContent="center" alignItems="center">
                            <IconButton edge="start" size="small" aria-label="up" disabled={index <= 0} onClick={() => this.onPositionMoveStart(index)}>
                                <ArrowUpward />
                            </IconButton>
                            <IconButton edge="start" size="small" aria-label="down" disabled={index >=  this.state.columns.length-1} onClick={() => this.onPositionMoveBack(index)}>
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
                            <TextField type="number" defaultValue={column.width} value={column.width} onChange={(event) => this.onWidthChange(event, index)} />
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
                <Popover anchorEl={this.state.anchorMenuEl} open={Boolean(this.state.anchorMenuEl)} onClose={this.onColumnsCancel.bind(this)}
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
                        <CardContent style={{maxHeight: "600px", overflow: "auto"}}>
                            <Grid container direction="column">
                                {rowItems}
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container direction="row" justify="flex-end" alignContent="center" alignItems="center">
                                <Button onClick={this.onColumnsCancel.bind(this)}>
                                    Ακύρωση
                                </Button>
                                <Button onClick={this.onColumnsReset.bind(this)}>
                                    Επαναφορά
                                </Button>
                                <Button onClick={this.onColumnsSave.bind(this)}>
                                    Εφαρμογή
                                </Button>
                            </Grid>
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
    onColumnsChange: (columns: GridColDef[]) => void;
}
export interface MyGridColumnsCompState {
    anchorMenuEl: HTMLButtonElement;
    columns: GridColDef[];
}
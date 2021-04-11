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
            columns: JSON.parse(JSON.stringify(this.props.columns)),
        };
    }

    onColumnsCancel(): void {
        console.log("state", this.state.columns);
        console.log("props", this.props.columns);
        this.setState(() => ({
            columns: JSON.parse(JSON.stringify(this.props.columns)),
            anchorMenuEl: null
        }));
    }

    onColumnsSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({anchorMenuEl: null});

        this.props.onColumnsSave(this.state.columns);
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
    onWidthChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number): void {
        const columns = this.state.columns;
        columns[index].width = parseInt(event.target.value);
        this.setState({columns: columns});
    }

    componentDidMount(): void {
        this.setState({ columns: JSON.parse(JSON.stringify(this.props.columns)) });
    }

    componentDidUpdate(prevProps: MyGridColumnsCompProps): void {
        if (JSON.stringify(this.props.columns) !== JSON.stringify(prevProps.columns)) {
            this.setState({ columns: JSON.parse(JSON.stringify(this.props.columns)) });
        }
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
                        <form onSubmit={this.onColumnsSave.bind(this)}>
                            <CardContent style={{maxHeight: "600px", overflow: "auto"}}>
                                <Grid container direction="column">
                                    {rowItems}
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Grid container direction="row" justify="flex-end" alignContent="center" alignItems="center">
                                    <Button variant="contained" style={{margin: "4px"}} onClick={this.onColumnsCancel.bind(this)}>
                                        Ακύρωση
                                    </Button>
                                    <Button variant="contained" style={{margin: "4px"}} color="primary" autoFocus type="submit">
                                        Εφαρμογή
                                    </Button>
                                </Grid>
                            </CardActions>
                        </form>

                    </Card>
                </Popover>
            </div>
        );
    }
}

export interface MyGridColumnsCompProps {
    columns: GridColDef[];
    onColumnsSave: (columns: GridColDef[]) => void;
}
export interface MyGridColumnsCompState {
    anchorMenuEl: HTMLButtonElement;
    columns: GridColDef[];
}
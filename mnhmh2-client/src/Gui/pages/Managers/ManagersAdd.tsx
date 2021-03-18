import React, { ReactNode } from "react";
import { Card, CardContent, Button, TextField, Tooltip, IconButton, Grid, Drawer, CardHeader, CardActions } from "@material-ui/core";
import { ExpandMore, Search } from "@material-ui/icons";
import { Manager } from "../../../entities/Manager";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";

export class ManagersAdd extends React.Component<ManagersAddProps, any> {
    cancelTokenSource: CancelTokenSource;
    Name: string;
    Rank: string;
    Position: string;

    constructor(props: ManagersAddProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.Name = "";
        this.Rank = "";
        this.Position = "";
    }

    onAddSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const manager = Manager.fromObject({
            Id: null,
            Name: this.Name,
            Rank: this.Rank,
            Position: this.Position
        });
        Manager.toApi(this.cancelTokenSource, manager);
        if (this.props.onAddSave) {
            this.props.onAddSave();
        }
    }
    onAddCancel(): void {
        this.cancelTokenSource.cancel("cancel sending data");
        if (this.props.onAddCancel) {
            this.props.onAddCancel();
        }
    }

    render(): ReactNode {
        if (!this.props.openAddDrawer) {
            return null;
        } else {
            return (
                <Drawer anchor="right" open={this.props.openAddDrawer} >
                    <Card style={{minHeight: "100%", minWidth: "70vw"}}>
                        <CardHeader title="Προσθήκη Μέλους Επιτροπής" />
                        <form onSubmit={this.onAddSave.bind(this)}>
                            <CardContent>
                                <fieldset>
                                    <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ" onChange={(event) => this.Name = event.target.value} />
                                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΒΑΘΜΟΣ" onChange={(event) => this.Rank = event.target.value} />
                                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΘΕΣΗ" onChange={(event) => this.Position = event.target.value} />
                                    </Grid>
                                </fieldset>
                            </CardContent>
                            <CardActions>

                                <Button onClick={this.onAddCancel.bind(this)}>
                                Cancel
                                </Button>
                                <Button autoFocus type="submit" value="Submit">
                                Save
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Drawer>
            );
        }
    }
}

export interface ManagersAddProps {
    openAddDrawer: boolean;
    onAddSave?: () => void;
    onAddCancel?: () => void;
}
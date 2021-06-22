import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { Group } from "../../../entities/Group";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { MySnackbar } from "../../components/MySnackbar";

export class GroupsAdd extends React.Component<GroupsAddProps, GroupsAddState> {
    state: Readonly<GroupsAddState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: GroupsAddProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            loading: false,
            errorSnackbarOpen: false,
            errorMessage: ""
        };
    }

    onAddSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const group = Group.fromObject({
            Id: null,
            Name: this.nameInputRef.current.value
        });
        Group.insertToApi(this.cancelTokenSource, group).then(() => {
            this.setState({loading: false});
            if (this.props.onAddSave) {
                this.props.onAddSave();
            }
        }).catch((error) => {
            console.log(error);
            this.setState({errorMessage: ApiConsumer.getErrorMessage(error)});
            this.setState({loading: false, errorSnackbarOpen: true});
        });
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
                    <Card style={{minWidth: "90vw", display:"flex", flexGrow: 1}}>
                        <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                            <Grid item>
                                <Grid container direction="row" justify="center" alignContent="center" alignItems="center">
                                    <CardHeader title="Προσθήκη Ομάδας" />
                                </Grid>
                            </Grid>

                            <Grid item style={{display: "flex", flexGrow: 1}}>
                                <form onSubmit={this.onAddSave.bind(this)} style={{display: "flex", flexGrow: 1}}>

                                    <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                                        <fieldset>
                                            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center" spacing={2}>
                                                <Grid item>
                                                    <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ*" inputRef={this.nameInputRef} />
                                                </Grid>
                                                <Grid item>
                                                    <TextField size="small" type="number" InputLabelProps={{ shrink: true }} label="Τελευταίος Κώδικας Εγγραφής" disabled value={0} />
                                                </Grid>
                                            </Grid>
                                        </fieldset>
                                        <div style={{display: "flex", flexGrow: 1}} />
                                        <CardActions>
                                            <Grid container direction="row" justify="flex-end">

                                                <Button variant="contained" style={{margin: "10px"}} disabled={this.state.loading} onClick={this.onAddCancel.bind(this)}>
                                                Cancel
                                                </Button>
                                                <Button variant="contained" style={{margin: "10px 20px 10px 10px"}} disabled={this.state.loading} color="primary" autoFocus type="submit" value="Submit">
                                                Save
                                                </Button>
                                            </Grid>
                                        </CardActions>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                        <Backdrop open={this.state.loading} style={{position: "fixed", left: "10vw", height: "100vh", width: "90vw", zIndex: 100}}>
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <MySnackbar
                            open={this.state.errorSnackbarOpen}
                            onClose={() => this.setState({errorSnackbarOpen: false})}
                            severity="error"
                            message={`Αποτυχία προσθήκης ομάδας!${this.state.errorMessage}`}
                        />
                    </Card>
                </Drawer>
            );
        }
    }
}

export interface GroupsAddProps {
    openAddDrawer: boolean;
    onAddSave?: () => void;
    onAddCancel?: () => void;
}

interface GroupsAddState {
    loading: boolean;
    errorSnackbarOpen: boolean;
    errorMessage: string;
}
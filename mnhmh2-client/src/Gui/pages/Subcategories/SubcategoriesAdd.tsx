import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { Subcategory } from "../../../entities/Subcategory";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";

export class SubcategoriesAdd extends React.Component<SubcategoriesAddProps, SubcategoriesAddState> {
    state: Readonly<SubcategoriesAddState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: SubcategoriesAddProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            loading: false,
            errorSnackbarOpen: false
        };
    }

    onAddSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const store = Subcategory.fromObject({
            Id: null,
            Name: this.nameInputRef.current.value,
        });
        Subcategory.insertToApi(this.cancelTokenSource, store).then(() => {
            this.setState({loading: false});
            if (this.props.onAddSave) {
                this.props.onAddSave();
            }
        }).catch((error) => {
            console.log(error);
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
                    <Card style={{minWidth: "70vw", display:"flex", flexGrow: 1}}>
                        <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                            <Grid item>
                                <Grid container direction="row" justify="center" alignContent="center" alignItems="center">
                                    <CardHeader title="Προσθήκη Υποσυγκροτήματος" />
                                </Grid>
                            </Grid>

                            <Grid item style={{display: "flex", flexGrow: 1}}>
                                <form onSubmit={this.onAddSave.bind(this)} style={{display: "flex", flexGrow: 1}}>

                                    <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                                        <fieldset>
                                            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                                                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ" inputRef={this.nameInputRef} />
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
                        <Backdrop open={this.state.loading} style={{position: "fixed", left: "30vw", height: "100vh", width: "70vw", zIndex: 100}}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Snackbar
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            open={this.state.errorSnackbarOpen}
                            autoHideDuration={2000}
                            onClose={() => this.setState({errorSnackbarOpen: false})}
                        >
                            <Alert variant="filled" severity="error" onClose={() => this.setState({errorSnackbarOpen: false})}>
                                Αποτυχία προσθήκης υποσυγκροτήματος!
                            </Alert>
                        </Snackbar>
                    </Card>
                </Drawer>
            );
        }
    }
}

export interface SubcategoriesAddProps {
    openAddDrawer: boolean;
    onAddSave?: () => void;
    onAddCancel?: () => void;
}

interface SubcategoriesAddState {
    loading: boolean;
    errorSnackbarOpen: boolean;
}
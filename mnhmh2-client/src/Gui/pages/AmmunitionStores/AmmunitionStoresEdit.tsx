import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardContent, CardActions, Backdrop, CircularProgress, Tabs, Tab } from "@material-ui/core";
import { CancelTokenSource } from "axios";

import { ApiConsumer } from "../../../ApiConsumer";
import { AmmunitionStore } from "../../../entities/AmmunitionStore";
import { TabPanel, a11yProps } from "../../components/TabPanel";
import { MySnackbar } from "../../components/MySnackbar";

export class AmmunitionStoresEdit extends React.Component<AmmunitionStoresEditProps, AmmunitionStoresEditState> {
    state: Readonly<AmmunitionStoresEditState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;
    serialNumberInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: AmmunitionStoresEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.serialNumberInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            loading: false,
            errorSnackbarOpen: false,
            tabValue: 0
        };
    }

    onEditSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const store = AmmunitionStore.fromObject({
            Id: this.props.store.Id,
            Name: this.nameInputRef.current.value,
            SerialNumber: this.serialNumberInputRef.current.value
        });
        AmmunitionStore.updateInApi(this.cancelTokenSource, store).then(() => {
            this.setState({loading: false});
            if (this.props.onEditSave) {
                this.props.onEditSave();
            }
        }).catch((error) => {
            console.log(error);
            this.setState({loading: false, errorSnackbarOpen: true});
        });
    }
    onEditDelete(): void {
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        AmmunitionStore.deleteInApi(this.cancelTokenSource, this.props.store.Id).then(() => {
            this.setState({loading: false});
            if (this.props.onEditDelete) {
                this.props.onEditDelete();
            }
        }).catch((error) => {
            console.log(error);
            this.setState({loading: false, errorSnackbarOpen: true});
        });
    }

    onEditCancel(): void {
        this.cancelTokenSource.cancel("cancel sending data");
        if (this.props.onEditCancel) {
            this.props.onEditCancel();
        }
    }

    render(): ReactNode {
        if (!this.props.openEditDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="Id" type="number" value={this.props.store.Id} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ" defaultValue={this.props.store.Name} inputRef={this.nameInputRef} />
                <TextField size="small" type="number" InputLabelProps={{ shrink: true }} label="Σειραικός Αριθμός" defaultValue={this.props.store.SerialNumber} inputRef={this.serialNumberInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card style={{minWidth: "90vw", height: "100%", overflowY: "auto"}}>
                    <Grid container direction="column" style={{height: "100%"}}>
                        <CardHeader title="Τροποποίηση Αποθήκης" style={{textAlign: "center"}} />
                        <Tabs value={this.state.tabValue} onChange={(event: React.ChangeEvent<any>, newValue: number) => this.setState({tabValue: newValue})} >
                            <Tab label="Στοιχεία" value={0} {...a11yProps(0)} />
                        </Tabs>
                        <CardContent style={{display: "flex", flexGrow: 1}}>
                            <TabPanel value={this.state.tabValue} index={0} style={{display: "flex", flexGrow: 1}}>
                                <form onSubmit={this.onEditSave.bind(this)} style={{display: "flex", flexGrow: 1}}>
                                    <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                                        <fieldset>
                                            <legend>Στοιχεία Αποθήκης:</legend>
                                            {textfields}
                                        </fieldset>
                                        <Grid container direction="row" justify="flex-end">
                                            <Button variant="contained" style={{margin: "10px 20px 10px 10px"}} disabled={this.state.loading} color="primary" autoFocus type="submit" value="Submit">
                                                ΑΠΟΘΗΚΕΥΣΗ
                                            </Button>
                                        </Grid>
                                        <div style={{display:"flex", flexGrow: 1}} />
                                    </Grid>
                                </form>
                            </TabPanel >
                        </CardContent>
                        <CardActions>
                            <Grid container direction="row" justify="flex-end">
                                <Button variant="contained" style={{margin: "10px"}} disabled={this.state.loading} onClick={this.onEditCancel.bind(this)}>
                                        ΑΚΥΡΩΣΗ
                                </Button>
                                <Button variant="contained" style={{margin: "10px"}} disabled={this.state.loading} color="secondary" onClick={this.onEditDelete.bind(this)}>
                                        ΔΙΑΓΡΑΦΗ
                                </Button>
                            </Grid>
                        </CardActions>
                    </Grid>
                </Card>
                <Backdrop open={this.state.loading} style={{position: "fixed", left: "10vw", height: "100vh", width: "90vw", zIndex: 100}}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <MySnackbar
                    open={this.state.errorSnackbarOpen}
                    onClose={() => this.setState({errorSnackbarOpen: false})}
                    severity="error"
                    message="Αποτυχία τροποποίησης!"
                />
            </Drawer>
        );
    }
}

export interface AmmunitionStoresEditProps {
    store: AmmunitionStore;
    openEditDrawer: boolean;
    onEditSave?: () => void;
    onEditDelete?: () => void;
    onEditCancel?: () => void;
}

interface AmmunitionStoresEditState {
    loading: boolean;
    errorSnackbarOpen: boolean;
    tabValue: number;
}
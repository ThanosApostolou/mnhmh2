import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, Tabs, Tab, CircularProgress, CardContent } from "@material-ui/core";

import { TabPanel, a11yProps } from "../../components/TabPanel";
import { Manager } from "../../../entities/Manager";
import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { Borrower } from "../../../entities/Borrower";
import { ManagerBorrowers } from "./ManagerBorrowers";
import { MySnackbar } from "../../components/MySnackbar";

export class ManagersEdit extends React.Component<ManagersEditProps, ManagersEditState> {
    state: Readonly<ManagersEditState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;
    rankInputRef: React.RefObject<HTMLInputElement>;
    positionInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: ManagersEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.rankInputRef = React.createRef<HTMLInputElement>();
        this.positionInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            loading: false,
            borrowers: [],
            errorSnackbarOpen: false,
            tabValue: 0
        };
    }

    onEditSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const manager = Manager.fromObject({
            Id: this.props.manager.Id,
            Name: this.nameInputRef.current.value,
            Rank: this.rankInputRef.current.value,
            Position: this.positionInputRef.current.value
        });
        Manager.updateInApi(this.cancelTokenSource, manager).then(() => {
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
        Manager.deleteInApi(this.cancelTokenSource, this.props.manager.Id).then(() => {
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
                <TextField size="small" InputLabelProps={{ shrink: true }} label="Id" type="number" value={this.props.manager.Id} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ" defaultValue={this.props.manager.Name} inputRef={this.nameInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΒΑΘΜΟΣ" defaultValue={this.props.manager.Rank} inputRef={this.rankInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΘΕΣΗ" defaultValue={this.props.manager.Position} inputRef={this.positionInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card style={{minWidth: "70vw", height: "100%", overflowY: "auto"}}>
                    <Grid container direction="column" style={{height: "100%"}}>
                        <CardHeader title="Τροποποίηση Μέλους Επιτροπής" style={{textAlign: "center"}} />
                        <Tabs value={this.state.tabValue} onChange={(event: React.ChangeEvent<any>, newValue: number) => this.setState({tabValue: newValue})} >
                            <Tab label="Στοιχεία" value={0} {...a11yProps(0)} />
                            <Tab label="Μερικοί Διαχειριστές" value={1} {...a11yProps(1)} />
                        </Tabs>
                        <CardContent style={{display: "flex", flexGrow: 1}}>
                            <TabPanel value={this.state.tabValue} index={0} style={{display: "flex", flexGrow: 1}}>
                                <form onSubmit={this.onEditSave.bind(this)} style={{display: "flex", flexGrow: 1}}>

                                    <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                                        <fieldset>
                                            <legend>Στοιχεία Μέλους Επιτροπής:</legend>
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
                            <TabPanel value={this.state.tabValue} index={1} style={{display: "flex", flexGrow: 1}}>
                                <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                                    <fieldset style={{display: "flex", flexGrow: 1}}>
                                        <legend>Μερικοί Διαχειριστές που είναι υπεύθυνος:</legend>
                                        <ManagerBorrowers manager={this.props.manager} />
                                    </fieldset>
                                </Grid>
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
                <Backdrop open={this.state.loading} style={{position: "fixed", left: "30vw", height: "100vh", width: "70vw", zIndex: 100}}>
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

export interface ManagersEditProps {
    manager: Manager;
    openEditDrawer: boolean;
    onEditSave?: () => void;
    onEditDelete?: () => void;
    onEditCancel?: () => void;
}

interface ManagersEditState {
    loading: boolean;
    borrowers: Borrower[];
    errorSnackbarOpen: boolean;
    tabValue: number;
}
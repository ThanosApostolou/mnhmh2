import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Tabs, Tab, CardContent } from "@material-ui/core";

import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { Borrower } from "../../../entities/Borrower";
import { Manager } from "../../../entities/Manager";
import { ManagerSingleDataGrid } from "../Managers/ManagerSingleDataGrid";
import { TabPanel, a11yProps } from "../../components/TabPanel";
import { MySnackbar } from "../../components/MySnackbar";

export class BorrowersEdit extends React.Component<BorrowersEditProps, BorrowersEditState> {
    state: Readonly<BorrowersEditState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;
    serialNumberInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: BorrowersEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.serialNumberInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            manager: null,
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
        const borrower = Borrower.fromObject({
            Id: this.props.borrower.Id,
            Name: this.nameInputRef.current.value,
            SerialNumber: this.serialNumberInputRef.current.value,
            Manager: this.state.manager
        });
        Borrower.updateInApi(this.cancelTokenSource, borrower).then(() => {
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
        Borrower.deleteInApi(this.cancelTokenSource, this.props.borrower.Id).then(() => {
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
    onManagerSelect(manager: Manager): void {
        this.setState({manager: manager});
    }

    onManagerRemove(): void {
        this.setState({manager: null});
    }

    componentDidMount(): void {
        this.setState({manager: this.props.borrower ? JSON.parse(JSON.stringify(this.props.borrower.Manager)) : null});
    }
    componentDidUpdate(prevProps: BorrowersEditProps): void {
        if (JSON.stringify(prevProps.borrower) !== JSON.stringify(this.props.borrower) || prevProps.openEditDrawer !== this.props.openEditDrawer) {
            this.setState({manager: this.props.borrower ? JSON.parse(JSON.stringify(this.props.borrower.Manager)) : null});
        }
    }

    render(): ReactNode {
        if (!this.props.openEditDrawer) {
            return null;
        }

        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="Id" type="number" value={this.props.borrower.Id} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ" defaultValue={this.props.borrower.Name} inputRef={this.nameInputRef} />
                <TextField size="small" type="number" InputLabelProps={{ shrink: true }} label="ΣΕΙΡΙΑΚΟΣ ΑΡΙΘΜΟΣ" defaultValue={this.props.borrower.SerialNumber} inputRef={this.serialNumberInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card className="drawer-card">
                    <CardHeader title="Τροποποίηση Μέλους Επιτροπής" style={{textAlign: "center"}} />
                    <Tabs value={this.state.tabValue} onChange={(event: React.ChangeEvent<any>, newValue: number) => this.setState({tabValue: newValue})} >
                        <Tab label="Στοιχεία" value={0} {...a11yProps(0)} />
                    </Tabs>
                    <CardContent style={{display: "flex", flexGrow: 1}}>
                        <TabPanel value={this.state.tabValue} index={0} style={{flexGrow: 1}}>
                            <form onSubmit={this.onEditSave.bind(this)} style={{flexGrow: 1}}>
                                <fieldset className="fieldset-textfields">
                                    <legend>Στοιχεία Μέλους Επιτροπής:</legend>
                                    {textfields}
                                </fieldset>
                                <fieldset className="fieldset-singledatagrid">
                                    <legend>Υπεύθυνος:</legend>
                                    <ManagerSingleDataGrid manager={this.state.manager}
                                        onRemoveClick={this.onManagerRemove.bind(this)}
                                        onSelectClick={this.onManagerSelect.bind(this)}
                                    />
                                </fieldset>
                                <Grid container direction="row" justify="flex-end">
                                    <Button variant="contained" style={{margin: "10px 20px 10px 10px"}} disabled={this.state.loading} color="primary" autoFocus type="submit" value="Submit">
                                        ΑΠΟΘΗΚΕΥΣΗ
                                    </Button>
                                </Grid>
                            </form>
                            <div style={{display:"flex", flexGrow: 1}} />
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
                </Card>
                <Backdrop open={this.state.loading} className="drawer-backboard">
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

export interface BorrowersEditProps {
    borrower: Borrower;
    openEditDrawer: boolean;
    onEditSave?: () => void;
    onEditDelete?: () => void;
    onEditCancel?: () => void;
}

interface BorrowersEditState {
    manager: Manager;
    loading: boolean;
    errorSnackbarOpen: boolean;
    tabValue: number;
}
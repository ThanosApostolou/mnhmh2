import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardContent, CardActions, Backdrop, CircularProgress } from "@material-ui/core";
import { CancelTokenSource } from "axios";

import { Borrower } from "../../../entities/Borrower";
import { Manager } from "../../../entities/Manager";
import { ApiConsumer } from "../../../ApiConsumer";
import { ManagerSingleDataGrid } from "../Managers/ManagerSingleDataGrid";
import { MySnackbar } from "../../components/MySnackbar";

export class BorrowersAdd extends React.Component<BorrowersAddProps, BorrowersAddState> {
    state: Readonly<BorrowersAddState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;
    serialNumberInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: BorrowersAddProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.serialNumberInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            loading: false,
            errorSnackbarOpen: false,
            manager: null
        };
    }

    onAddSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const borrower = Borrower.fromObject({
            Id: null,
            Name: this.nameInputRef.current.value,
            SerialNumber: this.serialNumberInputRef.current.value,
            Manager: this.state.manager
        });
        Borrower.insertToApi(this.cancelTokenSource, borrower).then(() => {
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

    onManagerSelect(manager: Manager): void {
        this.setState({manager: manager});
    }

    onManagerRemove(): void {
        this.setState({manager: null});
    }

    render(): ReactNode {
        if (!this.props.openAddDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ" inputRef={this.nameInputRef} />
                <TextField size="small" type="number" InputLabelProps={{ shrink: true }} label="ΣΕΙΡΙΑΚΟΣ ΑΡΙΘΜΟΣ" inputRef={this.serialNumberInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openAddDrawer} >
                <Card className="drawer-card">
                    <CardHeader title="Προσθήκη Μερικού Διαχειριστή" style={{textAlign: "center"}} />
                    <CardContent className="drawer-cardcontent">
                        <form onSubmit={this.onAddSave.bind(this)} style={{flexGrow: 1}}>
                            <fieldset className="fieldset-textfields">
                                <legend>Στοιχεία Μερικού Διαχειριστή:</legend>
                                {textfields}
                            </fieldset>
                            <fieldset className="fieldset-singledatagrid">
                                <legend>Υπεύθυνος:</legend>
                                <ManagerSingleDataGrid manager={this.state.manager}
                                    onRemoveClick={this.onManagerRemove.bind(this)}
                                    onSelectClick={this.onManagerSelect.bind(this)}
                                />
                            </fieldset>
                            <div style={{display:"flex", flexGrow: 1}} />
                        </form>
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" justify="flex-end">
                            <Button variant="contained" style={{margin: "10px"}} disabled={this.state.loading} onClick={this.onAddCancel.bind(this)}>
                                ΑΚΥΡΩΣΗ
                            </Button>
                            <Button variant="contained" style={{margin: "10px 20px 10px 10px"}} disabled={this.state.loading} color="primary" autoFocus type="submit" value="Submit">
                                ΑΠΟΘΗΚΕΥΣΗ
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
                    message="Αποτυχία προσθήκης!"
                />
            </Drawer>
        );
    }
}

export interface BorrowersAddProps {
    openAddDrawer: boolean;
    onAddSave?: () => void;
    onAddCancel?: () => void;
}

interface BorrowersAddState {
    loading: boolean;
    errorSnackbarOpen: boolean;
    manager: Manager;
}
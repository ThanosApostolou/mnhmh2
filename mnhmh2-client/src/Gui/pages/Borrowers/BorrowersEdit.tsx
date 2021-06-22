import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Tabs, Tab, CardContent } from "@material-ui/core";

import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { Borrower } from "../../../entities/Borrower";
import { Manager } from "../../../entities/Manager";
import { ManagerSingleDataGrid } from "../Managers/ManagerSingleDataGrid";
import { TabPanel, a11yProps } from "../../components/TabPanel";
import { MySnackbar } from "../../components/MySnackbar";
import { BorrowersEditDirectMaterialBorrowers} from "./BorrowersEditDirectMaterialBorrowers";
import { BorrowersEditSubcategories} from "./BorrowersEditSubcategories";

export class BorrowersEdit extends React.Component<BorrowersEditProps, BorrowersEditState> {
    state: Readonly<BorrowersEditState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: BorrowersEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            manager: null,
            loading: false,
            errorSnackbarOpen: false,
            errorMessage: "",
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
            Manager: this.state.manager
        });
        Borrower.updateInApi(this.cancelTokenSource, borrower).then(() => {
            this.setState({loading: false});
            if (this.props.onEditSave) {
                this.props.onEditSave();
            }
        }).catch((error) => {
            console.log(error);
            this.setState({errorMessage: ApiConsumer.getErrorMessage(error)});
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
                <TextField size="small" type="number" InputLabelProps={{ shrink: true }} label="ΣΕΙΡΙΑΚΟΣ ΑΡΙΘΜΟΣ" value={this.props.borrower.SerialNumber} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ*" defaultValue={this.props.borrower.Name} inputRef={this.nameInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card className="drawer-card">
                    <CardHeader title={`Τροποποίηση Μερικού Διαχειριστή: ${this.props.borrower.Name}`} style={{textAlign: "center"}} />
                    <Tabs value={this.state.tabValue} onChange={(event: React.ChangeEvent<any>, newValue: number) => this.setState({tabValue: newValue})} >
                        <Tab label="Στοιχεία" value={0} {...a11yProps(0)} />
                        <Tab label="Χρεωστικά" value={1} {...a11yProps(1)} />
                        <Tab label="Υποσυγκροτήματα" value={2} {...a11yProps(2)} />
                    </Tabs>
                    <CardContent className="drawer-cardcontent">
                        <TabPanel value={this.state.tabValue} index={0} style={{flexGrow: 1}}>
                            <form id="myform" onSubmit={this.onEditSave.bind(this)} style={{flexGrow: 1}}>
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
                                <Grid container direction="row" justify="flex-end">
                                    <Button variant="contained" style={{margin: "10px 20px 10px 10px"}} disabled={this.state.loading} color="primary" autoFocus type="submit" value="Submit" form="myform">
                                        ΑΠΟΘΗΚΕΥΣΗ
                                    </Button>
                                </Grid>
                            </form>
                        </TabPanel >
                        <TabPanel value={this.state.tabValue} index={1} style={{display: "flex", flexGrow: 1}}>
                            <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                                <fieldset style={{display: "flex", flexGrow: 1}}>
                                    <legend>Χρεωστικά του μερικού διαχειριστή:</legend>
                                    <BorrowersEditDirectMaterialBorrowers borrower={this.props.borrower} />
                                </fieldset>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.tabValue} index={2} style={{display: "flex", flexGrow: 1}}>
                            <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                                <fieldset style={{display: "flex", flexGrow: 1}}>
                                    <legend>Υποσυγκροτήματα του μερικού διαχειριστή:</legend>
                                    <BorrowersEditSubcategories borrower={this.props.borrower} />
                                </fieldset>
                            </Grid>
                        </TabPanel>
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
                    message={`Αποτυχία τροποποίησης Μερικού Διαχειριστή!${this.state.errorMessage}`}
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
    errorMessage: string;
    tabValue: number;
}
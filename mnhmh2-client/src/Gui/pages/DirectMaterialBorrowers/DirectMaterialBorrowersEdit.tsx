import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Tabs, Tab, CardContent } from "@material-ui/core";

import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { DirectMaterialBorrower } from "../../../entities/DirectMaterialBorrower";
import { MaterialTab } from "../../../entities/MaterialTab";
import { MaterialTabSingleDataGrid } from "../MaterialTabs/MaterialTabSingleDataGrid";
import { Borrower } from "../../../entities/Borrower";
import { BorrowerSingleDataGrid } from "../Borrowers/BorrowerSingleDataGrid";
import { TabPanel, a11yProps } from "../../components/TabPanel";
import { MySnackbar } from "../../components/MySnackbar";

export class DirectMaterialBorrowersEdit extends React.Component<DirectMaterialBorrowersEditProps, DirectMaterialBorrowersEditState> {
    state: Readonly<DirectMaterialBorrowersEditState>;
    cancelTokenSource: CancelTokenSource;
    quantityInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: DirectMaterialBorrowersEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.quantityInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            materialTab: null,
            borrower: null,
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
        const directMaterialBorrower = DirectMaterialBorrower.fromObject({
            Id: this.props.directMaterialBorrower.Id,
            Quantity: this.quantityInputRef.current.value,
            MaterialTab: this.state.materialTab,
            Borrower: this.state.borrower
        });
        DirectMaterialBorrower.updateInApi(this.cancelTokenSource, directMaterialBorrower).then(() => {
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
        DirectMaterialBorrower.deleteInApi(this.cancelTokenSource, this.props.directMaterialBorrower.Id).then(() => {
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

    onMaterialTabSelect(materialTab: MaterialTab): void {
        this.setState({materialTab: materialTab});
    }
    onMaterialTabRemove(): void {
        this.setState({materialTab: null});
    }

    onBorrowerSelect(borrower: Borrower): void {
        this.setState({borrower: borrower});
    }
    onBorrowerRemove(): void {
        this.setState({borrower: null});
    }

    componentDidMount(): void {
        this.setState({
            materialTab: this.props.directMaterialBorrower ? this.props.directMaterialBorrower.MaterialTab : null,
            borrower: this.props.directMaterialBorrower ? this.props.directMaterialBorrower.Borrower : null
        });
    }
    componentDidUpdate(prevProps: DirectMaterialBorrowersEditProps): void {
        if (JSON.stringify(prevProps.directMaterialBorrower) !== JSON.stringify(this.props.directMaterialBorrower) || prevProps.openEditDrawer !== this.props.openEditDrawer) {
            this.setState({
                materialTab: this.props.directMaterialBorrower ? this.props.directMaterialBorrower.MaterialTab : null,
                borrower: this.props.directMaterialBorrower ? JSON.parse(JSON.stringify(this.props.directMaterialBorrower.Borrower)) : null
            });
        }
    }

    render(): ReactNode {
        if (!this.props.openEditDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="Id" type="number" value={this.props.directMaterialBorrower.Id} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΠΟΣΟΤΗΤΑ" defaultValue={this.props.directMaterialBorrower.Quantity} inputRef={this.quantityInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card className="drawer-card">
                    <CardHeader title="Τροποποίηση Χρεωστικού" style={{textAlign: "center"}} />
                    <Tabs value={this.state.tabValue} onChange={(event: React.ChangeEvent<any>, newValue: number) => this.setState({tabValue: newValue})} >
                        <Tab label="Στοιχεία" value={0} {...a11yProps(0)} />
                    </Tabs>
                    <CardContent className="drawer-cardcontent">
                        <TabPanel value={this.state.tabValue} index={0} style={{flexGrow: 1}}>
                            <form id="myform" onSubmit={this.onEditSave.bind(this)} style={{flexGrow: 1}}>
                                <fieldset style={{display: "flex"}}>
                                    <legend>Στοιχεία Χρεωστικού:</legend>
                                    {textfields}
                                </fieldset>
                                <fieldset style={{display: "flex", height: "270px"}}>
                                    <legend>Καρτέλα Υλικού:</legend>
                                    <MaterialTabSingleDataGrid materialTab={this.state.materialTab}
                                        onRemoveClick={this.onMaterialTabRemove.bind(this)}
                                        onSelectClick={this.onMaterialTabSelect.bind(this)}
                                        storagePrefix="materialtabs_single"
                                    />
                                </fieldset>
                                <fieldset style={{display: "flex", height: "270px"}}>
                                    <legend>Μερικός Διαχειριστής:</legend>
                                    <BorrowerSingleDataGrid borrower={this.state.borrower}
                                        onRemoveClick={this.onBorrowerRemove.bind(this)}
                                        onSelectClick={this.onBorrowerSelect.bind(this)}
                                        storagePrefix="ammunitionstores_single"
                                    />
                                </fieldset>
                                <Grid container direction="row" justify="flex-end">
                                    <Button variant="contained" style={{margin: "10px 20px 10px 10px"}} disabled={this.state.loading} color="primary" autoFocus type="submit" value="Submit" form="myform">
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

export interface DirectMaterialBorrowersEditProps {
    directMaterialBorrower: DirectMaterialBorrower;
    openEditDrawer: boolean;
    onEditSave?: () => void;
    onEditDelete?: () => void;
    onEditCancel?: () => void;
}

interface DirectMaterialBorrowersEditState {
    materialTab: MaterialTab;
    borrower: Borrower;
    loading: boolean;
    errorSnackbarOpen: boolean;
    tabValue: number;
}
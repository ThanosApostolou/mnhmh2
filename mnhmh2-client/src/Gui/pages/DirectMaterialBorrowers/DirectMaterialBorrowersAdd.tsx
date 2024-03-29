import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardContent, CardActions, Backdrop, CircularProgress } from "@material-ui/core";
import { CancelTokenSource } from "axios";

import { ApiConsumer } from "../../../ApiConsumer";
import { DirectMaterialBorrower } from "../../../entities/DirectMaterialBorrower";
import { MaterialTab } from "../../../entities/MaterialTab";
import { MaterialTabSingleDataGrid } from "../MaterialTabs/MaterialTabSingleDataGrid";
import { Borrower } from "../../../entities/Borrower";
import { BorrowerSingleDataGrid } from "../Borrowers/BorrowerSingleDataGrid";
import { MySnackbar } from "../../components/MySnackbar";

export class DirectMaterialBorrowersAdd extends React.Component<DirectMaterialBorrowersAddProps, DirectMaterialBorrowersAddState> {
    state: Readonly<DirectMaterialBorrowersAddState>;
    cancelTokenSource: CancelTokenSource;
    quantityInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: DirectMaterialBorrowersAddProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.quantityInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            loading: false,
            errorSnackbarOpen: false,
            materialTab: null,
            borrower: null
        };
    }

    onAddSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const directMaterialBorrower = DirectMaterialBorrower.fromObject({
            Id: null,
            Quantity: this.quantityInputRef.current.value,
            MaterialTab: this.state.materialTab,
            Borrower: this.state.borrower
        });
        DirectMaterialBorrower.insertToApi(this.cancelTokenSource, directMaterialBorrower).then(() => {
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
            materialTab: null,
            borrower: null
        });
    }
    componentDidUpdate(prevProps: DirectMaterialBorrowersAddProps): void {
        if (prevProps.openAddDrawer !== this.props.openAddDrawer) {
            this.setState({
                materialTab: null,
                borrower: null
            });
        }
    }

    render(): ReactNode {
        if (!this.props.openAddDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΠΟΣΟΤΗΤΑ" type="number" inputRef={this.quantityInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openAddDrawer} >
                <Card className="drawer-card">
                    <CardHeader title="Προσθήκη Χρεωστικού" style={{textAlign: "center"}} />
                    <CardContent className="drawer-cardcontent">
                        <form id="myform" onSubmit={this.onAddSave.bind(this)} style={{flexGrow: 1}}>
                            <fieldset className="fieldset-textfields">
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
                        </form>
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" justify="flex-end">
                            <Button variant="contained" style={{margin: "10px"}} disabled={this.state.loading} onClick={this.onAddCancel.bind(this)}>
                                ΑΚΥΡΩΣΗ
                            </Button>
                            <Button variant="contained" style={{margin: "10px 20px 10px 10px"}} disabled={this.state.loading} color="primary" autoFocus type="submit" value="Submit" form="myform">
                                ΑΠΟΘΗΚΕΥΣΗ
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
                    message="Αποτυχία προσθήκης!"
                />
            </Drawer>
        );
    }
}

export interface DirectMaterialBorrowersAddProps {
    openAddDrawer: boolean;
    onAddSave?: () => void;
    onAddCancel?: () => void;
}

interface DirectMaterialBorrowersAddState {
    loading: boolean;
    errorSnackbarOpen: boolean;
    materialTab: MaterialTab;
    borrower: Borrower;
}
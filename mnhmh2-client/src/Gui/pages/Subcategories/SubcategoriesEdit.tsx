import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Tabs, Tab, CardContent } from "@material-ui/core";

import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { Subcategory } from "../../../entities/Subcategory";
import { MaterialTab } from "../../../entities/MaterialTab";
import { MaterialTabSingleDataGrid } from "../MaterialTabs/MaterialTabSingleDataGrid";
import { Borrower } from "../../../entities/Borrower";
import { BorrowerSingleDataGrid } from "../Borrowers/BorrowerSingleDataGrid";
import { TabPanel, a11yProps } from "../../components/TabPanel";
import { MySnackbar } from "../../components/MySnackbar";
import { SubcategoriesEditSubcategoryContents } from "./SubcategoriesEditSubcategoryContents";

export class SubcategoriesEdit extends React.Component<SubcategoriesEditProps, SubcategoriesEditState> {
    state: Readonly<SubcategoriesEditState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: SubcategoriesEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            materialTab: null,
            borrower: null,
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
        const subcategory = Subcategory.fromObject({
            Id: this.props.subcategory.Id,
            Name: this.nameInputRef.current.value,
            MaterialTab: this.state.materialTab,
            Borrower: this.state.borrower
        });
        Subcategory.updateInApi(this.cancelTokenSource, subcategory).then(() => {
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
        Subcategory.deleteInApi(this.cancelTokenSource, this.props.subcategory.Id).then(() => {
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
            materialTab: this.props.subcategory ? this.props.subcategory.MaterialTab : null,
            borrower: this.props.subcategory ? this.props.subcategory.Borrower : null
        });
    }
    componentDidUpdate(prevProps: SubcategoriesEditProps): void {
        if (JSON.stringify(prevProps.subcategory) !== JSON.stringify(this.props.subcategory) || prevProps.openEditDrawer !== this.props.openEditDrawer) {
            this.setState({
                materialTab: this.props.subcategory ? this.props.subcategory.MaterialTab : null,
                borrower: this.props.subcategory ? JSON.parse(JSON.stringify(this.props.subcategory.Borrower)) : null
            });
        }
    }

    render(): ReactNode {
        if (!this.props.openEditDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="Id" type="number" value={this.props.subcategory.Id} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ*" defaultValue={this.props.subcategory.Name} inputRef={this.nameInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card className="drawer-card">
                    <CardHeader title={`Τροποποίηση Υποσυγκροτήματος: ${this.props.subcategory.Name}`} style={{textAlign: "center"}} />
                    <Tabs value={this.state.tabValue} onChange={(event: React.ChangeEvent<any>, newValue: number) => this.setState({tabValue: newValue})} >
                        <Tab label="Στοιχεία" value={0} {...a11yProps(0)} />
                        <Tab label="Περιεχόμενα Υποσυγκροτήματος" value={1} {...a11yProps(1)} />
                    </Tabs>
                    <CardContent className="drawer-cardcontent">
                        <TabPanel value={this.state.tabValue} index={0} style={{flexGrow: 1}}>
                            <form id="myform" onSubmit={this.onEditSave.bind(this)} style={{flexGrow: 1}}>
                                <fieldset style={{display: "flex"}}>
                                    <legend>Στοιχεία Υποσυγκροτήματος:</legend>
                                    {textfields}
                                </fieldset>
                                <fieldset style={{display: "flex", height: "270px"}}>
                                    <legend>Καρτέλα Υλικού*:</legend>
                                    <MaterialTabSingleDataGrid materialTab={this.state.materialTab}
                                        onRemoveClick={this.onMaterialTabRemove.bind(this)}
                                        onSelectClick={this.onMaterialTabSelect.bind(this)}
                                        storagePrefix="materialtabs_single"
                                    />
                                </fieldset>
                                <fieldset style={{display: "flex", height: "270px"}}>
                                    <legend>Μερικός Διαχειριστής*:</legend>
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
                        <TabPanel value={this.state.tabValue} index={1} style={{display: "flex", flexGrow: 1}}>
                            <Grid container direction="column" style={{display:"flex", flexGrow: 1}}>
                                <fieldset style={{display: "flex", flexGrow: 1}}>
                                    <legend>Περιεχόμενα του υποσυγκροτήματος:</legend>
                                    <SubcategoriesEditSubcategoryContents subcategory={this.props.subcategory} />
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
                <Backdrop open={this.state.loading} style={{position: "fixed", left: "10vw", height: "100vh", width: "90vw", zIndex: 100}}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <MySnackbar
                    open={this.state.errorSnackbarOpen}
                    onClose={() => this.setState({errorSnackbarOpen: false})}
                    severity="error"
                    message={`Αποτυχία τροποποίησης υποσυγκροτήματος!${this.state.errorMessage}`}
                />
            </Drawer>
        );
    }
}

export interface SubcategoriesEditProps {
    subcategory: Subcategory;
    openEditDrawer: boolean;
    onEditSave?: () => void;
    onEditDelete?: () => void;
    onEditCancel?: () => void;
}

interface SubcategoriesEditState {
    materialTab: MaterialTab;
    borrower: Borrower;
    loading: boolean;
    errorSnackbarOpen: boolean;
    errorMessage: string;
    tabValue: number;
}
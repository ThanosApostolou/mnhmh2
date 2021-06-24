import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Tabs, Tab, CardContent } from "@material-ui/core";

import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { SubcategoryContent } from "../../../entities/SubcategoryContent";
import { Subcategory } from "../../../entities/Subcategory";
import { SubcategorySingleDataGrid } from "../Subcategories/SubcategorySingleDataGrid";
import { MaterialTab } from "../../../entities/MaterialTab";
import { MaterialTabSingleDataGrid } from "../MaterialTabs/MaterialTabSingleDataGrid";
import { TabPanel, a11yProps } from "../../components/TabPanel";
import { MySnackbar } from "../../components/MySnackbar";

export class SubcategoryContentsEdit extends React.Component<SubcategoryContentsEditProps, SubcategoryContentsEditState> {
    state: Readonly<SubcategoryContentsEditState>;
    cancelTokenSource: CancelTokenSource;
    quantityInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: SubcategoryContentsEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.quantityInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            subcategory: null,
            materialTab: null,
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
        const subcategory = SubcategoryContent.fromObject({
            Id: this.props.subcategoryContent.Id,
            Quantity: this.quantityInputRef.current.value
        });
        SubcategoryContent.updateInApi(this.cancelTokenSource, subcategory).then(() => {
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
        SubcategoryContent.deleteInApi(this.cancelTokenSource, this.props.subcategoryContent.Id).then(() => {
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

    onSubcategorySelect(subcategory: Subcategory): void {
        this.setState({subcategory: subcategory});
    }
    onSubcategoryRemove(): void {
        this.setState({subcategory: null});
    }

    onMaterialTabSelect(materialTab: MaterialTab): void {
        this.setState({materialTab: materialTab});
    }
    onMaterialTabRemove(): void {
        this.setState({materialTab: null});
    }

    componentDidMount(): void {
        this.setState({
            subcategory: this.props.subcategoryContent ? this.props.subcategoryContent.SubcategoryBelongingTo : null,
            materialTab: this.props.subcategoryContent ? this.props.subcategoryContent.SubcategoryContentTab : null
        });
    }
    componentDidUpdate(prevProps: SubcategoryContentsEditProps): void {
        if (JSON.stringify(prevProps.subcategoryContent) !== JSON.stringify(this.props.subcategoryContent) || prevProps.openEditDrawer !== this.props.openEditDrawer) {
            this.setState({
                subcategory: this.props.subcategoryContent ? this.props.subcategoryContent.SubcategoryBelongingTo : null,
                materialTab: this.props.subcategoryContent ? JSON.parse(JSON.stringify(this.props.subcategoryContent.SubcategoryContentTab)) : null
            });
        }
    }

    render(): ReactNode {
        if (!this.props.openEditDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="Id" type="number" value={this.props.subcategoryContent.Id} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΠΟΣΟΤΗΤΑ*" defaultValue={this.props.subcategoryContent.Quantity} inputRef={this.quantityInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card className="drawer-card">
                    <CardHeader title={`Τροποποίηση Περιεχομένου Υποσυγκροτήματος: ${this.props.subcategoryContent.SubcategoryContentTab.Name}`} style={{textAlign: "center"}} />
                    <Tabs value={this.state.tabValue} onChange={(event: React.ChangeEvent<any>, newValue: number) => this.setState({tabValue: newValue})} >
                        <Tab label="Στοιχεία" value={0} {...a11yProps(0)} />
                    </Tabs>
                    <CardContent className="drawer-cardcontent">
                        <TabPanel value={this.state.tabValue} index={0} style={{flexGrow: 1}}>
                            <form id="myform" onSubmit={this.onEditSave.bind(this)} style={{flexGrow: 1}}>
                                <fieldset style={{display: "flex"}}>
                                    <legend>Στοιχεία Υποσυγκροτήματος:</legend>
                                    {textfields}
                                </fieldset>
                                <fieldset style={{display: "flex", height: "270px"}}>
                                    <legend>Υποσυγκρότημα:</legend>
                                    <SubcategorySingleDataGrid subcategory={this.state.subcategory}
                                        onRemoveClick={this.onSubcategoryRemove.bind(this)}
                                        onSelectClick={this.onSubcategorySelect.bind(this)}
                                        storagePrefix="materialtabs_single"
                                    />
                                </fieldset>
                                <fieldset style={{display: "flex", height: "270px"}}>
                                    <legend>Καρτέλα	Υλικού:</legend>
                                    <MaterialTabSingleDataGrid materialTab={this.state.materialTab}
                                        onRemoveClick={this.onMaterialTabRemove.bind(this)}
                                        onSelectClick={this.onMaterialTabSelect.bind(this)}
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
                    message={`Αποτυχία τροποποίησης περιεχομένου υποσυγκροτήματος!${this.state.errorMessage}`}
                />
            </Drawer>
        );
    }
}

export interface SubcategoryContentsEditProps {
    subcategoryContent: SubcategoryContent;
    openEditDrawer: boolean;
    onEditSave?: () => void;
    onEditDelete?: () => void;
    onEditCancel?: () => void;
}

interface SubcategoryContentsEditState {
    subcategory: Subcategory;
    materialTab: MaterialTab;
    loading: boolean;
    errorSnackbarOpen: boolean;
    errorMessage: string;
    tabValue: number;
}
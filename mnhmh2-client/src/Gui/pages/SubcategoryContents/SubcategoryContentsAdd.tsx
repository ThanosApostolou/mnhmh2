import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardContent, CardActions, Backdrop, CircularProgress } from "@material-ui/core";
import { CancelTokenSource } from "axios";

import { ApiConsumer } from "../../../ApiConsumer";
import { SubcategoryContent } from "../../../entities/SubcategoryContent";
import { Subcategory } from "../../../entities/Subcategory";
import { SubcategorySingleDataGrid } from "../Subcategories/SubcategorySingleDataGrid";
import { MaterialTab } from "../../../entities/MaterialTab";
import { MaterialTabSingleDataGrid } from "../MaterialTabs/MaterialTabSingleDataGrid";
import { MySnackbar } from "../../components/MySnackbar";

export class SubcategoryContentsAdd extends React.Component<SubcategoryContentsAddProps, SubcategoryContentsAddState> {
    state: Readonly<SubcategoryContentsAddState>;
    cancelTokenSource: CancelTokenSource;
    quantityInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: SubcategoryContentsAddProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.quantityInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            loading: false,
            errorSnackbarOpen: false,
            errorMessage: "",
            subcategory: null,
            materialTab: null
        };
    }

    onAddSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const subcategoryContent = SubcategoryContent.fromObject({
            Id: null,
            Quantity: this.quantityInputRef.current.value,
            SubcategoryBelongingTo: this.state.subcategory,
            SubcategoryContentTab: this.state.materialTab
        });
        SubcategoryContent.insertToApi(this.cancelTokenSource, subcategoryContent).then(() => {
            this.setState({loading: false});
            if (this.props.onAddSave) {
                this.props.onAddSave();
            }
        }).catch((error) => {
            console.log(error);
            this.setState({errorMessage: ApiConsumer.getErrorMessage(error)});
            this.setState({loading: false, errorSnackbarOpen: true});
        });
    }
    onAddCancel(): void {
        this.cancelTokenSource.cancel("cancel sending data");
        if (this.props.onAddCancel) {
            this.props.onAddCancel();
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
            subcategory: null,
            materialTab: null
        });
    }
    componentDidUpdate(prevProps: SubcategoryContentsAddProps): void {
        if (prevProps.openAddDrawer !== this.props.openAddDrawer) {
            this.setState({
                subcategory: null,
                materialTab: null
            });
        }
    }

    render(): ReactNode {
        if (!this.props.openAddDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΠΟΣΟΤΗΤΑ*" type="number" defaultValue={0} inputRef={this.quantityInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openAddDrawer} >
                <Card className="drawer-card">
                    <CardHeader title="Προσθήκη Περιεχομένου Υποσυγκροτήματος" style={{textAlign: "center"}} />
                    <CardContent className="drawer-cardcontent">
                        <form id="myform" onSubmit={this.onAddSave.bind(this)} style={{flexGrow: 1}}>
                            <fieldset className="fieldset-textfields">
                                <legend>Στοιχεία Περιεχομένου Υποσυγκροτήματος:</legend>
                                {textfields}
                            </fieldset>
                            <fieldset style={{display: "flex", height: "270px"}}>
                                <legend>Υποσυγκρότημα*:</legend>
                                <SubcategorySingleDataGrid subcategory={this.state.subcategory}
                                    onRemoveClick={this.onSubcategoryRemove.bind(this)}
                                    onSelectClick={this.onSubcategorySelect.bind(this)}
                                    storagePrefix="subcategories_single"
                                />
                            </fieldset>
                            <fieldset style={{display: "flex", height: "270px"}}>
                                <legend>Καρτέλα Υλικού*:</legend>
                                <MaterialTabSingleDataGrid materialTab={this.state.materialTab}
                                    onRemoveClick={this.onMaterialTabRemove.bind(this)}
                                    onSelectClick={this.onMaterialTabSelect.bind(this)}
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
                    message={`Αποτυχία προσθήκης περιεχομένου υποσυγκροτήματος!${this.state.errorMessage}`}
                />
            </Drawer>
        );
    }
}

export interface SubcategoryContentsAddProps {
    openAddDrawer: boolean;
    onAddSave?: () => void;
    onAddCancel?: () => void;
}

interface SubcategoryContentsAddState {
    loading: boolean;
    errorSnackbarOpen: boolean;
    errorMessage: string;
    subcategory: Subcategory;
    materialTab: MaterialTab;
}
import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Tabs, Tab, CardContent } from "@material-ui/core";

import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { AmmunitionPortion } from "../../../entities/AmmunitionPortion";
import { MaterialTab } from "../../../entities/MaterialTab";
import { MaterialTabSingleDataGrid } from "../MaterialTabs/MaterialTabSingleDataGrid";
import { AmmunitionStore } from "../../../entities/AmmunitionStore";
import { AmmunitionStoreSingleDataGrid } from "../AmmunitionStores/AmmunitionStoreSingleDataGrid";
import { TabPanel, a11yProps } from "../../components/TabPanel";
import { MySnackbar } from "../../components/MySnackbar";

export class AmmunitionPortionsEdit extends React.Component<AmmunitionPortionsEditProps, AmmunitionPortionsEditState> {
    state: Readonly<AmmunitionPortionsEditState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;
    quantityInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: AmmunitionPortionsEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.quantityInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            materialTab: null,
            ammunitionStore: null,
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
        const ammunitionPortion = AmmunitionPortion.fromObject({
            Id: this.props.ammunitionPortion.Id,
            Name: this.nameInputRef.current.value,
            Quantity: this.quantityInputRef.current.value,
            MaterialTab: this.state.materialTab,
            AmmunitionStore: this.state.ammunitionStore
        });
        AmmunitionPortion.updateInApi(this.cancelTokenSource, ammunitionPortion).then(() => {
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
        AmmunitionPortion.deleteInApi(this.cancelTokenSource, this.props.ammunitionPortion.Id).then(() => {
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

    onAmmunitionStoreSelect(ammunitionStore: AmmunitionStore): void {
        this.setState({ammunitionStore: ammunitionStore});
    }
    onAmmunitionStoreRemove(): void {
        this.setState({ammunitionStore: null});
    }

    componentDidMount(): void {
        this.setState({
            materialTab: this.props.ammunitionPortion ? this.props.ammunitionPortion.MaterialTab : null,
            ammunitionStore: this.props.ammunitionPortion ? this.props.ammunitionPortion.AmmunitionStore : null
        });
    }
    componentDidUpdate(prevProps: AmmunitionPortionsEditProps): void {
        if (JSON.stringify(prevProps.ammunitionPortion) !== JSON.stringify(this.props.ammunitionPortion) || prevProps.openEditDrawer !== this.props.openEditDrawer) {
            this.setState({
                materialTab: this.props.ammunitionPortion ? this.props.ammunitionPortion.MaterialTab : null,
                ammunitionStore: this.props.ammunitionPortion ? JSON.parse(JSON.stringify(this.props.ammunitionPortion.AmmunitionStore)) : null
            });
        }
    }

    render(): ReactNode {
        if (!this.props.openEditDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="Id" type="number" value={this.props.ammunitionPortion.Id} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ" defaultValue={this.props.ammunitionPortion.Name} inputRef={this.nameInputRef} />
                <TextField size="small" type="number" InputLabelProps={{ shrink: true }} label="Ποσότητα" defaultValue={this.props.ammunitionPortion.Quantity} inputRef={this.quantityInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card className="drawer-card">
                    <CardHeader title="Τροποποίηση Μέλους Επιτροπής" style={{textAlign: "center"}} />
                    <Tabs value={this.state.tabValue} onChange={(event: React.ChangeEvent<any>, newValue: number) => this.setState({tabValue: newValue})} >
                        <Tab label="Στοιχεία" value={0} {...a11yProps(0)} />
                    </Tabs>
                    <CardContent className="drawer-cardcontent">
                        <TabPanel value={this.state.tabValue} index={0} style={{flexGrow: 1}}>
                            <form id="myform" onSubmit={this.onEditSave.bind(this)} style={{flexGrow: 1}}>
                                <fieldset style={{display: "flex"}}>
                                    <legend>Στοιχεία Μέλους Επιτροπής:</legend>
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
                                    <legend>Αποθήκη:</legend>
                                    <AmmunitionStoreSingleDataGrid ammunitionStore={this.state.ammunitionStore}
                                        onRemoveClick={this.onAmmunitionStoreRemove.bind(this)}
                                        onSelectClick={this.onAmmunitionStoreSelect.bind(this)}
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

export interface AmmunitionPortionsEditProps {
    ammunitionPortion: AmmunitionPortion;
    openEditDrawer: boolean;
    onEditSave?: () => void;
    onEditDelete?: () => void;
    onEditCancel?: () => void;
}

interface AmmunitionPortionsEditState {
    materialTab: MaterialTab;
    ammunitionStore: AmmunitionStore;
    loading: boolean;
    errorSnackbarOpen: boolean;
    tabValue: number;
}
import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Tabs, Tab, CardContent, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { ImportsExportsTbl } from "../../../entities/ImportsExportsTbl";
import { MaterialTab } from "../../../entities/MaterialTab";
import { MaterialTabSingleDataGrid } from "../MaterialTabs/MaterialTabSingleDataGrid";
import { TabPanel, a11yProps } from "../../components/TabPanel";
import { MySnackbar } from "../../components/MySnackbar";

export class ImportsExportsTblEdit extends React.Component<ImportsExportsTblEditProps, ImportsExportsTblEditState> {
    state: Readonly<ImportsExportsTblEditState>;
    cancelTokenSource: CancelTokenSource;
    unitInputRef: React.RefObject<HTMLInputElement>;
    justificationFileNumberInputRef: React.RefObject<HTMLInputElement>;
    importedInputRef: React.RefObject<HTMLInputElement>;
    exportedInputRef: React.RefObject<HTMLInputElement>;
    remainingInputRef: React.RefObject<HTMLInputElement>;
    commentsInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: ImportsExportsTblEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.unitInputRef = React.createRef<HTMLInputElement>();
        this.justificationFileNumberInputRef = React.createRef<HTMLInputElement>();
        this.importedInputRef = React.createRef<HTMLInputElement>();
        this.exportedInputRef = React.createRef<HTMLInputElement>();
        this.remainingInputRef = React.createRef<HTMLInputElement>();
        this.commentsInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            materialTab: null,
            loading: false,
            errorSnackbarOpen: false,
            tabValue: 0,
            date: ""
        };
    }

    onEditSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const importsExportsTbl = ImportsExportsTbl.fromObject({
            Id: this.props.importsExportsTbl.Id,
            Date: this.state.date,
            Unit: this.unitInputRef.current.value,
            JustificationFileNumber: this.justificationFileNumberInputRef.current.value,
            Imported: this.importedInputRef.current.value,
            Exported: this.exportedInputRef.current.value,
            Remaining: this.remainingInputRef.current.value,
            Comments: this.commentsInputRef.current.value,
            MaterialTab: this.state.materialTab
        });
        ImportsExportsTbl.updateInApi(this.cancelTokenSource, importsExportsTbl).then(() => {
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
        ImportsExportsTbl.deleteInApi(this.cancelTokenSource, this.props.importsExportsTbl.Id).then(() => {
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

    componentDidMount(): void {
        this.setState({
            materialTab: this.props.importsExportsTbl ? this.props.importsExportsTbl.MaterialTab : null,
            date: this.props.importsExportsTbl ? this.props.importsExportsTbl.Date.toString().split("Z")[0] : ""
        });
    }
    componentDidUpdate(prevProps: ImportsExportsTblEditProps): void {
        if (JSON.stringify(prevProps.importsExportsTbl) !== JSON.stringify(this.props.importsExportsTbl) || prevProps.openEditDrawer !== this.props.openEditDrawer) {
            this.setState({
                materialTab: this.props.importsExportsTbl ? this.props.importsExportsTbl.MaterialTab : null,
                date: this.props.importsExportsTbl ? this.props.importsExportsTbl.Date.toString().split("Z")[0] : ""
            });
            console.log("DATE:", this.state.date);
        }
    }

    render(): ReactNode {
        if (!this.props.openEditDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="Id" type="number" value={this.props.importsExportsTbl.Id} disabled />
                <TextField id="datetime-local" label="Ημερομηνία" type="datetime-local" defaultValue={this.props.importsExportsTbl.Date} value={this.state.date}
                    onChange={(event) => this.setState({date: event.target.value})}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton size="small" onClick={(e) => this.setState({date: ""})}>
                                <Clear />
                            </IconButton>
                        )
                    }}
                />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΜΟΝΑΔΑ" defaultValue={this.props.importsExportsTbl.Unit} inputRef={this.unitInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΑΡΙΘΜΟΣ ΔΙΚΑΙΟΛΟΓΗΣΗ ΑΡΧΕΙΟΥ" defaultValue={this.props.importsExportsTbl.JustificationFileNumber} inputRef={this.justificationFileNumberInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΕΙΣΑΧΘΗΚΕ" type="number" defaultValue={this.props.importsExportsTbl.Imported} inputRef={this.importedInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΕΞΑΧΘΗΚΕ" type="number" defaultValue={this.props.importsExportsTbl.Exported} inputRef={this.exportedInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΥΠΟΛΟΙΠΟ" type="number" defaultValue={this.props.importsExportsTbl.Remaining} inputRef={this.remainingInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΣΧΟΛΙΑ" defaultValue={this.props.importsExportsTbl.Comments} inputRef={this.commentsInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card className="drawer-card">
                    <CardHeader title="Τροποποίηση Υποσυγκροτήματος" style={{textAlign: "center"}} />
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
                                    <legend>Καρτέλα Υλικού:</legend>
                                    <MaterialTabSingleDataGrid materialTab={this.state.materialTab}
                                        onRemoveClick={this.onMaterialTabRemove.bind(this)}
                                        onSelectClick={this.onMaterialTabSelect.bind(this)}
                                        storagePrefix="materialtabs_single"
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

export interface ImportsExportsTblEditProps {
    importsExportsTbl: ImportsExportsTbl;
    openEditDrawer: boolean;
    onEditSave?: () => void;
    onEditDelete?: () => void;
    onEditCancel?: () => void;
}

interface ImportsExportsTblEditState {
    materialTab: MaterialTab;
    loading: boolean;
    errorSnackbarOpen: boolean;
    tabValue: number;
    date: string;
}
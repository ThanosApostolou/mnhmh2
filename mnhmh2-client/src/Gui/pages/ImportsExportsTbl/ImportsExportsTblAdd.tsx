import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardContent, CardActions, Backdrop, CircularProgress, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { CancelTokenSource } from "axios";

import { ApiConsumer } from "../../../ApiConsumer";
import { ImportsExportsTbl } from "../../../entities/ImportsExportsTbl";
import { MaterialTab } from "../../../entities/MaterialTab";
import { MaterialTabSingleDataGrid } from "../MaterialTabs/MaterialTabSingleDataGrid";
import { MySnackbar } from "../../components/MySnackbar";

export class ImportsExportsTblAdd extends React.Component<ImportsExportsTblAddProps, ImportsExportsTblAddState> {
    state: Readonly<ImportsExportsTblAddState>;
    cancelTokenSource: CancelTokenSource;
    unitInputRef: React.RefObject<HTMLInputElement>;
    justificationFileNumberInputRef: React.RefObject<HTMLInputElement>;
    importedInputRef: React.RefObject<HTMLInputElement>;
    exportedInputRef: React.RefObject<HTMLInputElement>;
    remainingInputRef: React.RefObject<HTMLInputElement>;
    commentsInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: ImportsExportsTblAddProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.unitInputRef = React.createRef<HTMLInputElement>();
        this.justificationFileNumberInputRef = React.createRef<HTMLInputElement>();
        this.importedInputRef = React.createRef<HTMLInputElement>();
        this.exportedInputRef = React.createRef<HTMLInputElement>();
        this.remainingInputRef = React.createRef<HTMLInputElement>();
        this.commentsInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            loading: false,
            errorSnackbarOpen: false,
            date: "",
            materialTab: null
        };
    }

    onAddSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const importsExportsTbl = ImportsExportsTbl.fromObject({
            Id: null,
            Date: this.state.date,
            Unit: this.unitInputRef.current.value,
            JustificationFileNumber: this.justificationFileNumberInputRef.current.value,
            Imported: this.importedInputRef.current.value,
            Exported: this.exportedInputRef.current.value,
            Remaining: this.remainingInputRef.current.value,
            Comments: this.commentsInputRef.current.value,
            MaterialTab: this.state.materialTab
        });
        ImportsExportsTbl.insertToApi(this.cancelTokenSource, importsExportsTbl).then(() => {
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

    componentDidMount(): void {
        this.setState({
            materialTab: null
        });
    }
    componentDidUpdate(prevProps: ImportsExportsTblAddProps): void {
        if (prevProps.openAddDrawer !== this.props.openAddDrawer) {
            this.setState({
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
                <TextField id="datetime-local" label="Ημερομηνία" type="datetime-local" value={this.state.date}
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
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΜΟΝΑΔΑ" inputRef={this.unitInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΑΡΙΘΜΟΣ ΔΙΚΑΙΟΛΟΓΗΣΗ ΑΡΧΕΙΟΥ" inputRef={this.justificationFileNumberInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΕΙΣΑΧΘΗΚΕ" type="number" inputRef={this.importedInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΕΞΑΧΘΗΚΕ" type="number" inputRef={this.exportedInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΥΠΟΛΟΙΠΟ" type="number" inputRef={this.remainingInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΣΧΟΛΙΑ" inputRef={this.commentsInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openAddDrawer} >
                <Card className="drawer-card">
                    <CardHeader title="Προσθήκη Υποσυγκροτήματος" style={{textAlign: "center"}} />
                    <CardContent className="drawer-cardcontent">
                        <form id="myform" onSubmit={this.onAddSave.bind(this)} style={{flexGrow: 1}}>
                            <fieldset className="fieldset-textfields">
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

export interface ImportsExportsTblAddProps {
    openAddDrawer: boolean;
    onAddSave?: () => void;
    onAddCancel?: () => void;
}

interface ImportsExportsTblAddState {
    loading: boolean;
    errorSnackbarOpen: boolean;
    date: string;
    materialTab: MaterialTab;
}
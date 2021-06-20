import React, { ReactNode } from "react";
import { Card, Button, TextField, FormControlLabel, MenuItem, InputLabel, Grid, Drawer, CardHeader, CardContent, CardActions, Backdrop, CircularProgress, Checkbox } from "@material-ui/core";
import { CancelTokenSource } from "axios";

import { ApiConsumer } from "../../../ApiConsumer";
import { MaterialTab } from "../../../entities/MaterialTab";
import { Group } from "../../../entities/Group";
import { GroupSingleDataGrid } from "../Groups/GroupSingleDataGrid";
import { Category } from "../../../entities/Category";
import { CategorySingleDataGrid } from "../Categories/CategorySingleDataGrid";
import { MySnackbar } from "../../components/MySnackbar";

export class MaterialTabsAdd extends React.Component<MaterialTabsAddProps, MaterialTabsAddState> {
    state: Readonly<MaterialTabsAddState>;
    cancelTokenSource: CancelTokenSource;
    cancelTokenSource2: CancelTokenSource;
    partialRegistryCodeInputRef: React.RefObject<HTMLInputElement>;
    AOEFInputRef: React.RefObject<HTMLInputElement>;
    nameInputRef: React.RefObject<HTMLInputElement>;
    commentsInputRef: React.RefObject<HTMLInputElement>;
    generalRegistryCodeInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: MaterialTabsAddProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.cancelTokenSource2 = ApiConsumer.getCancelTokenSource();
        this.partialRegistryCodeInputRef = React.createRef<HTMLInputElement>();
        this.AOEFInputRef = React.createRef<HTMLInputElement>();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.commentsInputRef = React.createRef<HTMLInputElement>();
        this.generalRegistryCodeInputRef = React.createRef<HTMLInputElement>();

        this.state = {
            loading: false,
            errorSnackbarOpen: false,
            errorMessage: "",
            PartialRegistryCodeNumber: null,
            PartialRegistryCode: "",
            measurementUnit: "",
            materialWithoutTab: false,
            currentMaterialTab: false,
            group: null,
            category: null
        };
    }

    onAddSave(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({loading: true});
        this.cancelTokenSource.cancel("cancel sending data");
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        const materialTab = MaterialTab.fromObject({
            Id: null,
            PartialRegistryCode: this.state.PartialRegistryCode,
            AOEF: this.AOEFInputRef.current.value,
            Name: this.nameInputRef.current.value,
            MeasurementUnit: this.state.measurementUnit,
            Comments: this.commentsInputRef.current.value,
            GeneralRegistryCode: this.generalRegistryCodeInputRef.current.value,
            MaterialWithoutTab: this.state.materialWithoutTab,
            CurrentMaterialTab: this.state.currentMaterialTab,
            Group: this.state.group,
            Category: this.state.category
        });
        MaterialTab.insertToApi(this.cancelTokenSource, materialTab).then(() => {
            this.setState({loading: false});
            if (this.props.onAddSave) {
                this.props.onAddSave();
            }
            this.setState({errorMessage: ""});
        }).catch((error) => {
            console.log(error.response);
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

    calcPartialRegistryCode(group: Group): void {
        this.cancelTokenSource2.cancel("cancel sending data");
        this.cancelTokenSource2 = ApiConsumer.getCancelTokenSource();
        const materialTabsWithGroup = MaterialTab.listFromApi(this.cancelTokenSource2 ,null, null, null, null, null, group.Id, null, null, null).then((materialTabsWithGroup) => {
            let max = 0;
            for (const materialTab of materialTabsWithGroup) {
                if (!materialTab.MaterialWithoutTab) {
                    const ef24Splited = materialTab.PartialRegistryCode.split("-");
                    let ef24Number = 0;
                    try {
                        ef24Number = parseInt(ef24Splited[1]);
                    } finally {
                        if (ef24Number > max) {
                            max = ef24Number;
                        }
                    }
                }
            }
            this.setState({PartialRegistryCode: `${group.Name}-${1+max}`});
        });
    }

    onGroupSelect(group: Group): void {
        this.setState({
            group: group,
            PartialRegistryCodeNumber: 1 + group.LastRegistryCode
        });
        this.calcPartialRegistryCode(group);
    }
    onGroupRemove(): void {
        this.setState({
            group: null,
            PartialRegistryCodeNumber: null
        });
    }

    onCategorySelect(category: Category): void {
        this.setState({category: category});
    }
    onCategoryRemove(): void {
        this.setState({category: null});
    }

    componentDidMount(): void {
        this.setState({
            group: null,
            category: null
        });
    }
    componentDidUpdate(prevProps: MaterialTabsAddProps, prevState: MaterialTabsAddState): void {
        if (prevProps.openAddDrawer !== this.props.openAddDrawer) {
            this.setState({
                group: null,
                category: null
            });
        }
        if (prevState.materialWithoutTab !== this.state.materialWithoutTab && !this.state.materialWithoutTab && this.state.group !== null) {
            this.calcPartialRegistryCode(this.state.group);
        }
    }

    render(): ReactNode {
        if (!this.props.openAddDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="row" justify="space-evenly" alignContent="center" alignItems="center">
                <Grid item>
                    <Grid container direction="column" justify="center" alignContent="center" alignItems="center">
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΑΑΜΜ" type="number" disabled value={this.state.PartialRegistryCodeNumber} />
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΕΦ24" disabled={!this.state.materialWithoutTab} value={this.state.PartialRegistryCode} onChange={(e) => this.setState({PartialRegistryCode: e.target.value})} />
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΑΟΕΦ" inputRef={this.AOEFInputRef} />
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ*" inputRef={this.nameInputRef} />
                        <TextField select size="small" InputLabelProps={{ shrink: true }} id="selectMeasurementUnit" label="ΜΟΝΑΔΑ ΜΕΤΡΗΣΗΣ"
                            value={this.state.measurementUnit}
                            onChange={(event: React.ChangeEvent<{ value: any }>) => {
                                this.setState({measurementUnit: event.target.value});
                            }}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="ΤΕΜ">ΤΕΜ</MenuItem>
                            <MenuItem value="ΖΕΥΓΗ">ΖΕΥΓΗ</MenuItem>
                            <MenuItem value="ΣΕΤ">ΣΕΤ</MenuItem>
                            <MenuItem value="ΜΕΤΡΑ">ΜΕΤΡΑ</MenuItem>
                            <MenuItem value="ΚΙΛΑ">ΚΙΛΑ</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="column" justify="center" alignContent="center" alignItems="center">
                        <TextField multiline rows={4} size="small" InputLabelProps={{ shrink: true }} label="ΠΑΡΑΤΗΡΗΣΕΙΣ" inputRef={this.commentsInputRef} />
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΓΕΝΙΚΟ ΜΗΤΡΩΟ" type="number" inputRef={this.generalRegistryCodeInputRef} />
                        <FormControlLabel
                            control={
                                <Checkbox size="small" value={this.state.materialWithoutTab} onChange={() => this.setState({materialWithoutTab: !this.state.materialWithoutTab})} />
                            }
                            label="ΧΩΡΙΣ ΚΑΡΤΕΛΑ"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox size="small" value={this.state.currentMaterialTab} onChange={() => this.setState({currentMaterialTab: !this.state.currentMaterialTab})} />
                            }
                            label="ΤΡΕΧΟΥΣΑ ΚΑΡΤΕΛΑ"
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="column" justify="center" alignContent="center" alignItems="center">
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΥΠΟΛΟΙΠΟ ΚΑΡΤΕΛΑΣ" type="number" value={0} disabled />
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΣΥΝΟΛΟ" type="number" value={0} disabled />
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΔΙΑΦΟΡΑ" type="number" value={0} disabled />
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΣΥΝΟΛΟ ΕΙΣΑΓΩΓΩΝ" type="number" value={0} disabled />
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΣΥΝΟΛΟ ΕΞΑΓΩΓΩΝ" type="number" value={0} disabled />
                        <TextField size="small" InputLabelProps={{ shrink: true }} label="ΕΥΡΕΘΕΝΤΑ" type="number" value={0} disabled />
                    </Grid>
                </Grid>
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openAddDrawer} >
                <Card className="drawer-card">
                    <CardHeader title="Προσθήκη Καρτέλας Υλικού" style={{textAlign: "center"}} />
                    <CardContent className="drawer-cardcontent">
                        <form id="myform" onSubmit={this.onAddSave.bind(this)} style={{flexGrow: 1}}>
                            <fieldset className="fieldset-textfields">
                                <legend>Στοιχεία Καρτέλας Υλικού:</legend>
                                {textfields}
                            </fieldset>
                            <fieldset style={{display: "flex", height: "270px"}}>
                                <legend>Ομάδα*:</legend>
                                <GroupSingleDataGrid group={this.state.group}
                                    onRemoveClick={this.onGroupRemove.bind(this)}
                                    onSelectClick={this.onGroupSelect.bind(this)}
                                    storagePrefix="materialtabs_single"
                                />
                            </fieldset>
                            <fieldset style={{display: "flex", height: "270px"}}>
                                <legend>Συγκρότημα*:</legend>
                                <CategorySingleDataGrid category={this.state.category}
                                    onRemoveClick={this.onCategoryRemove.bind(this)}
                                    onSelectClick={this.onCategorySelect.bind(this)}
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
                    message={`Αποτυχία προσθήκης!${this.state.errorMessage}`}
                />
            </Drawer>
        );
    }
}

export interface MaterialTabsAddProps {
    openAddDrawer: boolean;
    onAddSave?: () => void;
    onAddCancel?: () => void;
}

interface MaterialTabsAddState {
    loading: boolean;
    errorSnackbarOpen: boolean;
    errorMessage: string;
    PartialRegistryCodeNumber: number;
    PartialRegistryCode: string;
    measurementUnit: string;
    materialWithoutTab: boolean;
    currentMaterialTab: boolean;
    group: Group;
    category: Category;
}
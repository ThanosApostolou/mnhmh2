import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardContent, CardActions, Backdrop, CircularProgress } from "@material-ui/core";
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
    partialRegistryCodeInputRef: React.RefObject<HTMLInputElement>;
    AOEFInputRef: React.RefObject<HTMLInputElement>;
    nameInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: MaterialTabsAddProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.partialRegistryCodeInputRef = React.createRef<HTMLInputElement>();
        this.AOEFInputRef = React.createRef<HTMLInputElement>();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.state = {
            loading: false,
            errorSnackbarOpen: false,
            errorMessage: "",
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
            PartialRegistryCode: this.partialRegistryCodeInputRef.current.value,
            AOEF: this.AOEFInputRef.current.value,
            Name: this.nameInputRef.current.value,
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

    onGroupSelect(group: Group): void {
        this.setState({group: group});
    }
    onGroupRemove(): void {
        this.setState({group: null});
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
    componentDidUpdate(prevProps: MaterialTabsAddProps): void {
        if (prevProps.openAddDrawer !== this.props.openAddDrawer) {
            this.setState({
                group: null,
                category: null
            });
        }
    }

    render(): ReactNode {
        if (!this.props.openAddDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΕΦ24" inputRef={this.partialRegistryCodeInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΑΟΕΦ" inputRef={this.AOEFInputRef} />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ" inputRef={this.nameInputRef} />
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
                                <legend>Ομάδα:</legend>
                                <GroupSingleDataGrid group={this.state.group}
                                    onRemoveClick={this.onGroupRemove.bind(this)}
                                    onSelectClick={this.onGroupSelect.bind(this)}
                                    storagePrefix="materialtabs_single"
                                />
                            </fieldset>
                            <fieldset style={{display: "flex", height: "270px"}}>
                                <legend>Συγκρότημα:</legend>
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
    group: Group;
    category: Category;
}
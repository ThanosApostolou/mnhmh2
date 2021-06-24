import React, { ReactNode } from "react";
import { Card, Button, TextField, Grid, Drawer, CardHeader, CardActions, Backdrop, CircularProgress, Tabs, Tab, CardContent } from "@material-ui/core";

import { ApiConsumer } from "../../../ApiConsumer";
import { CancelTokenSource } from "axios";
import { Category } from "../../../entities/Category";
import { TabPanel, a11yProps } from "../../components/TabPanel";
import { MySnackbar } from "../../components/MySnackbar";
import { CategoriesEditMaterialTabs } from "./CategoriesEditMaterialTabs";

export class CategoriesEdit extends React.Component<CategoriesEditProps, CategoriesEditState> {
    state: Readonly<CategoriesEditState>;
    cancelTokenSource: CancelTokenSource;
    nameInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: CategoriesEditProps) {
        super(props);
        this.cancelTokenSource = ApiConsumer.getCancelTokenSource();
        this.nameInputRef = React.createRef<HTMLInputElement>();
        this.state = {
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
        const category = Category.fromObject({
            Id: this.props.category.Id,
            Name: this.nameInputRef.current.value
        });
        Category.updateInApi(this.cancelTokenSource, category).then(() => {
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
        Category.deleteInApi(this.cancelTokenSource, this.props.category.Id).then(() => {
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

    render(): ReactNode {
        if (!this.props.openEditDrawer) {
            return null;
        }
        const textfields =
            <Grid container direction="column" justify="flex-start" alignContent="center" alignItems="center">
                <TextField size="small" InputLabelProps={{ shrink: true }} label="Id" type="number" value={this.props.category.Id} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΣΕΙΡΙΑΚΟΣ ΑΡΙΘΜΟΣ" value={this.props.category.SerialNumber} disabled />
                <TextField size="small" InputLabelProps={{ shrink: true }} label="ΟΝΟΜΑ*" defaultValue={this.props.category.Name} inputRef={this.nameInputRef} />
            </Grid>
        ;
        return (
            <Drawer anchor="right" open={this.props.openEditDrawer} >
                <Card className="drawer-card">
                    <CardHeader title={`Τροποποίηση Συγκροτήματος: ${this.props.category.Name}`} style={{textAlign: "center"}} />
                    <Tabs value={this.state.tabValue} onChange={(event: React.ChangeEvent<any>, newValue: number) => this.setState({tabValue: newValue})} >
                        <Tab label="Στοιχεία" value={0} {...a11yProps(0)} />
                        <Tab label="Καρτέλες Υλικού" value={1} {...a11yProps(1)} />
                    </Tabs>
                    <CardContent className="drawer-cardcontent">
                        <TabPanel value={this.state.tabValue} index={0} style={{flexGrow: 1}}>
                            <form id="myform" onSubmit={this.onEditSave.bind(this)} style={{flexGrow: 1}}>
                                <fieldset style={{display: "flex"}}>
                                    <legend>Στοιχεία Συγκροτήματος:</legend>
                                    {textfields}
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
                                    <legend>Καρτέλες υλικού του συγκροτήματος:</legend>
                                    <CategoriesEditMaterialTabs category={this.props.category} />
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
                    message={`Αποτυχία τροποποίησης συγκροτήματος!${this.state.errorMessage}`}
                />
            </Drawer>
        );
    }
}

export interface CategoriesEditProps {
    category: Category;
    openEditDrawer: boolean;
    onEditSave?: () => void;
    onEditDelete?: () => void;
    onEditCancel?: () => void;
}

interface CategoriesEditState {
    loading: boolean;
    errorSnackbarOpen: boolean;
    errorMessage: string;
    tabValue: number;
}
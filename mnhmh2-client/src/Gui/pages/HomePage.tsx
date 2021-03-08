import React, { ReactNode } from "react";
import { Card, CardHeader, CardContent, CardMedia, Container, Grid, Button } from "@material-ui/core";
import { ArrowDropDown, ListAlt, MenuBook, CompareArrows, Whatshot, SupervisorAccount, Group, GroupWork, GroupWorkTwoTone, RecentActors, Store } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export class HomePage extends React.Component {
  
    render(): ReactNode {
        const styles = {
            largeIcon: {
                width: 128,
                height: 128,
            },    
        };
        return (
            <Container maxWidth="xl">
                <br />
                <Card elevation={24}>
                    <CardHeader title="ΒΑΣΙΚΕΣ ΛΕΙΤΟΥΡΓΙΕΣ" style={{ textAlign: "center" }} />
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button variant="contained" component={NavLink} to="/materialtabs" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΚΑΡΤΕΛΕΣ ΥΛΙΚΩΝ</h3>
                                <ListAlt style={styles.largeIcon} />
                            </Grid>
                        </Button>
                        <Button variant="contained" component={NavLink} to="/debitnotes" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΧΡΕΩΣΤΙΚΑ</h3>
                                <MenuBook style={styles.largeIcon} />
                            </Grid>
                        </Button>
                        <Button variant="contained" component={NavLink} to="/comparisons" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΣΥΓΚΡΙΤΙΚΕΣ</h3>
                                <CompareArrows style={styles.largeIcon} />
                            </Grid>
                        </Button>
                        <Button variant="contained" component={NavLink} to="/compounds" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΣΥΓΚΡΟΤΗΜΑΤΑ</h3>
                                <GroupWork style={styles.largeIcon} />
                            </Grid>
                        </Button>
                        <Button variant="contained" component={NavLink} to="/subcompounds" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΥΠΟΣΥΓΚΡΟΤΗΜΑΤΑ</h3>
                                <GroupWorkTwoTone style={styles.largeIcon} />
                            </Grid>
                        </Button>
                        <Button variant="contained" component={NavLink} to="/ammunition" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΠΥΡΟΜΑΧΙΚΑ</h3>
                                <Whatshot style={styles.largeIcon} />
                            </Grid>
                        </Button>
                        <Button variant="contained" component={NavLink} to="/ammunitionstores" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΑΠΟΘΗΚΕΣ</h3>
                                <Store style={styles.largeIcon} />
                            </Grid>
                        </Button>
                    </Grid>
                </Card>
                <br />
                <Card elevation={24}>
                    <CardHeader title="ΔΕΔΟΜΕΝΑ" style={{ textAlign: "center" }} />
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button variant="contained" component={NavLink} to="/borrowers" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΜΕΡΙΚΟΙ ΔΙΑΧΕΙΡΙΣΤΕΣ</h3>
                                <RecentActors style={styles.largeIcon} />
                            </Grid>
                        </Button>
                        <Button variant="contained" component={NavLink} to="/groups" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΟΜΑΔΕΣ</h3>
                                <Group style={styles.largeIcon} />
                            </Grid>
                        </Button>
                        <Button variant="contained" component={NavLink} to="/managers" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΕΠΙΤΡΟΠΗ</h3>
                                <SupervisorAccount style={styles.largeIcon} />
                            </Grid>
                        </Button>
                    </Grid>
                </Card>
            </Container>
        );
    }
}
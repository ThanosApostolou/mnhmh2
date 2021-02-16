import React from "react";
import { Card, CardHeader, CardContent, CardMedia, Container, Grid, Button } from "@material-ui/core";
import { ArrowDropDown, ListAlt, MenuBook, CompareArrows, Whatshot, SupervisorAccount, Group, GroupWork, GroupWorkTwoTone, RecentActors, Store } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export class HomePage extends React.Component {
  
    render() {
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
                    <CardHeader title="ΒΑΣΙΚΕΣ ΛΕΙΤΟΥΡΓΙΕΣ" />
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
                        <Button variant="contained" component={NavLink} to="/warehouses" style={{margin: "10px"}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <h3>ΑΠΟΘΗΚΕΣ</h3>
                                <Store style={styles.largeIcon} />
                            </Grid>
                        </Button>
                    </Grid>
                </Card>
                <br />
                <Card elevation={24}>
                    <CardHeader title="ΔΕΔΟΜΕΝΑ" />
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button component={NavLink} to="/partialmanagers">
                            <Card elevation={5}>
                                <CardHeader title="ΜΕΡΙΚΟΙ ΔΙΑΧΕΙΡΙΣΤΕΣ" />
                                <Grid container justify="center" alignItems="center">
                                    <CardMedia component={RecentActors} style={styles.largeIcon} />
                                </Grid>
                            </Card>
                        </Button>
                        <Button component={NavLink} to="/teams">              
                            <Card elevation={5}>
                                <CardHeader title="ΟΜΑΔΕΣ" />
                                <Grid container justify="center" alignItems="center">
                                    <CardMedia component={Group} style={styles.largeIcon} />
                                </Grid>
                            </Card>
                        </Button>
                        <Button component={NavLink} to="/commition">              
                            <Card elevation={5}>
                                <CardHeader title="ΕΠΙΤΡΟΠΗ" />
                                <Grid container justify="center" alignItems="center">
                                    <CardMedia component={SupervisorAccount} style={styles.largeIcon} />
                                </Grid>
                            </Card>
                        </Button>
                    </Grid>
                </Card>
            </Container>
        );
    }
}
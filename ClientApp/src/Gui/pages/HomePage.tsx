import React from "react";
import { Card, CardHeader, CardContent, CardMedia, Container, Grid, Button } from "@material-ui/core";
import { ArrowDropDown, ListAlt, MenuBook, CompareArrows, Whatshot, FolderOpen, Settings, AccountCircle, Group, GroupWork, GroupWorkTwoTone, RecentActors, Store } from '@material-ui/icons';
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
            <Button component={NavLink} to="/materialtabs">
              <Card elevation={5}>
                <CardHeader title="ΚΑΡΤΕΛΕΣ ΥΛΙΚΩΝ" />
                <Grid container justify="center" alignItems="center">
                  <CardMedia component={ListAlt} style={styles.largeIcon} />
                </Grid>
              </Card>
            </Button>
            <Button component={NavLink} to="/debitnotes">              
              <Card elevation={5}>
                <CardHeader title="ΧΡΕΩΣΤΙΚΑ" />
                <Grid container justify="center" alignItems="center">
                  <CardMedia component={MenuBook} style={styles.largeIcon} />
                </Grid>
              </Card>
            </Button>
            <Button component={NavLink} to="/comparisons">              
              <Card elevation={5}>
                <CardHeader title="ΣΥΓΚΡΙΤΙΚΕΣ" />
                <Grid container justify="center" alignItems="center">
                  <CardMedia component={CompareArrows} style={styles.largeIcon} />
                </Grid>
              </Card>
            </Button>
            <Button component={NavLink} to="/compounds">              
              <Card elevation={5}>
                <CardHeader title="ΣΥΓΚΡΟΤΗΜΑΤΑ" />
                <Grid container justify="center" alignItems="center">
                  <CardMedia component={GroupWork} style={styles.largeIcon} />
                </Grid>
              </Card>
            </Button>
            <Button component={NavLink} to="/subcompounds">              
              <Card elevation={5}>
                <CardHeader title="ΥΠΟΣΥΓΚΡΟΤΗΜΑΤΑ" />
                <Grid container justify="center" alignItems="center">
                  <CardMedia component={GroupWorkTwoTone} style={styles.largeIcon} />
                </Grid>
              </Card>
            </Button>
            <Button component={NavLink} to="/ammunition">              
              <Card elevation={5}>
                <CardHeader title="ΠΥΡΟΜΑΧΙΚΑ" />
                <Grid container justify="center" alignItems="center">
                  <CardMedia component={Whatshot} style={styles.largeIcon} />
                </Grid>
              </Card>
            </Button>
            <Button component={NavLink} to="/warehouses">              
              <Card elevation={5}>
                <CardHeader title="ΑΠΟΘΗΚΕΣ" />
                <Grid container justify="center" alignItems="center">
                  <CardMedia component={Store} style={styles.largeIcon} />
                </Grid>
              </Card>
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
                  <CardMedia component={GroupWorkTwoTone} style={styles.largeIcon} />
                </Grid>
              </Card>
            </Button>
          </Grid>
        </Card>
      </Container>
    );
  }
}
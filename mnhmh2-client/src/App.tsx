import React, { ReactNode } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, withRouter } from "react-router-dom";

import Header from "./Gui/components/Header";
import { Footer } from "./Gui/components/Footer";
import NotFoundPage from "./Gui/pages/NotFoundPage";
import { HomePage } from "./Gui/pages/HomePage";
import { MaterialTabsPage } from "./Gui/pages/MaterialTabsPage";
import { DebitNotesPage } from "./Gui/pages/DebitNotesPage";
import { ComparisonsPage } from "./Gui/pages/ComparisonsPage";
import { AmmunitionPage } from "./Gui/pages/AmmunitionPage";
import { TeamsPage } from "./Gui/pages/TeamsPage";
import { Compounds } from "./Gui/pages/Compounds";
import { SubCompounds } from "./Gui/pages/SubCompounds";
import { PartialManagers } from "./Gui/pages/PartialManagers";
import { Commition } from "./Gui/pages/Commition";
import { Warehouses } from "./Gui/pages/Warehouses";
import { ThemeProvider } from "@material-ui/core/styles";
import { Paper, Box } from "@material-ui/core";

import "./index.css";
import { SettingsManager } from "./SettingsManager";
import { ThemeManager } from "./Gui/ThemeManager";

class App extends React.Component<any, any> {
    static app: App;
    thememanager: ThemeManager;
    settingsmanager: SettingsManager;

    constructor(props: any) {
        super(props);
        App.app = this;
        (window as any).app = App.app;
        this.settingsmanager = new SettingsManager();
        this.settingsmanager.init();
        this.thememanager = new ThemeManager();
        this.thememanager.init();
        console.log((window as any).settings);
    }

    render(): ReactNode {
        return (
            <ThemeProvider theme={this.thememanager.theme}>
                <Paper style={{"minHeight": "100vh"}}>
                    <Router>
                        <Header />

                        <Switch>
                            <Route path="/materialtabs">
                                <MaterialTabsPage />
                            </Route>
                            <Route path="/debitnotes">
                                <DebitNotesPage />
                            </Route>
                            <Route path="/comparisons">
                                <ComparisonsPage />
                            </Route>
                            <Route path="/ammunition">
                                <AmmunitionPage />
                            </Route>
                            <Route path="/teams">
                                <TeamsPage />
                            </Route>
                            <Route path="/compounds">
                                <Compounds />
                            </Route>
                            <Route path="/subcompounds">
                                <SubCompounds />
                            </Route>
                            <Route path="/partialmanagers">
                                <PartialManagers />
                            </Route>
                            <Route path="/commition">
                                <Commition />
                            </Route>
                            <Route path="/warehouses">
                                <Warehouses />
                            </Route>
                            <Route path="/" exact>
                                <HomePage />
                            </Route>
                            <Route>
                                <NotFoundPage />
                            </Route>
                        </Switch>

                    </Router>
                </Paper>
            </ThemeProvider>
        );
    }
}

export default App;

import React, { ReactNode } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, withRouter } from "react-router-dom";

import Header from "./Gui/components/Header";
import { Footer } from "./Gui/components/Footer";
import NotFoundPage from "./Gui/pages/NotFoundPage";
import { HomePage } from "./Gui/pages/HomePage";
import { MaterialTabsPage } from "./Gui/pages/MaterialTabsPage";
import { DistributionChargesPage } from "./Gui/pages/DistributionChargesPage";
import { ComparisonsPage } from "./Gui/pages/ComparisonsPage";
import { AmmunitionStoresPage } from "./Gui/pages/AmmunitionStoresPage";
import { AmmunitionPage } from "./Gui/pages/AmmunitionPage";
import { GroupsPage } from "./Gui/pages/GroupsPage";
import { CategoriesPage } from "./Gui/pages/CategoriesPage";
import { SubCompounds } from "./Gui/pages/SubCompounds";
import { ManagersPage } from "./Gui/pages/ManagersPage";
import { BorrowersPage } from "./Gui/pages/BorrowersPage";
import { Warehouses } from "./Gui/pages/Warehouses";
import { ThemeProvider } from "@material-ui/core/styles";
import { Paper, Box } from "@material-ui/core";

import "./index.css";
import { SettingsManager } from "./SettingsManager";
import { ThemeManager } from "./Gui/ThemeManager";
import { ApiConsumer } from "./ApiConsumer";

class App extends React.Component<any, any> {
    static app: App;
    thememanager: ThemeManager;
    settingsmanager: SettingsManager;
    apiconsumer: ApiConsumer;

    constructor(props: any) {
        super(props);
        App.app = this;
        (window as any).app = App.app;
        this.thememanager = new ThemeManager();
        this.thememanager.init();
        this.apiconsumer = new ApiConsumer();
        this.settingsmanager = new SettingsManager();
        this.settingsmanager.init();
        console.log((window as any).settings);
        this.state = {
            thememanager: this.thememanager
        };

        this.apiconsumer.axios.get("/").then((res) => {
            console.log(res);
        });
    }

    render(): ReactNode {
        const bodycolor= this.state.thememanager.type === "dark" ? "#606060" : "#D3D3D3";
        return (            
            <ThemeProvider theme={this.state.thememanager.theme}>     
                <Router>
                    
                    <div style={{height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch"}}>
                        <div>
                            <Header />
                        </div>
                        <div style={{flexGrow: 1, backgroundColor: bodycolor}}>
                            <Switch>
                                <Route path="/materialtabs">
                                    <MaterialTabsPage />
                                </Route>
                                <Route path="/distributioncharges">
                                    <DistributionChargesPage />
                                </Route>
                                <Route path="/comparisons">
                                    <ComparisonsPage />
                                </Route>
                                <Route path="/ammunition">
                                    <AmmunitionPage />
                                </Route>
                                <Route path="/categories">
                                    <CategoriesPage />
                                </Route>
                                <Route path="/subcompounds">
                                    <SubCompounds />
                                </Route>
                                <Route path="/ammunitionstores">
                                    <AmmunitionStoresPage />
                                </Route>
                                <Route path="/borrowers">
                                    <BorrowersPage />
                                </Route>
                                <Route path="/groups">
                                    <GroupsPage />
                                </Route>
                                <Route path="/managers">
                                    <ManagersPage />
                                </Route>
                                <Route path="/" exact>
                                    <HomePage />
                                </Route>
                                <Route>
                                    <NotFoundPage />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;

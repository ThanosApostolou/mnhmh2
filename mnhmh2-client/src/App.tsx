import React, { ReactNode } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Gui/components/Header";
import NotFoundPage from "./Gui/pages/NotFoundPage";
import { HomePage } from "./Gui/pages/HomePage";
import { MaterialTabsPage } from "./Gui/pages/MaterialTabsPage";
import { DirectMaterialBorrowersPage } from "./Gui/pages/DirectMaterialBorrowersPage";
import { ImportsExportsTblPage } from "./Gui/pages/ImportsExportsTblPage";
import { AmmunitionStoresPage } from "./Gui/pages/AmmunitionStores/AmmunitionStoresPage";
import { AmmunitionPortionsPage } from "./Gui/pages/AmmunitionPortions/AmmunitionPortionsPage";
import { GroupsPage } from "./Gui/pages/Groups/GroupsPage";
import { CategoriesPage } from "./Gui/pages/Categories/CategoriesPage";
import { SubcategoriesPage } from "./Gui/pages/Subcategories/SubcategoriesPage";
import { ManagersPage } from "./Gui/pages/Managers/ManagersPage";
import { BorrowersPage } from "./Gui/pages/Borrowers/BorrowersPage";
import { ThemeProvider } from "@material-ui/core/styles";

import "./index.css";
import { SettingsManager } from "./SettingsManager";
import { ThemeManager } from "./Gui/ThemeManager";
import { ApiConsumer } from "./ApiConsumer";

class App extends React.Component<Record<string, never>, any> {
    static app: App;
    thememanager: ThemeManager;
    settingsmanager: SettingsManager;
    apiconsumer: ApiConsumer;

    constructor(props: Record<string, never>) {
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
            thememanager: this.thememanager,
            settingsmanager: this.settingsmanager
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
                                <Route path="/directmaterialborrowers">
                                    <DirectMaterialBorrowersPage />
                                </Route>
                                <Route path="/importsexportstbl">
                                    <ImportsExportsTblPage />
                                </Route>
                                <Route path="/ammunitionportions">
                                    <AmmunitionPortionsPage />
                                </Route>
                                <Route path="/categories">
                                    <CategoriesPage />
                                </Route>
                                <Route path="/subcategories">
                                    <SubcategoriesPage />
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

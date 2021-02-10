import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, withRouter } from "react-router-dom";

import logo from "./resources/logo.svg";
import "./App.css";

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

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="App">
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
            <Route path="/**" exact>
              <NotFoundPage />
            </Route>
          </Switch>

        </Router>
      </div>
    );
  }
}

export default App;

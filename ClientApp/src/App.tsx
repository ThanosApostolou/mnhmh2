import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, withRouter } from "react-router-dom";

import logo from "./resources/logo.svg";
import "./App.css";

import Header from "./Gui/Header";
import { HomePage } from "./Gui/HomePage";
import { MaterialTabsPage } from "./Gui/MaterialTabsPage";
import { DebitNotesPage } from "./Gui/DebitNotesPage";
import { ComparisonsPage } from "./Gui/ComparisonsPage";
import { AmmunitionPage } from "./Gui/AmmunitionPage";

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
            <Route path="/" exact>
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

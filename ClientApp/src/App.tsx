import React from 'react';
import logo from './logo.svg';
import './App.css';

import { HomePage } from './Gui/HomePage';
import { ArmoryPage } from './Gui/ArmoryPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

const name: string = "Thanoss";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                    {name} edit <code>src/App.tsx</code> and save to reload!
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn Reactaaaa
                    </a>
                </header>

                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/armory">Armory</Link>
                            </li>
                        </ul>

                    <Switch>
                        <Route path="/armory">
                            <ArmoryPage />
                        </Route>
                        <Route path="/" component={HomePage}>
                            <HomePage />
                        </Route>
                    </Switch>
                    </div>
                </Router>
              </div>
            );
      }
};

export default App;

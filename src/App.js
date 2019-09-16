import React from 'react';
import './styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Notfound from './components/404'
import Navbar from './components/navbar'
import Owners from './views/owners'
import Cars from './views/cars'
import Statistics from './views/statistics'

function App() {
  return (
    <div className="app">
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Redirect exact from="/" to="/owners" component={Owners}/>
            <Route path="/cars" component={Cars} />
            <Route exact path="/owners/" component={Owners} />
            <Route path="/owners/:id" component={Owners} />
            <Route path="/statistics" component={Statistics} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

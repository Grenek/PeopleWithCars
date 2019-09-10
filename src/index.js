import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './styles/style.scss';
import App from './App';
import Cars from './views/cars';
import Owners from './views/owners';
import Statistics from './views/statistics';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/cars" component={Cars} />
        <Route path="/owners" component={Owners} />
        <Route path="/statistics" component={Statistics} />
      </div>
    </Router>
  )

ReactDOM.render(<App />, document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, BrowserRouter as Router } from 'react-router-dom'
import './styles/style.scss';
import App from './App';
// import Cars from './views/cars';
// import Owners from './views/owners';
// import Statistics from './views/statistics';

// const routing = (
//     <Router>
//         <Route exact path="/" component={App} />
//         <Route path="/cars" component={Cars} />
//         <Route path="/owners" component={Owners} />
//         <Route path="/statistics" component={Statistics} />
//     </Router>
//   )

ReactDOM.render(<App />, document.getElementById('root'));


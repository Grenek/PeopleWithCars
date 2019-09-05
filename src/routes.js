import React from 'react';
import { Router, Route } from 'react-router';
import Cars from './views/cars';
import Owners from './views/owners';
import Statistics from './views/statistics';
import AddOwner from './components/addOwner';
import DetailedInfo from './components/detailedInfo'

<Switch>
    <Route path="/owners" exact component={Owners} />
    <Route path="/cars" exact component={Cars} />
    <Route path="/statistics" exact component={Statistics} />
</Switch>
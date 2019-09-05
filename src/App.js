import React from 'react';
import './styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar'

import Owners from './views/owners'

function App() {
  return (
      <div className="App">
        <Navbar />
        <Owners/>
      </div>
  );
}

export default App;

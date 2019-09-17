import React from 'react';
import '../styles/style.scss';
import BrandsList from '../components/brandsList'

function Cars() {
  return (
    <div className="Cars">
      <h1>Cars page</h1>
      <BrandsList/>
    </div>
  );
}

export default Cars;
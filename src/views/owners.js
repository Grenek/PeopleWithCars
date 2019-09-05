import React from 'react';
import '../styles/style.scss';
import DetailedInfo from '../components/detailedInfo'
import SearchOwner from '../components/searchOwner'

class Owners extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  getIdFromSearchOwner = (data) => this.setState({...data})

  render() {
    return (
      <div className="owners">
        <SearchOwner info={this.getIdFromSearchOwner}/>
        <DetailedInfo peopleWitchCars={this.state}/>
      </div>
    );
  }
}


export default Owners;
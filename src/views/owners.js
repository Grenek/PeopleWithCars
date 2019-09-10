import React from 'react';
import '../styles/style.scss';
import DetailedInfo from '../components/detailedInfo'
import SearchOwner from '../components/searchOwner'
import LastOwners from '../components/lastOwners'

class Owners extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  getIdFromSearchOwner = (data) => this.setState({ ...data })

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  componentToRender() {
    if (this.isEmpty(this.state)) {
      return <LastOwners />
    } else {
      return <DetailedInfo peopleWitchCars={this.state} />
    }
  }

  render() {
    return (
      <div className="owners">
        
        <SearchOwner info={this.getIdFromSearchOwner} />
        {this.componentToRender()}
      </div>
    );
  }
}

export default Owners;
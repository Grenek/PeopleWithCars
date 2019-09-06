import React from 'react';
import '../styles/style.scss';
// import DetailedInfo from '../components/detailedInfo'
import SearchOwner from '../components/searchOwner'
import LastOwners from '../components/lastOwners'

class Owners extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  getIdFromSearchOwner = (data) => this.setState({ ...data })

  render() {
    return (
      <div className="owners">
        <SearchOwner info={this.getIdFromSearchOwner} />
        <LastOwners />
        {/* <DetailedInfo peopleWitchCars={this.state}/> */}
      </div>
    );
  }
}


export default Owners;
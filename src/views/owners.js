import React from 'react';
import '../styles/style.scss';
import DetailedInfo from '../components/detailedInfo'
import SearchOwner from '../components/searchOwner'
import Owner from '../components/owner'
import LastOwners from '../components/lastOwners'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Owners extends React.Component {
   constructor() {
      super()
      this.state = {
         id: []
      }
   }

   componentDidMount() {
      this.getLast3IDs()
   }

   getIDFromSearchBar = (idFromSearchBar) => {this.setState({id: [idFromSearchBar]})}

   getLast3IDs() {
      axios
         .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
         .then(response => {
            this.setState({ id: response.data.slice(response.data.length - 3, response.data.length) })
         })
   }

   render() {
      return (
         <div className="owners">
            <SearchOwner myCallback={this.getIDFromSearchBar}/>
            {this.state.id.map((id, index) => {
               return (<Owner key={index} ids={id} />)
            })}
         </div>
      );
   }
}

export default Owners;
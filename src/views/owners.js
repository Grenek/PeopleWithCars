import React from 'react';
import '../styles/style.scss';
import DetailedInfo from '../components/detailedInfo'
import SearchOwner from '../components/searchOwner'
import LastOwners from '../components/lastOwners'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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

   componentDidMount() {
      this._isMounted = true
      let isnum = /^\d+$/.test(this.props.match.params.id);
      if (typeof this.props.match.params.id !== "undefined" && isnum) {
         axios
            .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
               params: {
                  personid: this.props.match.params.id
               }
            })
            .then(response => {
               if (this._isMounted) {
                  this.setState({ ...response.data })
               }
            })
            .catch(error => {
               confirmAlert({
                  message: 'Пользователь с таким ID не найден',
                  buttons: [
                     {
                        label: 'Хорошо, я понял',
                     }
                  ]
               });
            })
      }
      else if (!this.isEmpty(this.props.match.params)) {
         confirmAlert({
            message: 'Введите корректный ID',
            buttons: [
               {
                  label: 'Хорошо, я понял',
               }
            ]
         });
      }
   }

   componentWillUnmount() {
      this._isMounted = false
   }

   componentToRender() {
      if (this.props.history.location.pathname === "/owners" && this.isEmpty(this.state)) {
         return <LastOwners />
      } else {
         // this.props.history.push(`/owners/${this.state.id}`)
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
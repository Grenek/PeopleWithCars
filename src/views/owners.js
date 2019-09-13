import React from 'react';
import '../styles/style.scss';
import SearchOwner from '../components/searchOwner'
import Owner from '../components/owner'
import axios from 'axios'

// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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

   isNumeric(num) {
      return !isNaN(num)
   }

   // берем ID который нам передал searchOwner и пушим его в url и state
   getIDFromSearchBar = (idFromSearchBar) => {
      this.props.history.push(`/owners/${idFromSearchBar}`)
      this.setState({
         id: [idFromSearchBar]
      })
   }

   if404 = () => {
      this.setState({triggered404: true})
      this.props.history.push(`/owners/`)
   }

   // просто получаем последние 3 ID и записываем в state
   getLast3IDs() {
      axios
         .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
         .then(response => {
            this.setState({ id: response.data.slice(response.data.length - 3, response.data.length) })
         })
   }

   render() {
      // если id в state пустой или undefined(то есть когда нажали submit на пустой строке поиска или в когда owners только загрузилось) то
      // берем три последних ID, пробегаемся по этим ID и выводим трех owner
      if (this.state.id.includes("") || typeof this.state.id[0] === "undefined") {
         console.log("1")
         this.getLast3IDs()
         {
            this.state.id.map((id, index) => {
               return (<Owner key={index} ids={id} />)
            })
         }
      }

      // проверяем шо там в урле и если тама цЫфра, то выводим этого овнера
      if (this.isNumeric(this.props.match.params.id)) {
         console.log("2")
         return (
            <div className="owners">
               <SearchOwner myCallback={this.getIDFromSearchBar} />
               <Owner ids={this.props.match.params.id} shows={true} myCallback2={this.if404} />
            </div>
         )
      } else
         // если айдишников в state 0 (такое бывает при первом рендере) или больше 1 (что значит что мы не ищем пользователя), то соотв выводим список последних трех пользователей
         if ((this.state.id.length > 1 || this.state.id.length === 0) || this.state.notFound) {
            console.log("3")
            return (
               <div className="owners">
                  <SearchOwner myCallback={this.getIDFromSearchBar} />
                  {this.state.id.map((id, index) => {
                     return (<Owner key={index} ids={id} />)
                  })}
               </div>
            )
         } else
            if (this.state.triggered404) {
               this.getLast3IDs()
               return (<div className="owners">
                  
                  <SearchOwner myCallback={this.getIDFromSearchBar} />
                  {this.state.id.map((id, index) => {
                     return (<Owner key={index} ids={id} />)
                  })}
               </div>)
            }
            // если айдишников в стейте 1, это это значит что мы ищем конкретного пользователя
            else
               if (this.state.id.length === 1) {
                  console.log(this.props.match.params)
                  return (
                     <div className="owners">
                        <SearchOwner myCallback={this.getIDFromSearchBar} />
                        {this.state.id.map((id, index) => {
                           return (<Owner key={index} ids={id} shows={true} myCallback2={this.if404} />)
                        })}
                     </div>
                  )
               }
   }
}

export default Owners;
import React from 'react';
import axios from 'axios'
import AddOwner from '../components/addOwner'
import SearchOwner from '../components/searchOwner'
import Owner from '../components/owner'
import apiConfig from '../apiConfig'
import '../styles/style.scss';

class Owners extends React.Component {
   constructor() {
      super()
      this.state = {
         id: [],
         ids: [],
         triggered404: false,
         addOwnerTriggered: false
      }
   }

   // просто забираем список последних id
   componentDidMount() {
      this.getLast3IDs()
   }

   //тут приложение понимает что triggered404 уже не надо и ставит его false
   componentDidUpdate(prevState) {
      if (prevState.triggered404 === true) {
         this.setState({ triggered404: false })
      }
   }

   // берем ID который нам передал searchOwner и пушим его в url и state
   getIDFromSearchBar = (idFromSearchBar) => {
      if (typeof idFromSearchBar !== "undefined") {
         this.props.history.push(`/owners/${idFromSearchBar}`)
      }
      this.setState({
         id: [idFromSearchBar]
      })
   }

   // сюда addOwner передает сигнал что надо бы в url вбить /add
   pushAddToUrl = () => {
      this.props.history.push(`/owners/add`)
   }

   // сюда addOwner передает сигнал что надо бы из url убрать /add
   removeAddFromUrl = () => {
      this.props.history.push(`/owners/`)
   }

   // сюда owner передает сигнал что пользака то нема и возвращает на страничку owners
   if404 = () => {
      this.setState({ triggered404: true })
      this.props.history.push(`/owners/`)
   }

   // просто получаем последние 3 ID и записываем в state
   getLast3IDs() {
      axios
         .get(`${apiConfig.url}/getpersonlist`)
         .then(response => {
            this.setState({ ids: response.data.slice(response.data.length - 3, response.data.length) })
         })
   }

   render() {
      if (!isNaN(this.props.match.params.id)) {
         return (
            <div className="owners">
               <AddOwner myCallback3={this.pushAddToUrl} myCallback4={this.removeAddFromUrl} />
               <SearchOwner myCallback={this.getIDFromSearchBar} />
               {/* передаем id в owner, параметр show который отвечает за то, 
                  что список машин автоматически показывается и callback для 404 по пользователю */}
               <Owner ids={this.props.match.params.id} shows={true} myCallback2={this.if404} />
            </div>
         )
      } else {
         return (
            <div className="owners">
               <AddOwner myCallback3={this.pushAddToUrl} myCallback4={this.removeAddFromUrl} />
               <SearchOwner myCallback={this.getIDFromSearchBar} /> {/* вызываем searchbar и коллбэк чтобы добраться до того что вбили в поле */}
               {this.state.ids.map((id, index) => <Owner key={index} ids={id} />)}
            </div>
         )
      }
   }
}

export default Owners;
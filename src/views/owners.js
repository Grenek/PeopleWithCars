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

   // короче походу без этого работает

   // render3LastOwners() {
   //    if ((typeof this.props.match.params.id === "undefined" || // срабатывает на enter по пустой строке
   //       this.state.ids.length === 0 || // условие срабатывает когда приложение только загрузилось
   //       this.state.triggered404 || // срабатывает если юзера не нашли
   //       // this.state.id.includes("") ||
   //       // this.state.id === "" ||
   //       typeof this.state.id[0] === "undefined" // если в url после owners не число
   //    ) && isNaN(this.props.match.params.id)) { // условие нужно чтобы при наличии в url id которое является числом рендер последних трех не срабатывал
   //       return true
   //    }
   // }

   // берем ID который нам передал searchOwner и пушим его в url и state
   getIDFromSearchBar = (idFromSearchBar) => {
      this.props.history.push(`/owners/${idFromSearchBar}`)
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
      // if (this.render3LastOwners()) {
      //    return (
      //       <div className="owners">
      //          <AddOwner myCallback3={this.pushAddToUrl} myCallback4={this.removeAddFromUrl} />
      //          <SearchOwner myCallback={this.getIDFromSearchBar} /> {/* вызываем searchbar и коллбэк чтобы добраться до того что вбили в поле */}
      //          {this.state.ids.map((id, index) => <Owner key={index} ids={id} />)}
      //       </div>
      //    )
      // } else 
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
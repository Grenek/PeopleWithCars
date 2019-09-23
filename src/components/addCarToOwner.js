import React from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import Popup from 'reactjs-popup'
import Owner from './owner'
import SearchOwner from './searchOwner'
import apiConfig from '../apiConfig'
var moment = require('moment');

class AddCarToOwner extends React.Component {
   constructor() {
      super()
      this.state = {
         id: [],
         ids: [],
         errorText: "",
         chosenId: "",
         error18: ""
      }
   }

   componentDidMount() {
      this.getLast3IDs()
   }

   handleSubmit = (e) => {
      if (this.state.olderThan18) {
         let newCar = {}
         newCar.ownerId = this.state.chosenId
         newCar.model = `${this.props.brand}-${this.props.model}`
         newCar.horsepower = Math.floor(Math.random() * 1000) + 1

         axios({
            method: 'POST',
            url: `${apiConfig.url}/car`,
            data: newCar
         })
      } else {
         e.preventDefault()
         this.setState({error18: "Сказано же что 18+!"})
      }

   }

   handleClick = (e) => {

      // забираем id из класса html и записываем в state чтбы потом передать id дальше серверу
      let className = e.target.className
      let id = className.split(' ')[0];
      this.setState({ chosenId: id })

      // логика работы а ля radio button у списка пользователей
      let elems = document.querySelectorAll(".card-body");
      [].forEach.call(elems, function (el) {
         el.className = el.className.replace(/\bactive\b/, "");
      });
      e.target.classList.toggle('active')

      // заибарем возраст из html и проверяем на 18+
      let rawBirthdate = e.target.innerHTML.split(' ')[2]
      let birthdate = moment(rawBirthdate, 'DD.MM.YYYY')
      let now = moment()
      let ageIndays = now.diff(birthdate, 'days');
      if (ageIndays >= 6570) {
         this.setState({ olderThan18: true })
      } else {
         this.setState({ olderThan18: false, error18: "Извините у нас строго 18+" })
      }
   }

   getIdFromOwner = (id) => {
      this.setState({ chosenId: id })
   }

   if404 = () => {
      this.setState({ errorText: "Пользователь не найден" })
   }

   getIDFromSearchBar = (idFromSearchBar) => {
      this.setState({
         id: [idFromSearchBar],
         errorText: ""
      })
   }

   getLast3IDs() {
      axios
         .get(`${apiConfig.url}/getpersonlist`)
         .then(response => {
            this.setState({ ids: response.data.slice(response.data.length - 3, response.data.length) })
         })
   }

   render3LastOwners() {
      if ( // срабатывает на enter по пустой строке
         this.state.errorText !== "" ||
         this.state.ids.length === 0 || // условие срабатывает когда приложение только загрузилось
         this.state.triggered404 || // срабатывает если юзера не нашли
         this.state.id.includes("") ||
         this.state.id === "" || //вот тут не помню при каком условии срабатывает, но трогать не надо ибо работает
         typeof this.state.id[0] === "undefined") { // условие нужно чтобы при наличии в url id которое является числом рендер последних трех не срабатывал
         return true
      }
   }

   render() {
      if (this.render3LastOwners()) {
         return (
            <Popup trigger={<Button>+</Button>} modal on="focus">
               {close => (
                  <div>
                     <p>Добавление пользователя</p>
                     <SearchOwner myCallback={this.getIDFromSearchBar} />
                     <p>{this.state.errorText}</p>
                     <Form onSubmit={this.handleSubmit}>
                        {this.state.ids.map(id =>
                           <div key={id} onClick={this.handleClick}>
                              <Owner
                                 shows={false}
                                 addNewCarToOwner={true}
                                 ids={id} />
                           </div>
                        )}
                        <p>{this.state.error18}</p>
                        <p>{this.props.brand}</p>
                        <p>{this.props.model}</p>
                        <Button variant="primary" type="submit">
                           Ок
                        </Button>
                        <Button variant="primary" onClick={close}>
                           Отмена
                        </Button>
                     </Form>
                  </div>
               )}
            </Popup>
         )
      } else {
         return (
            <Popup trigger={<Button>+</Button>} modal on="focus">
               {close => (
                  <div>
                     <p>Добавление пользователя</p>
                     <SearchOwner myCallback={this.getIDFromSearchBar} />
                     <p>{this.state.errorText}</p>
                     <Form onSubmit={this.handleSubmit}>
                        <div onClick={this.handleClick}>
                           <Owner
                              ids={this.state.id[0]}
                              addNewCarToOwner={true}
                              shows={false}
                              myCallback2={this.if404} />
                        </div>
                        <p>{this.props.brand}</p>
                        <p>{this.props.model}</p>
                        <Button variant="primary" type="submit">
                           Ок
                        </Button>
                        <Button variant="primary" onClick={close}>
                           Отмена
                        </Button>
                     </Form>
                  </div>
               )}
            </Popup>
         )
      }
   }
}

export default AddCarToOwner
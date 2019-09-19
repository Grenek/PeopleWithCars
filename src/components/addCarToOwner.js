import React from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Popup from 'reactjs-popup'
import Owner from './owner'
import SearchOwner from './searchOwner'

class AddCarToOwner extends React.Component {
   constructor() {
      super()
      this.state = {
         id: [],
         ids: [],
         errorText: "",
         chosenId: ""
      }
   }

   componentDidMount() {
      this.getLast3IDs()
   }

   handleSubmit = () => {
      let newCar = {}
      let ownerId = this.state.chosenId
      let model = `${this.props.brand}-${this.props.model}`
      let horsepower = Math.floor(Math.random() * 1000) + 1  

      newCar.ownerId = ownerId
      newCar.model = model
      newCar.horsepower = horsepower
      axios({
         method: 'POST',
         url: 'http://172.30.215.172:8081/RESTfulWebApp/car',
         data: newCar
      });
   }

   handleClick = (e) => {
      let className = e.target.className
      let id = className.split(' ')[0];
      this.setState({chosenId: id})
      console.log(this.state.chosenId)
   }

   getIdFromOwner = (id) => {
      this.setState({ chosenId: id })
      // console.log(this.state.chosenId, "id")
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
         .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
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
                     {this.state.ids.map((id, index) =>
                        <div key={index} onClick={this.handleClick}>
                           <Owner
                              shows={false}
                              addNewCarToOwner={true}
                              key={index}
                              ids={id} />
                        </div>)}
                     <p>{this.props.brand}</p>
                     <p>{this.props.model}</p>
                     <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Ок
                     </Button>
                     <Button variant="primary" onClick={close}>
                        Отмена
                     </Button>
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
                  </div>
               )}
            </Popup>
         )
      }
   }
}

export default AddCarToOwner
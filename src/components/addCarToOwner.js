import React from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Popup from 'reactjs-popup'
import Owners from '../views/owners'
import Owner from './owner'
import SearchOwner from './searchOwner'

class AddCarToOwner extends React.Component {
   constructor() {
      super()
      this.state = {
         id: [],
         ids: [],
      }
   }

   componentDidMount() {
      this.getLast3IDs()
   }

   getIDFromSearchBar = (idFromSearchBar) => {
      this.setState({
         id: [idFromSearchBar]
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
         this.state.ids.length === 0 || // условие срабатывает когда приложение только загрузилось
         this.state.triggered404 || // срабатывает если юзера не нашли
         this.state.id.includes("") ||
         this.state.id === "" || //вот тут не помню при каком условии срабатывает, но трогать не надо ибо работает
         typeof this.state.id[0] === "undefined")  { // условие нужно чтобы при наличии в url id которое является числом рендер последних трех не срабатывал
         return true
      }
   }

   render() {
      // console.log(this.render3LastOwners())
      console.log(this.render3LastOwners())
      if (this.render3LastOwners()) {
         console.log("1")
         return (
            <Popup trigger={<Button>+</Button>} modal on="focus">
               {close => (
                  <div>
                     <p>Добавление пользователя</p>
                     <SearchOwner myCallback={this.getIDFromSearchBar} />
                     {this.state.ids.map((id, index) => <Owner shows={false} key={index} ids={id} />)}
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
       } else {
          console.log("2")
         return (
            <Popup trigger={<Button>+</Button>} modal on="focus">
               {close => (
                  <div>
                     <p>Добавление пользователя</p>
                     <SearchOwner myCallback={this.getIDFromSearchBar} />
                     <Owner ids={this.state.id[0]} shows={false} myCallback2={this.if404} />
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
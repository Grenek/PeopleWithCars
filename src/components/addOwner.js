import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style.scss'
import { Container, Button, Form } from 'react-bootstrap'
import Popup from 'reactjs-popup'
import DatePicker from "react-datepicker"
import axios from 'axios'
import apiConfig from '../apiConfig'
var moment = require('moment');

class AddOwner extends React.Component {
   constructor() {
      super()
      this.state = {
      }
   }

   pushAddToUrl = () => {
      this.props.myCallback3()
   }

   removeAddFromUrl = () => {
      this.props.myCallback4()
      this.setState({
         birthdate: null
      });
   }

   // проверка что дата не будущее
   dateValidate(date) {
      let now = moment().format("YYYY-MM-DD")
      let checkDate = moment(date).format("YYYY-MM-DD")
      return (!moment(checkDate).isAfter(now))
   }

   // проверка что имя состоит только из латинских букв и пробела
   nameValidate(name) {
      return (/^[a-zA-Z ]+$/.test(name))
   }

   // вывод ошибки при вводе имени
   onChangeDateValidate = date => {
      if (this.dateValidate(date)) {
         document.querySelector(".date-error").classList.remove('d-block')
         document.querySelector(".date-error").classList.add('d-none')
         this.setState({
            birthdate: date
         });
      } else {
         document.querySelector(".date-error").classList.remove('d-none')
         document.querySelector(".date-error").classList.add('d-block')
         this.setState({
            birthdate: date
         });
      }
   };

   // вывод ошибки при вводе даты
   onChangeNameValidate = e => {
      if (this.nameValidate(e.target.value)) {
         document.querySelector(".name-error").classList.remove('d-block')
         document.querySelector(".name-error").classList.add('d-none')
      } else {
         document.querySelector(".name-error").classList.remove('d-none')
         document.querySelector(".name-error").classList.add('d-block')
      }
   }

   handleSubmit = () => {
      let newOwner = {}
      let name = document.querySelector(".name-input").value
      let birthdate = document.querySelector(".date-input").value
      if (this.dateValidate(birthdate) && this.nameValidate(name)) {
         newOwner.name = name
         newOwner.birthdate = birthdate
         axios({
            method: 'POST',
            url: `${apiConfig.url}/person`,
            data: newOwner
         });
      }
   }

   render() {
      return (
         <Container className="">
            <Popup trigger={<Button size="sm" className="addOwnerButton" onClick={this.pushAddToUrl}>+</Button>} modal on="focus" onClose={this.removeAddFromUrl}>
               {close => (
                  <div>
                     <p>Добавление пользователя</p>
                     <Form onSubmit={this.handleSubmit}>

                        <Form.Group>
                           <Form.Label>Имя</Form.Label>
                           <Form.Control onChange={this.onChangeNameValidate} type="text" placeholder="Введите имя" className="name-input" />
                           <Form.Text className="name-error d-none">
                              Имя должно состоять только из букв!
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="">
                           <Form.Label>День рождения</Form.Label>
                           <br></br>
                           <DatePicker
                              showYearDropdown
                              className="date-input"
                              placeholderText="День рождения"
                              dateFormat="dd.MM.yyyy"
                              selected={this.state.birthdate}
                              onChange={this.onChangeDateValidate}
                           />
                           <Form.Text className="date-error d-none">
                              Ты не можешь родиться в будущем
                        </Form.Text>
                        <Button variant="success" type="submit">
                           Ок
                     </Button>
                        <Button variant="danger" onClick={close}>
                           Отмена
                     </Button>
                        </Form.Group>



                     </Form>
                  </div>
               )}
            </Popup>
         </Container>
      )
   }
}


export default AddOwner
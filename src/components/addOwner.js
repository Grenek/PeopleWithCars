import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style.scss'
import { Container, Button, Form } from 'react-bootstrap'
import Popup from 'reactjs-popup'
import DatePicker from "react-datepicker"
var moment = require('moment');

class AddOwner extends React.Component {
   constructor() {
      super()
      this.state = {
         addOwnerVisible: false,
         startDate: null
      }
   }

   handleChange = date => {
      this.setState({
         startDate: date
      });
      // проверочка на будущую дату
      let now = moment().format("YYYY-MM-DD");
      let checkDate = moment(date).format("YYYY-MM-DD")
      if (moment(checkDate).isAfter(now)) {
         document.querySelector(".date-error").classList.remove('d-none')
         document.querySelector(".date-error").classList.add('d-block')
      } else {
         document.querySelector(".date-error").classList.remove('d-block')
         document.querySelector(".date-error").classList.add('d-none')
      }
   };

   nameValidate(e){
      console.log(e)
      let valid = /^[a-zA-Z ]+$/.test(e.target.value);
      if (!valid) {
         document.querySelector(".name-error").classList.remove('d-none')
         document.querySelector(".name-error").classList.add('d-block')
      } else {
         document.querySelector(".name-error").classList.remove('d-block')
         document.querySelector(".name-error").classList.add('d-none')
   }
   }

   showAddOwner() {
      this.setState({ addOwnerVisible: true });
   }

   render() {
      return (
         <Container className="d-flex justify-content-end">
            <Popup trigger={<Button>+</Button>} modal on="focus">
               {close => (
               <div className="">
                  <p>Добавление пользователя</p>
                  <Form>

                     <Form.Group controlId="">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control onChange={this.nameValidate} type="text" placeholder="Введите имя" />
                        <Form.Text className="name-error d-none">
                           Имя состоит только из букв!
                        </Form.Text>
                     </Form.Group>

                     <Form.Group controlId="">
                        <Form.Label>День рождения</Form.Label>
                        <br></br>
                        <DatePicker
                           placeholderText="День рождения"
                           dateFormat="dd.MM.yyyy"
                           selected={this.state.startDate}
                           onChange={this.handleChange}
                        />
                        <Form.Text className="date-error d-none">
                           Ты не можешь родиться в будущем 😭
                        </Form.Text>
                     </Form.Group>

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
         </Container>
      )
   }
}


export default AddOwner
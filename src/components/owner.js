import React from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { Container, ListGroup, Card, Row, Col } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Owner extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         id: props.ids,
         show: false
      }
   }

   static getDerivedStateFromProps(nextProps) {
      if (nextProps.shows) {
         return {
            id: nextProps.ids,
            show: nextProps.shows
         }
      } else {
         return {
            id: nextProps.ids,
         }
      }
   }

   give404ToParent() {
      this.props.myCallback2()
   }

   componentDidUpdate(prevProps) {
      if (prevProps !== this.props) { this.getOwnerInfo() }
   }

   componentDidMount() {
      this.getOwnerInfo()
   }

   getOwnerInfo() {
      axios
         .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
            params: {
               personid: this.state.id
            }
         })
         .then(response => {
            this.setState({ ...response.data })
         })
         .catch(error => {
            if (error.response.status === 404) {
               confirmAlert({
                  message: `Пользователь ${this.state.id} не найден`,
                  buttons: [
                     {
                        label: 'Хорошо, я понял',
                        onClick: () => { this.give404ToParent() }
                     }
                  ]
               });
            }
            if (error.response.status === 400) {
               return
            }
         })
   }

   handleClick() {
      this.setState(prevState => ({ show: !prevState.show }))
   }

   render() {
      return (
         <Container key={this.state.id}>
            <Row>
               <Col >
                  <Card onClick={e => this.handleClick()}>
                     <Card.Body className={this.state.id}>{this.state.name}</Card.Body>
                     <Card.Body>{this.state.birthdate}</Card.Body>
                  </Card>
               </Col>
               <Col className="carsList">
                  {(this.state.cars && this.state.cars.length && this.state.show) ?
                     this.state.cars.map((car, index) => {
                        return (
                           <ListGroup.Item key={index}>{car.model}</ListGroup.Item>
                        )
                     }) : null
                  }
               </Col>
            </Row>
         </Container>
      )
   }
}

export default Owner;
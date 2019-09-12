import React from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { Container, ListGroup, Card, Row, Col } from 'react-bootstrap'

class Owner extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         id: props.ids
      }
   }

   static getDerivedStateFromProps(nextProps) {
      return {
         id: nextProps.ids
      }
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
   }

   showCars() {
      // console.log(this.state.cars)
      if (this.state.cars && this.state.cars.length) {
         this.state.cars.map((car, index) => {
            console.log(car)
            return (
               <ListGroup.Item>{car.model}</ListGroup.Item>
            )
         })
      }
   }

   carToShow = (e) => {
      console.log(e.target) // вот тут хотелось бы положить инфу из Card в state и тогда отрендерится нужная машина, но шото не выходит
   }

   render() {
      return (
         <Container key={this.state.id}>
            <Row>
               <Col onClick={this.carToShow}>
                  <Card >
                     <Card.Body>{this.state.name}</Card.Body>
                     <Card.Body>{this.state.birthdate}</Card.Body>
                  </Card>
               </Col>
               <Col className="carsList">
                  {(this.state.cars && this.state.cars.length) ?
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
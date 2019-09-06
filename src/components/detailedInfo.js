import React from 'react';
// import axios from 'axios';
import { ListGroup, Card, Container } from 'react-bootstrap'
import '../styles/style.scss';

class DetailedInfo extends React.Component {
  constructor(props) {
    super(props)
    // this.carsToShow = this.carsToShow.bind(this)
    this.state = {
      id: 0,
      name: "",
      birthdate: "",
      cars: [{
        id: 0,
        model: "",
        horsepower: 0,
        ownerId: 0
      }]
    }
  }

  // getPersonData() {
  //   axios
  //     .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
  //       params: {
  //         personid: 4
  //       }
  //     })
  //     .then(response => {
  //       this.setState({ ...response.data })
  //     })
  // }

  carsToShow() {
    let cars = this.props.peopleWitchCars.cars
    let carsList = []
    if (typeof cars !== "undefined") {
      carsList = cars.map((car) => 
        <ListGroup.Item key={car.id}>{car.model}</ListGroup.Item>
      )
  }
    return carsList
  }

  render() {

    return (
      <Container className="detailedInfo d-flex justify-content-center">
        <Card>
          <Card.Body>{this.props.peopleWitchCars.name}</Card.Body>
          <Card.Body>{this.props.peopleWitchCars.birthdate}</Card.Body>
        </Card>
        <ListGroup className="d-flex justify-content-end">
          {this.carsToShow()}
        </ListGroup>
      </Container>
    )
  }
}

export default DetailedInfo;
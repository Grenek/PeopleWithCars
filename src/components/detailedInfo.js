import React from 'react';
import { ListGroup, Card, Container } from 'react-bootstrap'
import '../styles/style.scss';

class DetailedInfo extends React.Component {
  constructor(props) {
    super(props)
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

  carsToShow() {
    if (typeof this.props.peopleWitchCars.cars == "undefined") { return }
    return this.props.peopleWitchCars.cars.map((car) =>
      <ListGroup.Item key={car.id}>{car.model}</ListGroup.Item>
    )
  }

  ownerToShow() {
    if (typeof this.props.peopleWitchCars.name == "undefined") { return }
    return <Card>
      <Card.Body>{this.props.peopleWitchCars.name}</Card.Body>
      <Card.Body>{this.props.peopleWitchCars.birthdate}</Card.Body>
    </Card>
  }

  render() {
    return (
      <Container className="detailedInfo d-flex justify-content-center">
        {this.ownerToShow()}
        <ListGroup className="d-flex justify-content-end">
          {this.carsToShow()}
        </ListGroup>
      </Container>
    )
  }
}

export default DetailedInfo;
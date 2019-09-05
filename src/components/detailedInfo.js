import React from 'react';
import axios from 'axios';
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

  getPersonData() {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
        params: {
          personid: 4
        }
      })
      .then(response => {
        this.setState({ ...response.data })
      })
  }

  componentDidMount() {
    // this.getPersonData()
  }

  render() {

    return (
      <Container className="detailedInfo d-flex justify-content-center">
        <Card>
          <Card.Body>{this.props.peopleWitchCars.name}</Card.Body>
          <Card.Body>{this.props.peopleWitchCars.birthdate}</Card.Body>
        </Card>
        <ListGroup className="d-flex justify-content-end">
          {/* {console.log(this.props.peopleWitchCars.cars)
          } */}
          
          {this.props.peopleWitchCars.cars.map(car => {
            return <ListGroup.Item key={car.id}>{car.model}</ListGroup.Item>
          })}
          
        </ListGroup>
      </Container>
    )
  }
}

export default DetailedInfo;
import React from 'react'
// import DetailedInfo from './detailedInfo'
import { ListGroup, Card } from 'react-bootstrap'
import '../styles/style.scss'
import axios from 'axios'

class LastOwners extends React.Component {
  constructor() {
    super()
    this.state = {
      last3Ids: [],
      owners: []
    }
  }

  getOwnersIds() {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
      .then(response => {
        response.data.slice(response.data.length - 3, response.data.length).map(el => {
          return this.ownersToShow(el)
        })
      })
  }

  ownersToShow(i) {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
        params: {
          personid: i
        }
      })
      .then(response => {
        this.setState(prevState => ({
          owners: [response.data, ...prevState.owners]
        }))
      })


  }

  onClickHandler() {
  }

  componentDidMount() {
    this.getOwnersIds()
  }

  render() {
    return (
      <div className="lastOwners">
        <ListGroup className="d-flex justify-content-end">
          {this.state.owners.map(el => {
            return (
              <Card key={el.id}>
                <Card.Body>{el.name}</Card.Body>
                <Card.Body>{el.birthdate}</Card.Body>
              </Card>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default LastOwners
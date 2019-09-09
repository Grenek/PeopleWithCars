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
      names: [],
      birthdates: []
    }
  }

  getOwnersIds() {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
      .then(response => {
        let firstIdToShow = response.data.length - 3
        if (firstIdToShow >= 0) {
          let last3Ids = response.data.splice(firstIdToShow, firstIdToShow + 3)
          this.setState({ last3Ids: last3Ids })
        } else {
          let last3Ids = response.data
          this.setState({ last3Ids: last3Ids })
        }
        for (let i = 0; i < 3; i++) { this.ownersToShow(i) }
      })
  }

  ownersToShow(i) {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
        params: {
          personid: this.state.last3Ids[i]
        }
      })
      .then(response => {
        this.setState(prevState => ({
          names: [response.data.name, ...prevState.names],
          birthdates: [response.data.birthdate, ...prevState.birthdates]
        }))
      })
  }

  // componentsToRender() {

  //    return (<ListGroup className="d-flex justify-content-end">
  //       <Card>
  //          {/* {this.state.names.map((name, key) => <Card.Body>{name}</Card.Body>)}
  //             {this.state.birthdates.map((name, key) => <Card.Body>{name}</Card.Body>)} */}
  //       </Card>
  //    </ListGroup>)
  // }

  onClickHandler() {

  }

  componentDidMount() {
    this.getOwnersIds()
  }

  render() {
    return (
      <div className="lastOwners">
        <ListGroup className="d-flex justify-content-end">
          <Card>
            <Card.Body>{this.state.names[0]}</Card.Body>
            <Card.Body>{this.state.birthdates[0]}</Card.Body>
          </Card>
          <Card>
            <Card.Body>{this.state.names[1]}</Card.Body>
            <Card.Body>{this.state.birthdates[1]}</Card.Body>
          </Card>
          <Card>
            <Card.Body>{this.state.names[2]}</Card.Body>
            <Card.Body>{this.state.birthdates[2]}</Card.Body>
          </Card>
        </ListGroup>
      </div>
    )
  }
}

export default LastOwners
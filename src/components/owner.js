import React from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { ListGroup, Card } from 'react-bootstrap'

class Owner extends React.Component {
   constructor() {
      super()
      this.state = {
      }
   }

   componentDidMount() {
      this.getOwnerInfo()
   }

   getOwnerInfo() {
      axios
         .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
            params: {
               personid: this.props.ids
            }
         })
         .then(response => {
            this.setState({ ...response.data })
         })
   }

   render() {
      return (
         <Card key={this.state.id}>
            <Card.Body>{this.state.name}</Card.Body>
            <Card.Body>{this.state.birthdate}</Card.Body>
         </Card>
      )
   }
}

export default Owner;
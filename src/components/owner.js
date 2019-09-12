import React from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { Card } from 'react-bootstrap'

class Owner extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         id: props.ids
      }
   }

   static getDerivedStateFromProps(nextProps) {
      return{
         id: nextProps.ids
      }
    }

   componentDidUpdate(prevProps){
      if(prevProps !== this.props) {this.getOwnerInfo()}
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
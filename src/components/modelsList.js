import React from 'react'
import '../styles/style.scss'
import { ListGroup } from 'react-bootstrap'

class ModelsList extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         brand: this.props.brand
      }
   }

   handleClick = () => {
      console.log(this.props.brand)
   }

   render() {
      return (
         <ListGroup.Item onClick={this.handleClick}>{this.props.brand}</ListGroup.Item>
      )
   }
}
export default ModelsList
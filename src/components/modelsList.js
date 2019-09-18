import React from 'react'
import '../styles/style.scss'
import { ListGroup, Col } from 'react-bootstrap'

class ModelsList extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         displayedModels: [],
         models: []
      }
   }

   componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
         this.setState({ 
            models: this.props.models,
            displayedModels: this.props.models })
      }
   }

   handleClick = () => {
      // console.log(this.state.displayedModels)
   }

   searchHandler = (e) => {
      let searchQuery = e.target.value.toLowerCase(),
         displayedModels = this.state.models.filter((el) => {
            let searchValue = el.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
         })
      this.setState({
         displayedModels: displayedModels
      })
   }

   render() {
      return (
         <Col>
            <input type="text" className="search" onChange={this.searchHandler} onClick={this.handleClick}/>
            {(this.state.displayedModels && this.state.displayedModels.length > 0 && typeof this.state.displayedModels !== "undefined") ?
               this.state.displayedModels.map((brand, index) => {
                  return (
                     <ListGroup.Item key={index} onClick={this.handleClick}>{brand}</ListGroup.Item>
                  )
               }) : null}
         </Col>
      )
   }
}

export default ModelsList
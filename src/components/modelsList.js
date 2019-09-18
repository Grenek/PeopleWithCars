import React from 'react'
import '../styles/style.scss'
import { ListGroup, Col } from 'react-bootstrap'
// import axios from 'axios'

class ModelsList extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         displayedModels: [],
         wtf: this.props.brand
      }
   }

   static getDerivedStateFromProps(nextProps) {

   }

   componentDidMount() {
      this.setState({
         displayedModels: this.props.models,
      });
   }

   componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
         this.setState({ displayedModels: this.props.models })
      }
   }

   handleClick = () => {
   }

   searchHandler = (e) => {
      let searchjQery = e.target.value.toLowerCase(),
         displayedModels = this.state.displayedModels.filter((el) => {
            let searchValue = el.toLowerCase();
            return searchValue.indexOf(searchjQery) !== -1;
         })
      this.setState({
         displayedModels: displayedModels
      })
   }

   render() {
      // console.log((this.state.displayedModels && this.state.displayedModels.length > 0 && typeof this.state.displayedModels !== "undefined"))
      // console.log(typeof this.state.displayedModels !== "undefined")
      console.log(this.state.displayedModels.length > 0)
      return (
         <Col>
            <input type="text" className="search" onChange={this.searchHandler} />
            {/* {(this.state.displayedModels && this.state.displayedModels.length > 0 && typeof this.state.displayedModels !== "undefined") ?
               this.state.displayedBrands.map((brand, index) => {
                  return (
                     <ListGroup.Item key={index} onClick={this.handleClick}>{brand.brand}</ListGroup.Item>
                  )
               }) : null} */}
         </Col>
      )
   }
}

export default ModelsList
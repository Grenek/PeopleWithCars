import React from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import ModelsList from '../components/modelsList'

class BrandsList extends React.Component {
   constructor() {
      super()
      this.state = {
         cars: [],
         displayedCars: [],
         chosenBrand: ""
      }
   }

   componentDidMount() {
      this.getCars()
   }

   getCars() {
      axios
         .get('http://172.30.215.172:8081/RESTfulWebApp/cars')
         .then(response => {
            this.setState({
               cars: response.data,
               displayedCars: response.data
            })
         })
   }

   toggleModels = () => {
      this.setState(prevState => ({ show: !prevState.show }))
   }

   searchHandler = (e) => {
      console.log(this.state.displayedCars)
      let searchjQery = e.target.value.toLowerCase(),
         displayedCars = this.state.cars.filter((el) => {
            let searchValue = el.brand.toLowerCase();
            return searchValue.indexOf(searchjQery) !== -1;
         })
      this.setState({
         displayedCars: displayedCars
      })
   }

   handleClick = (e) => {
      this.setState({chosenBrand: e.target.innerHTML})
   }

   render() {
      return (
         <div>
            <input type="text" className="search" onChange={this.searchHandler} />
            <Container>
               <Row>
                  <Col>
                     {this.state.displayedCars.map((car, index) => {
                        return (
                           <ListGroup.Item key={index} onClick={this.handleClick}>{car.brand}</ListGroup.Item>
                        )
                     })}
                  </Col>
                  <Col>
                  <ModelsList brand={this.state.chosenBrand}/>
                  </Col>
                  {/* <Col>
                     {this.state.displayedCars.map((car, index) => {
                        car.models.map((model, index) => {
                           console.log(model)
                           return <ListGroup.Item key={index}>{model}</ListGroup.Item>
                        })
                     })}
                  </Col> */}
               </Row>
            </Container>
         </div>
      )
   }
}

export default BrandsList
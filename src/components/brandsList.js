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
         displayedBrands: [],
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
               displayedBrands: response.data
            })
         })
   }

   toggleModels = () => {
      this.setState(prevState => ({ show: !prevState.show }))
   }

   searchHandler = (e) => {
      let searchjQery = e.target.value.toLowerCase(),
         displayedBrands = this.state.cars.filter((el) => {
            let searchValue = el.brand.toLowerCase();
            return searchValue.indexOf(searchjQery) !== -1;
         })
      this.setState({
         displayedBrands: displayedBrands
      })
   }

   handleClick = (e) => {
      this.setState({ chosenBrand: e.target.innerHTML }, () => {
         this.state.cars.map(car => {
            if (car.brand === this.state.chosenBrand) {
               this.setState({ chosenModels: car.models })
            }
         })
      }
      )
   }

   render() {
      return (
         <div>
            <input type="text" className="search" onChange={this.searchHandler} />
            <Container>
               <Row>
                  <Col>
                     {this.state.displayedBrands.map((brand, index) => {
                        return (
                           <ListGroup.Item key={index} onClick={this.handleClick}>{brand.brand}</ListGroup.Item>
                        )
                     })}
                  </Col>
                     <ModelsList brand={this.state.chosenBrand} models={this.state.chosenModels} />
               </Row>
            </Container>
         </div>
      )
   }
}

export default BrandsList
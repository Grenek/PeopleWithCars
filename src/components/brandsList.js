import React from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import ModelsList from '../components/modelsList'
import apiConfig from '../apiConfig'

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

   // ходим за списком авто
   getCars() {
      axios
         .get(`${apiConfig.url}/cars`)
         .then(response => {
            this.setState({
               cars: response.data,
               displayedBrands: response.data
            })
         })
   }

   // выполняем поиск и попавшие результаты записываем в state
   searchHandler = (e) => {
      let searchQuery = e.target.value.toLowerCase(),
         displayedBrands = this.state.cars.filter((el) => {
            let searchValue = el.brand.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
         })
      this.setState({
         displayedBrands: displayedBrands
      })
   }

   // по клику на бренд записываем его и проходимся по всему списку cars чтобы найти модели этого бренда
   handleClick = (e) => {
      this.setState({
         chosenBrand: e.target.innerHTML
      }, () => {
         this.state.cars.map(car => {
            if (car.brand === this.state.chosenBrand) {
               this.setState({
                  chosenModels: car.models
               })
            }
            return true
         })
      })
   }

   render() {
      return (
         <div>
            <Container>
               <Row>
                  <Col>
                     <input type="text" className="search" onChange={this.searchHandler} />
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
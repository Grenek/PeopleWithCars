import React from 'react';
import '../styles/style.scss';
import {Form} from 'react-bootstrap'
import axios from 'axios'

class SearchOwner extends React.Component {
  constructor(){
    super()
    this.state = {}
  }

  // смотрим что юзер ввел и записываем id в state
  handleUserInput = (e) => {
    const id = e.target.name;
    const value = e.target.value;
    this.setState({[id]: value});
  }

  //делаем запрос к API и записываем ответ в state
  searchOwner = (e) => {
    e.preventDefault();
    axios
    .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
      params: {
        personid: this.state.id
      }
    })
    .then(response => {
      this.setState({ ...response.data })
      this.props.info(this.state);
    })
  }

  render() {
    return (
      <div className="searchOwner">
        <Form onSubmit={this.searchOwner}>
          <Form.Group>
            <Form.Label>Поиск автовладельца</Form.Label>
            <Form.Control placeholder="Введите ID" name="id" onChange={this.handleUserInput}/>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SearchOwner;
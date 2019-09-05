import React from 'react';
import '../styles/style.scss';
import {Form} from 'react-bootstrap'
import axios from 'axios'

class SearchOwner extends React.Component {
  constructor(){
    super()
    this.state = {}
  }

  searchOwner = (e) => {
    e.preventDefault();
    axios
    .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
      params: {
        personid: 4
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
            <Form.Control placeholder="Введите ID" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SearchOwner;
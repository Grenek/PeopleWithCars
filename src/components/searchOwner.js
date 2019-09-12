import React from 'react';
import '../styles/style.scss';
import { Form } from 'react-bootstrap'
import axios from 'axios'

class SearchOwner extends React.Component {
  constructor() {
    super()
    this.state = {
      errorText: ""
    }
  }

  handleUserInput = (e) => {
    e.preventDefault();
    this.setState({ id: e.target.value})
  }

  passIdToOwners= (e) => {
    e.preventDefault();
    this.props.myCallback(this.state.id)
  }

  render() {
    return (
      <div className="searchOwner">
        <Form onSubmit={this.passIdToOwners}>
          <Form.Group>
            <Form.Label>Поиск автовладельца</Form.Label>
            <Form.Control type="number" placeholder="Введите ID" name="id" onChange={this.handleUserInput}/>
            <Form.Text className="text-muted">
              {this.state.errorText}
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SearchOwner;
import React from 'react';
import '../styles/style.scss';
import { Form } from 'react-bootstrap'

class SearchOwner extends React.Component {
   constructor() {
      super()
      this.state = {
      }
   }

   // берем id из строки и записываем в state или отдаем пустую строку в owners
   handleUserInput = (e) => {
      e.preventDefault();
      if (e.target.value === ""){
         this.props.myCallback(e.target.value)
      }
      this.setState({ id: e.target.value })
   }

   // отдаем id из state в owners
   passIdToOwners = (e) => {
      e.preventDefault();
      this.props.myCallback(this.state.id)
   }

   render() {
      return (
         <div className="searchOwner">
            <Form onSubmit={this.passIdToOwners} onChange={this.handleUserInput}>
               <Form.Group>
                  <Form.Label>Поиск автовладельца</Form.Label>
                  <Form.Control type="number" placeholder="Введите ID" onChange={this.handleUserInput} />
                  <Form.Text className="text-muted">
                  </Form.Text>
               </Form.Group>
            </Form>
         </div>
      );
   }
}

export default SearchOwner;
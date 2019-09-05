import React from 'react';
import axios from 'axios';
import '../styles/style.scss';

class DetailedInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      id: 0,
      name: "",
      birthdate: "",
      cars: {
        id: 0,
        model: "",
        horsepower: 0,
        ownerId: 0
      }
    }
  }

  componentDidMount() {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
        params: {
          personid: 4
        }
      })
      .then(response => {
        // console.log(response.data);
        const detailedInfosList = response.data
        const name = detailedInfosList.name
        this.setState({ detailedInfosList })
        console.log(this.state);
      })
  }

  render() {
    return (
      <div className="DetailedInfo">
        <h1>1</h1>
      </div>
    )
  }
}

export default DetailedInfo;
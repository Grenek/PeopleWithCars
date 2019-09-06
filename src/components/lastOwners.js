import React from 'react'
// import DetailedInfo from './detailedInfo'
import { ListGroup } from 'react-bootstrap'
import '../styles/style.scss'
import axios from 'axios'

class LastOwners extends React.Component {
    constructor() {
        super()
        this.state = {
            // owners: [{
            //     birthdate: "",
            //     cars: [{
            //         id: 0,
            //         model: "",
            //         horsepower: 0,
            //         ownerId: 0
            //     }],
            //     id: 0,
            //     name: ""
            // }]
            names: [],
            birthdates: []
        }
    }

    getOwnersIds() {
        axios
            .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
            .then(response => {
                let firstIdToShow = response.data.length - 3
                if (firstIdToShow >= 0) {
                    let last3Ids = response.data.splice(firstIdToShow, firstIdToShow + 3)
                    this.setState({ ...last3Ids })
                    // console.log(this.state);
                } else {
                    let last3Ids = response.data
                    this.setState({ ...last3Ids })
                }
                this.ownersToShow()
            })
    }

    ownersToShow() {
        axios
            .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
                params: {
                    personid: this.state[0]
                }
            })
            .then(response => {
                this.setState(prevState => {
                    // console.log(prevState);
                    return {
                        names: response.data.name
                    }
                })
                console.log(this.state);
            })
    }

    componentDidMount() {
        this.getOwnersIds()
        // const listOfIds = await Promise.all([
        //     axios
        //         .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
        //         .then(response => {
        //             let firstIdToShow = response.data.length - 3
        //             if (firstIdToShow >= 0) {
        //                 let last3Ids = response.data.splice(firstIdToShow, firstIdToShow + 3)
        //                 this.setState({ ...last3Ids })
        //                 // console.log(this.state[0]);
        //             } else {
        //                 let last3Ids = response.data
        //                 this.setState({ ...last3Ids })
        //                 // console.log(this.state);
        //             }
        //         })
        // ])
    }

    render() {
        return (
            <div className="lastOwners">
                <ListGroup className="d-flex justify-content-end">
                </ListGroup>
            </div>
        )
    }
}

export default LastOwners
import React from 'react';
import '../styles/style.scss';
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../images/car.png';

class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand href="#home">
                        <img
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                    </Navbar.Brand>
                    {/* <Navbar.Brand>Автокек</Navbar.Brand> */}
                    <Nav variant="pills">
                        <LinkContainer to="/owners">
                            <Nav.Link>Автовладельцы</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cars">
                            <Nav.Link>Автомобили</Nav.Link>
                        </LinkContainer>
                        <                   LinkContainer to="/statistics">
                            <Nav.Link>Статистика</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;
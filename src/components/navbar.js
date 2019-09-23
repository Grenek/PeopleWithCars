import React from 'react';
import '../styles/style.scss';
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
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
            </div>
        )
    }
}

export default Navbar;
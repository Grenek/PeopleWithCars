import React from 'react';
import { Nav } from 'react-bootstrap';
import '../styles/style.scss';

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Nav>
                    <Nav.Item><Nav.Link href="/owners">Автовладельцы</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/cars">Каталог авто</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/statistics">Статистика</Nav.Link></Nav.Item>
                </Nav>
            </div>
        )
    }
}

export default Navbar;
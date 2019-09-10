import React from 'react';
import { Link } from 'react-router-dom';
import { Router, Route } from 'react-router';
import { Nav } from 'react-bootstrap';
import '../styles/style.scss';

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <nav>
                    <ul>
                        <li>
                            <Link to="/owners">owners</Link>
                        </li>
                        <li>
                            <Link to="/cars">cars</Link>
                        </li>
                        <li>
                            <Link to="/statistics">statistics</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;
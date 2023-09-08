import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/Cart">Contact</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavigationBar;
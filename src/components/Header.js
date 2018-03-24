import React, { Component } from 'react';
import logo from '../img/logo-header-liten.png';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <img src={logo} />            
            </div>
        );
    }
}

export default Header;
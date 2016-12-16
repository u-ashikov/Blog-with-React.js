import React, { Component } from 'react';
import './Header.css'
import {Link} from 'react-router';

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <div className="nav">
                    {!sessionStorage.getItem('username') ?  <ul>
                        <li className="home"><Link to="/home" activeClassName="active-nav">Home</Link></li>
                        <li className="login"><Link to="/login" activeClassName="active-nav">Login</Link></li>
                        <li className="register"><Link to="/register" activeClassName="active-nav">Register</Link></li>
                    </ul> :
                        <ul>
                            <li className="home"><Link to="/home" activeClassName="active-nav">Home</Link></li>
                            <li className="posts"><Link to="/posts" activeClassName="active-nav">Posts</Link></li>
                            <li className="create-post"><Link to="/create-post" activeClassName="active-nav">Create Post</Link></li>
                            <li className="logout"><Link to="/logout">Logout</Link></li>
                        </ul>}
                </div>
            </header>
        );
    }
}

export default Header;

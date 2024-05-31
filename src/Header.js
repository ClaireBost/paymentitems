import React from 'react';
import './my-sass.scss';
import logo from './pp-logo.png';

// Nav bar
const Header = () => {
    return (

<nav className="navbar parentpay-navbar no-watermark">
  <div className="container-fluid">
    <div className="app-logo">
      <a className="navbar-brand">
      <img src={logo} alt="Logo" width="180px" height="50px"/>
      </a>
    </div>
    <div className="content-wrapper">
    <div id="mainNav" className="content">
    <ul className="nav top-nav">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/help">Help</a>
                </li>
            </ul>

            <a
              className="btn btn-default logout-btn"
            >            Logout
              
            </a>
    </div>
    </div>
  </div>
</nav>
    );
};

export default Header;
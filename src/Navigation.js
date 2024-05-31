import React from 'react';
import './my-sass.scss';

const Navigation = () => {
    return (
        <div>
            <ul className="nav nav-pills nav-fill tier-1" data-test-id="navigation-menu-top-homepage">
                <li className="nav-item">
                    <a>My ParentPay</a>
                </li>
                <li className="nav-item">
                    <a>Attendance, meals & events</a>
                </li>
                <li className="nav-item">      <a>Communication</a> </li>
                <li className="nav-item">      <a>People</a></li>
                <li className="nav-item">      <a>Finance</a></li>
                <li className="nav-item">      <a>Settings</a></li>
            </ul>

            <div data-test-id="navigation-menu-bottom-homepage">
                <ul className="nav nav-pills nav-fill tier-2">
                    <li className="nav-item">
                        <a>Trips</a></li>
                    <li className="nav-item">
                        <a>View other payment item</a></li>
                    <li className="nav-item">        <a>Create other payment item</a> </li>
                    <li className="nav-item">        <a>Reports</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
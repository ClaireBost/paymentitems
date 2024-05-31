import React from 'react';
import './my-sass.scss';

const Banner = () => {
    return (

<div className="banner jumbotron no-watermark" data-test-id="welcome-banner-homepage">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-8 text-start">
        <div className="header-content">
          <div className="welcome" data-test-id="name-id-homepage">Welcome, Jessica Jack</div>
          <div data-test-id="schoolname-homepage"></div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="support-area">
          <div className="support-code" data-test-id="support-code-homepage">Support code: 00000</div>
          <div data-test-id="school-id-homepage">School ID: 00000</div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default Banner;
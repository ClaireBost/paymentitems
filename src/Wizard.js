import React from 'react';
import './my-sass.scss';

// Nav bar
const Wizard = () => {
    return (
        <div className="trips-steps mt-3" data-test-id="trips-progress-bar">
        <ul className="trips-steps__progressbar">
          <li>Details</li>
          <li>Quantites</li>
          <li>Costs</li>
          <li>People</li>
          <li>Preview</li>
        </ul>
      </div>
    );
};

export default Wizard;
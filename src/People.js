import React, { useState } from 'react';
import './my-sass.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


// Nav bar
function People() {

  let navigate = useNavigate();

  return (

    <><div class="card">
      <div class="card-body">
        <h5 class="card-title">Assign people to trip</h5>
        <div class="d-grid gap-2 col-6 mx-auto mt-4 mb-4">
          <button class="btn btn-primary" type="button">Assign people</button>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Year</th>
              <th scope="col">Reg.</th>
              <th scope="col">FSM</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Mark</th>
              <td>Otto</td>
              <td>1</td>
              <td>2A</td>
              <td>No</td>
              <td>Remove</td>
            </tr>
            <tr>
              <th scope="row">Mary</th>
              <td>Jones</td>
              <td>4</td>
              <td>4A</td>
              <td>No</td>
              <td>Remove</td>
            </tr>
            <tr>
              <th scope="row">Regina</th>
              <td>Hampton</td>
              <td>9</td>
              <td>9R</td>
              <td>Yes</td>
              <td>Remove</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

      <div class="trips-buttons">
        <div class="text-start">
          <button className="btn btn-link mt-2" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div class="text-end">
          <Link to="/summary">
            <button className="btn btn-light mt-2 me-2">Exit without saving</button>
            <button className="btn btn-primary mt-2">Continue to Summary</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default People;
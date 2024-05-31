import React, { useState } from 'react';
import './my-sass.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


// Nav bar
function Information() {

    let navigate = useNavigate();

    return (

        <><div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">Consent for trip</h5>
                <p class="text-start">Parents/carers will be asked to consent to all trips at the point of payment or confirmation of attendance.</p>
<p class="text-start">Consent description</p>
<p class="text-start">Consent will be visible to parents, please write any information regarding trip and activities which the consent will cover.</p>
                <form>
                    <div class="mb-3 text-start">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3">I consent</textarea>
                    </div>
                </form>

            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Collect pupil information (optional)</h5>
                <p class="text-start">Select any additional information you require from parents for this trip.</p>
<p class="text-start">Please note: All selected information must be entered before full payment can be made.</p>
                <form>


                    <div class="form-check text-start">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
  <label class="form-check-label" for="flexCheckDefault">
    Default checkbox
  </label>
</div>
<div class="form-check text-start">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked></input>
  <label class="form-check-label" for="flexCheckChecked">
    Checked checkbox
  </label>
</div>
                </form>

            </div>
        </div>

        <div class="trips-buttons">
                <div class="text-start">
                    <button className="btn btn-link mt-2" onClick={() => navigate(-1)}>Back</button>
                </div>
                <div class="text-end">
                    <Link to="/people">
                        <button className="btn btn-primary mt-2">Go to People</button>
                    </Link>
                </div>
            </div>
            </>
    );
};

export default Information;
import React, { useState } from 'react';
import './my-sass.scss';
import { Link, useNavigate } from 'react-router-dom';

function People2() {
    const [bannerVisible, setBannerVisible] = useState(false);
    const [showManualSuccess, setShowManualSuccess] = useState(false);
    const [saveGlobalButton, setSaveGlobalButton] = useState(false);
    const [saveSelectionsButton, setSaveSelectionsButton] = useState(true);
    const [manuallyAddPeople, setManuallyAddPeople] = useState(false);
    const [globalAddPeople, setGlobalAddPeople] = useState(false);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [viewPeople, setViewPeople] = useState(false);
    const [addedPeople, setAddedPeople] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedPupils, setSelectedPupils] = useState([]);
    const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
    const [isAllAddChecked, setIsAllAddChecked] = useState(false);
    const [isAllRemoveChecked, setIsAllRemoveChecked] = useState(false);
    let navigate = useNavigate();

    const addWholeSchool = () => {
        setBannerVisible(true);
        setButtonsDisabled(true);
        setManuallyAddPeople(false);
    };

    const handleRadioChange = (e) => {
        if (e.target.value === 'Global') {
            setGlobalAddPeople(true);
            setManuallyAddPeople(false);
            setSaveGlobalButton(true); // Show the save button for global selection
        } else if (e.target.value === 'Manual') {
            setManuallyAddPeople(true);
            setGlobalAddPeople(false);
            setSaveGlobalButton(false); // Hide the save button for manual selection
        }
    };

    const handleViewPeopleClick = (e) => {
        e.preventDefault();
        setViewPeople(true);
    };

    const showPeople = () => {
        setAddedPeople(true);
    };

    const saveSelections = () => {
        setShowManualSuccess(true);
        setButtonsDisabled(true);
    };

    const manuallySelectGroup = (e) => {
        const selectedGroup = e.target.options[e.target.selectedIndex].text;
        setSelectedGroups(prevSelectedGroups => [...prevSelectedGroups, selectedGroup]);
    };

    const manuallySelectPupils = (e) => {
        const selectedPupils = e.target.options[e.target.selectedIndex].text;
        setSelectedPupils(prevSelectedPupils => [...prevSelectedPupils, selectedPupils]);
    };

    const hasCheckboxChanged = () => {
        const addCheckboxes = document.querySelectorAll('.people-table-checkbox-add');
        const removeCheckboxes = document.querySelectorAll('.people-table-checkbox-remove');
        const anyChecked = Array.from(addCheckboxes).some(checkbox => checkbox.checked) || Array.from(removeCheckboxes).some(checkbox => checkbox.checked);
        setIsAnyCheckboxChecked(anyChecked);
    };

    const handleHeaderCheckboxChange = (e, type) => {
        const checkboxes = document.querySelectorAll(`.people-table-checkbox-${type}`);
        const isChecked = e.target.checked;
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        hasCheckboxChanged();
        if (type === 'add') {
            setIsAllAddChecked(isChecked);
        } else {
            setIsAllRemoveChecked(isChecked);
        }
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Assign people</h5>
                    <div className="alert greyalert text-start" role="alert">
                        <p>
                            <span className="bold">Automatically add the whole school:</span> This is a global function that will add the entire school to this payment item as well as any new pupils that get uploaded throughout the year.
                        </p>
                        <p>
                            <span className="bold">Manually add and remove people:</span> Choose which people are added to or removed from this payment item (i.e. Pupil by year group, staff, visitors etc). Using this option will not automatically add people uploaded throughout the year to this payment item.
                        </p>
                    </div>
                    <div className="form-check text-start">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="addPeople"
                            value="Global"
                            checked={globalAddPeople}
                            onChange={handleRadioChange}
                            disabled={buttonsDisabled}
                        />
                        <label className="form-check-label" htmlFor="global">Automatically add the whole school</label>
                    </div>
                    <div className="form-check text-start">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="addPeople"
                            value="Manual"
                            checked={manuallyAddPeople}
                            onChange={handleRadioChange}
                            disabled={buttonsDisabled}
                        />
                        <label className="form-check-label" htmlFor="manual">Manually add or remove people</label>
                    </div>

                    {saveGlobalButton && (
                        <div class="text-start">
                        <button className="btn btn-primary mt-3" type="button" onClick={addWholeSchool} disabled={buttonsDisabled}>Save</button>
                        </div>
                    )}

                    {bannerVisible && (
                        <div className="alert alert-success mt-4" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                            </svg> The whole school has been added successfully! Pupils added throughout the year will automatically be assigned to this payment item.
                            <a href="#" onClick={handleViewPeopleClick}>View people.</a>
                        </div>
                    )}

                    {manuallyAddPeople && (
                       <div className="card col-6 mx-auto mt-3">
                           <div className="card-body">
                               <div className="mb-3">
                                   <span className="bold">Search groups</span>
                                   <select className="form-select" onChange={manuallySelectGroup}>
                                       <option selected disabled>Open this select menu</option>
                                       <option value="One">All school</option>
                                       <option value="Two">All pupils</option>
                                       <option value="Three">All visitors</option>
                                       <option value="Four">All others</option>
                                       <option value="Five">Year 1</option>
                                       <option value="Six">Year 2</option>
                                       <option value="Seven">Year 3</option>
                                   </select>
                                   {selectedGroups.length > 0 && (
                                       <div className="mt-1 text-start">
                                           {selectedGroups.map((group, index) => (
                                               <span className="badge bg-primary me-2 fs-7" key={index}>{group}</span>
                                           ))}
                                       </div>
                                   )}
                               </div>
                               <span className="bold">Search individuals</span>
                               <select className="form-select" onChange={manuallySelectPupils}>
                                   <option selected disabled>Open this select menu</option>
                                   <option value="One">Hannah</option>
                                   <option value="Two">Craig</option>
                                   <option value="Three">Samual</option>
                                   <option value="Four">Marcus</option>
                                   <option value="Five">Selina</option>
                                   <option value="Six">Lily</option>
                                   <option value="Seven">Piers</option>
                               </select>
                               {selectedPupils.length > 0 && (
                                   <div className="mt-1 text-start">
                                       {selectedPupils.map((pupil, index) => (
                                           <span className="badge bg-primary me-2 fs-7" key={index}>{pupil}</span>
                                       ))}
                                   </div>
                               )}
                               <button type="button" className="btn btn-primary mt-3" onClick={showPeople}>Search selections</button>
                           </div>
                       </div>
                    )}

                    {viewPeople && (
                        <div className="mt-4">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">First name</th>
                                        <th scope="col">Last name</th>
                                        <th scope="col">Year</th>
                                        <th scope="col">Reg.</th>
                                        <th scope="col">FSM</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Leona</td>
                                        <td>Otto</td>
                                        <td>1</td>
                                        <td>2A</td>
                                        <td>No</td>
                                        <td>Add</td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Jones</td>
                                        <td>4</td>
                                        <td>4A</td>
                                        <td>No</td>
                                        <td>Remove</td>
                                    </tr>
                                    <tr>
                                        <td>Regina</td>
                                        <td>Hampton</td>
                                        <td>9</td>
                                        <td>9R</td>
                                        <td>Yes</td>
                                        <td>Remove</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {addedPeople && (
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title">People to be assigned</h5>

                        {saveSelectionsButton && (
                            <button type="button" className="btn btn-success w-25" onClick={saveSelections} disabled={!isAnyCheckboxChecked}>Save</button>
                        )}

                        {showManualSuccess && (
                            <div className="alert alert-success mt-4" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                </svg>Your people have been successfully assigned! You can add more people by clicking the button above.
                            </div>
                        )}

                    </div>


                    <div className="d-flex flex-row-reverse me-2">
                        <form className="col-3">
                            <input className="form-control" type="search" placeholder="Search people" aria-label="Search"></input>
                        </form>
                    </div>
                    <div className="mt-4">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Add
                                        <div className="form-check">
                                            <input className="form-check-input float-none people-table-checkbox-add" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => handleHeaderCheckboxChange(e, 'add')}></input>
                                            <label className="form-check-label visually-hidden" htmlFor="flexCheckDefault">
                                                Add
                                            </label>
                                        </div>
                                    </th>
                                    <th scope="col">Remove
                                        <div className="form-check">
                                            <input className="form-check-input float-none people-table-checkbox-remove" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => handleHeaderCheckboxChange(e, 'remove')}></input>
                                            <label className="form-check-label visually-hidden" htmlFor="flexCheckChecked">
                                                Remove
                                            </label>
                                        </div></th>
                                    <th scope="col">First name</th>
                                    <th scope="col">Last name</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Reg.</th>
                                    <th scope="col">FSM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> <div className="form-check">
                                        <input className="form-check-input float-none people-table-checkbox-add" type="checkbox" value="" id="flexCheck3" onChange={hasCheckboxChanged}></input>
                                    </div></td>
                                    <td> <div className="form-check">
                                        <input className="form-check-input float-none people-table-checkbox-remove" type="checkbox" value="" id="flexCheck4" onChange={hasCheckboxChanged}></input>
                                    </div></td>
                                    <td>Leona</td>
                                    <td>Otto</td>
                                    <td>1</td>
                                    <td>2A</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td> <div className="form-check">
                                        <input className="form-check-input float-none people-table-checkbox-add" type="checkbox" value="" id="flexCheck5" onChange={hasCheckboxChanged}></input>
                                    </div></td>
                                    <td> <div className="form-check">
                                        <input className="form-check-input float-none people-table-checkbox-remove" type="checkbox" value="" id="flexCheck6" onChange={hasCheckboxChanged}></input>
                                    </div></td>
                                    <td>Mary</td>
                                    <td>Jones</td>
                                    <td>4</td>
                                    <td>4A</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td> <div className="form-check">
                                        <input className="form-check-input float-none people-table-checkbox-add" type="checkbox" value="" id="flexCheck7" onChange={hasCheckboxChanged}></input>
                                    </div></td>
                                    <td> <div className="form-check">
                                        <input className="form-check-input float-none people-table-checkbox-remove" type="checkbox" value="" id="flexCheck8" onChange={hasCheckboxChanged}></input>
                                    </div></td>
                                    <td>Regina</td>
                                    <td>Hampton</td>
                                    <td>9</td>
                                    <td>9R</td>
                                    <td>Yes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="trips-buttons">
                <div className="text-start">
                    <button className="btn btn-link mt-2" onClick={() => navigate(-1)}>Back</button>
                </div>
                <div className="text-end">
                    <Link to="/summary">
                        <button className="btn btn-light mt-2 me-2">Exit without saving</button>
                        <button className="btn btn-primary mt-2">Continue to Summary</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default People2;

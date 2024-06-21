import React, { useState } from 'react';
import './my-sass.scss';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './ExitModal';

function GloballyAdd() {
    const navigate = useNavigate();
    const [allChecked, setAllChecked] = useState(false);
    const [checkboxes, setCheckboxes] = useState(Array(6).fill(false));
    const [statusList, setStatusList] = useState(Array(6).fill('Added')); // hardcoded row of 6 all unchecked
    const [manuallyAddPeople, setManuallyAddPeople] = useState(false); // set status badge to added initially
    const [addedPeople, setAddedPeople] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedPupils, setSelectedPupils] = useState([]);
    const [emptyTable, setEmptyTable] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const exitWithoutSaving = () => {
        setShowModal(true);
    };


    const globalCheckbox = () => { // if the global checkbox is checked then each checkbox needs to be checked
        const newCheckedState = !allChecked;
        setAllChecked(newCheckedState);
        setCheckboxes(Array(checkboxes.length).fill(newCheckedState));
    };

    const eachCheckbox = (index) => { // update checkbox state
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    };

    const statusDropdown = (labelled) => { // render the badge based on if the checkbox is checked and add/remove chosen
        const newStatusList = checkboxes.map((isChecked, index) =>
            isChecked ? (labelled === 'Remove' ? 'Removed' : 'Added') : statusList[index]
        );
        setStatusList(newStatusList);
    };

    const addManually = () => {
        setManuallyAddPeople(true);
    };

    const closeAddModal = () => {
        setManuallyAddPeople(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const showPeople = () => {
        setAddedPeople(true);
        setEmptyTable(false);
        closeAddModal();
    };

    const manuallySelectGroup = (e) => {
        const selectedGroup = e.target.options[e.target.selectedIndex].text;
        setSelectedGroups(prevSelectedGroups => [...prevSelectedGroups, selectedGroup]);
    };

    const manuallySelectPupils = (e) => {
        const selectedPupils = e.target.options[e.target.selectedIndex].text;
        setSelectedPupils(prevSelectedPupils => [...prevSelectedPupils, selectedPupils]);
    };

    return (
        <>
            {emptyTable && (
                <>
                    <div className="card">
                    <div className="card-body d-flex">
                        <form className="col-3 me-2">
                            <input className="form-control" type="search" placeholder="Search people" aria-label="Search" />
                        </form>
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Edit selected
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#" onClick={() => statusDropdown('Add')}>Add</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => statusDropdown('Remove')}>Remove</a></li>
                            </ul>
                        </div>
                        <div class="add-people text-end">
                            <button type="button" className="btn btn-light" onClick={addManually}>
                                Add people
                            </button>
                        </div>
                    </div>
                        <table className="table table-bordered people-table">
                            <thead className="people-table-header table-light">
                                <tr>
                                    <th scope="col">
                                        <div className="form-check">
                                            <input
                                                checked={allChecked}
                                                onChange={globalCheckbox}
                                                className="form-check-input float-none people-table-checkbox-add"
                                                type="checkbox"
                                                id="flexCheckDefault"
                                            />
                                            <label className="form-check-label visually-hidden" htmlFor="flexCheckDefault">
                                                Global
                                            </label>
                                        </div>
                                    </th>
                                    <th scope="col" width="12%">Individual amount</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">First name</th>
                                    <th scope="col">Last name</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Reg.</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Due amount</th>
                                    <th scope="col">Payments</th>
                                    <th scope="col">Balance/paid total</th>
                                    <th scope="col" width="12%">Comment</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                        </table>

                        <h4> Add people to payment item</h4>
                        <div class="d-grid gap-2 col-3 mx-auto mb-3">
                            <button type="button" className="btn btn-light mt-2" onClick={addManually}>
                                Add people
                            </button>
                        </div>
                    </div>
                </>
            )}

            {manuallyAddPeople && (
                <div className="modal fade show exitmodal modal-lg" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add people</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeAddModal}></button>
                            </div>
                            <div className="modal-body text-start">
                                <div class="mb-3">
                                    <span class="bold">Add groups</span>
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
                                                <span class="badge bg-primary me-2 fs-7" key={index}>{group}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <span class="bold">Add individuals</span>
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
                                        {selectedPupils.map((group, index) => (
                                            <span class="badge bg-primary me-2 fs-7" key={index}>{group}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-link" onClick={closeAddModal}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={showPeople}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {addedPeople && (
                <div className="card">
                    <div className="card-body d-flex">
                        <form className="col-3 me-2">
                            <input className="form-control" type="search" placeholder="Search people" aria-label="Search" />
                        </form>
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Edit selected
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#" onClick={() => statusDropdown('Add')}>Add</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => statusDropdown('Remove')}>Remove</a></li>
                            </ul>
                        </div>
                        <div class="add-people text-end">
                            <button type="button" className="btn btn-light" onClick={addManually}>
                                Add people
                            </button>
                        </div>
                    </div>

                    <table className="table table-bordered people-table">
                        <thead className="people-table-header table-light">
                            <tr>
                                <th scope="col">
                                    <div className="form-check">
                                        <input
                                            checked={allChecked}
                                            onChange={globalCheckbox}
                                            className="form-check-input float-none people-table-checkbox-add"
                                            type="checkbox"
                                            id="flexCheckDefault"
                                        />
                                        <label className="form-check-label visually-hidden" htmlFor="flexCheckDefault">
                                            Global
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" width="12%">Individual amount</th>
                                <th scope="col">ID</th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">Year</th>
                                <th scope="col">Reg.</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Due amount</th>
                                <th scope="col">Payments</th>
                                <th scope="col">Balance/paid total</th>
                                <th scope="col" width="12%">Comment</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {checkboxes.map((isChecked, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="form-check">
                                            <input
                                                checked={isChecked}
                                                onChange={() => eachCheckbox(index)}
                                                className="form-check-input float-none people-table-checkbox-add"
                                                type="checkbox"
                                                id={`flexCheck${index}`}
                                            />
                                        </div>
                                    </td>
                                    <td><div>
                                        <label htmlFor="individualAmount" className="form-label visually-hidden">Individual amount</label>
                                        <div class="input-group">
                                            <span class="input-group-text" id="basic-addon1">£</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="individualAmount"
                                            />
                                        </div>
                                    </div></td>
                                    <td>0256312</td>
                                    <td>{index === 0 ? 'Leona' : index === 1 ? 'Hannah' : index === 2 ? 'James' : index === 3 ? 'Finn' : index === 4 ? 'Marcus' : 'Emma-Louise'}</td>
                                    <td>{index === 0 ? 'Otto' : index === 1 ? 'Patrick-jones' : index === 2 ? 'Smith' : index === 3 ? 'Usher' : 'Fisher'}</td>
                                    <td>{index === 0 ? '2' : index === 1 ? '8' : '5'}</td>
                                    <td>{index === 0 ? 'PINE' : index === 1 || index === 4 ? 'ELM' : 'ASH'}</td>
                                    <td>{index === 0 ? '01/05/05' : index === 1 ? '01/09/05' : '01/09/05'}</td>
                                    <td>{index === 0 ? '£50.00' : index === 1 ? '£80.00' : '£50.00'}</td>
                                    <td>{index === 0 ? '0.00' : index === 1 ? '1.00' : '4.00'}</td>
                                    <td>0.00</td>
                                    <td><div>
                                        <label htmlFor="comment" className="form-label visually-hidden">Comment</label>
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="comment"
                                            />
                                        </div>
                                    </div></td>
                                    <td>
                                        {statusList[index] === 'Added' ? (
                                            <span className="badge rounded-pill bg-success">Added</span>
                                        ) : (
                                            <span className="badge rounded-pill bg-danger">Removed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end me-3">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true"> ← </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">→</a>
                            </li>
                        </ul>
                    </nav>

                </div>

            )}

            <div className="trips-buttons">
                <div className="text-start">
                    <button
                        className="btn btn-link mt-2"
                        type="button"
                        onClick={() => navigate(-1)} >
                        Back
                    </button>
                </div>
                <div className="text-end">
                    <button type="button" className="btn btn-light mt-2 me-2" onClick={exitWithoutSaving}>
                        Cancel
                    </button>
                    <Link to="/summary">
                        <button type="submit" className="btn btn-primary mt-2">Continue to Summary</button>
                    </Link>
                </div>
                {showModal && <Modal onClose={closeModal} />}
            </div>
        </>
    );
}

export default GloballyAdd;

import React, { useState } from 'react';
import './my-sass.scss';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './ExitModal';

function GloballyAdd() {
    const navigate = useNavigate();
    const [allChecked, setAllChecked] = useState(false);
    const [checkboxes, setCheckboxes] = useState(Array(6).fill(false)); // hardcoded row of 6 all unchecked
    const [statusList, setStatusList] = useState(Array(6).fill('Added')); // set status badge to added initially
    const [showModal, setShowModal] = useState(false);

    const exitWithoutSaving = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
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

    return (
        <>
            <div className="alert alert-success mt-4" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                </svg> Success! This payment item has been assigned globally
            </div>

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
                        {checkboxes.map((isChecked, index) => ( // checking is box is checked
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

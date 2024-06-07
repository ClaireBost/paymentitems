import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';
import Modal from './ExitModal';

const Costs = () => {
    const { costsData, setCostsData } = useContext(FormContext); // Current form data and update current form data

    // Update the form with any inital values from the form context component
    const [dueDateOption, setdueDateOption] = useState(costsData.dueDateOption);
    const [costOption, setcostOption] = useState(costsData.costOption);
    const [bankAccount, setBankAccount] = useState(costsData.bankAccount);
    const [showAccountingCodes, setShowAccountingCodes] = useState(false);
    const [addAccountingCodes, setAddAccountingCodes] = useState(costsData.addAccountingCodes);
    const [accountingCodes, setAccountingCodes] = useState({
        accountcode1: '',
        description1: '',
        accountcode2: '',
        description2: '',
        accountcode3: '',
        description3: '',
        accountcode4: '',
        description4: '',
        accountcode5: '',
        description5: '',
        accountcode6: '',
        description6: '',
    });
    const [fixedAmount, setFixedAmount] = useState(costsData.fixedAmount);
    const [defaultAmount, setDefaultAmount] = useState(costsData.defaultAmount);
    const [minimumAmount, setMinimumAmount] = useState(costsData.minimumAmount);
    const [maximumAmount, setMaximumAmount] = useState(costsData.maximumAmount);
    const [dueDate, setDueDate] = useState(costsData.dueDate);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    // Show modal
    const exitWithoutSaving = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Add styles to body when modal is open/closed
    useEffect(() => {
        if (showModal) {
            document.body.style.height = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.height = '';
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.height = '';
            document.body.style.overflow = '';
        };
    }, [showModal]);

    const navigate = useNavigate();

    // Update with the chosen bank account selection
    const handleBankAccountChange = (event) => {
        const selectedValue = event.target.value;
        setBankAccount(selectedValue);
        setShowAccountingCodes(selectedValue !== '');
    };

    // Update the account codes if data present
    const handleAccountingCodesChange = (e) => {
        const { id, value } = e.target;
        setAccountingCodes((prevCodes) => ({
            ...prevCodes,
            [id]: value,
        }));
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        if (costOption === 'Fixed amount') {
            if (!fixedAmount) {
                newErrors.fixedAmount = 'Amount is required';
            }
        }

        if (costOption === 'Variable amount') {
            if (!defaultAmount || !minimumAmount || !maximumAmount) {
                newErrors.defaultAmount = 'Fill out all amount fields';
            }
        }

        if (dueDateOption === 'yes') {
            if (!dueDate) {
                newErrors.dueDate = 'Select a due date';
            }
        }

        if (!bankAccount) {
            newErrors.bankAccount = 'Select a bank account';
        }
        return newErrors;
    };

    // Throw any validation erros or update the form values if all good
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setCostsData({
                ...costsData,
                dueDateOption: dueDateOption,
                fixedAmount: e.target.fixedAmount?.value,
                variableAmount: e.target.variableAmount?.value,
                defaultAmount: e.target.defaultAmount?.value,
                minimumAmount: e.target.minimumAmount?.value,
                maximumAmount: e.target.maximumAmount?.value,
                costOption: costOption,
                dueDate: e.target.dueDate?.value,
                bankAccount: bankAccount,
                addAccountingCodes: addAccountingCodes,
                ...accountingCodes,
            });
            navigate('/people');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Costs</h5>

                    <div className="mb-3 text-start">
                        <label className="form-label bold">Price</label>
                        <div className="form-checks col-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="costOption"
                                    value="Fixed amount"
                                    checked={costOption === 'Fixed amount'}
                                    onChange={(e) => setcostOption(e.target.value)}
                                />
                                <label className="form-check-label me-3" htmlFor="fixedamount">Fixed</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="costOption"
                                    value="Variable amount"
                                    checked={costOption === 'Variable amount'}
                                    onChange={(e) => setcostOption(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="variable">Variable</label>
                            </div>
                        </div>
                    </div>
                    {costOption === 'Fixed amount' && (
                        <div className="mb-3 text-start col-3">
                            <label htmlFor="fixedAmount" className="form-label visually-hidden">Fixed cost</label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">£</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="fixedAmount"
                                    value={fixedAmount}
                                    onChange={(e) => setFixedAmount(e.target.value)}
                                />
                            </div>
                            {errors.fixedAmount && <div className="text-danger">{errors.fixedAmount}</div>}
                        </div>
                    )}

                    {costOption === 'Variable amount' && (
                        <div className="row mb-3 text-start">
                            <div className="col-2">
                                <label htmlFor="defaultAmount" className="form-label">Default amount</label>
                                <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">£</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="defaultAmount"
                                    value={defaultAmount}
                                    onChange={(e) => setDefaultAmount(e.target.value)}
                                />
                                </div>
                            </div>
                            <div className="col-2">
                                <label htmlFor="minimumAmount" className="form-label">Minimum amount</label>
                                <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">£</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="minimumAmount"
                                    value={minimumAmount}
                                    onChange={(e) => setMinimumAmount(e.target.value)}
                                />
                                </div>
                            </div>
                            <div className="col-2">
                                <label htmlFor="maximumAmount" className="form-label">Maximum amount</label>
                                <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">£</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="maximumAmount"
                                    value={maximumAmount}
                                    onChange={(e) => setMaximumAmount(e.target.value)}
                                />
                                </div>
                            </div>
                            {errors.defaultAmount && <div className="text-danger">{errors.defaultAmount}</div>}
                        </div>
                    )}

                    <div className="mb-3 text-start">
                        <label className="form-label bold mb-0">Due date</label>
                        <small className="text-muted">
                            <p class="mb-2">Payments can be made after this date</p>
                        </small>
                        <div className="form-checks col-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentDue"
                                    value="yes"
                                    checked={dueDateOption === 'yes'}
                                    onChange={(e) => setdueDateOption(e.target.value)}
                                />
                                <label className="form-check-label me-3" htmlFor="paymentDue">Yes</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentDue"
                                    value="no"
                                    checked={dueDateOption === 'no'}
                                    onChange={(e) => setdueDateOption(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="noPaymentDue">No</label>
                            </div>
                        </div>
                    </div>
                    {dueDateOption === 'yes' && (
                        <div className="mb-3 text-start col-3">
                            <label htmlFor="dueDate" className="form-label">Due date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                            {errors.dueDate && <div className="text-danger">{errors.dueDate}</div>}
                        </div>
                    )}

                    <div className="mb-3 text-start">
                        <label htmlFor="bankAccount" className="form-label bold">Bank account</label>
                        <div class="col-3">
                            <select className="form-select col-3" id="bankAccount" value={bankAccount} onChange={handleBankAccountChange}>
                                <option value="">Select...</option>
                                <option value="1">123456</option>
                                <option value="2">123548</option>
                                <option value="3">854632</option>
                            </select>
                        </div>
                        {errors.bankAccount && <div className="text-danger">{errors.bankAccount}</div>}
                    </div>

                    {showAccountingCodes && (
                        <div className="mb-3 text-start">
                            <label className="form-label bold">Do you want to add accounting codes?</label>
                            <div className="form-checks col-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="addAccountingCodes"
                                        value="yes"
                                        checked={addAccountingCodes === 'yes'}
                                        onChange={(e) => setAddAccountingCodes(e.target.value)}
                                    />
                                    <label className="form-check-label me-3" htmlFor="addAccountingCodesYes">Yes</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="addAccountingCodes"
                                        value="no"
                                        checked={addAccountingCodes === 'no'}
                                        onChange={(e) => setAddAccountingCodes(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="addAccountingCodesNo">No</label>
                                </div>
                            </div>
                        </div>
                    )}

                    {addAccountingCodes === 'yes' && (
                        <table className="table table-bordered table-striped">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Group code 1</td>
                                    <td>
                                        <label htmlFor="accountcode1" className="form-label">Account code:</label>
                                        <input type="text" className="form-control" id="accountcode1" value={accountingCodes.accountcode1} onChange={handleAccountingCodesChange} />
                                    </td>
                                    <td>
                                        <label htmlFor="description1" className="form-label">Description:</label>
                                        <input type="text" className="form-control" id="description1" value={accountingCodes.description1} onChange={handleAccountingCodesChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Group code 2</td>
                                    <td>
                                        <label htmlFor="accountcode2" className="form-label">Account code:</label>
                                        <input type="text" className="form-control" id="accountcode2" value={accountingCodes.accountcode2} onChange={handleAccountingCodesChange} />
                                    </td>
                                    <td>
                                        <label htmlFor="description2" className="form-label">Description:</label>
                                        <input type="text" className="form-control" id="description2" value={accountingCodes.description2} onChange={handleAccountingCodesChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Group code 3</td>
                                    <td>
                                        <label htmlFor="accountcode3" className="form-label">Account code:</label>
                                        <input type="text" className="form-control" id="accountcode3" value={accountingCodes.accountcode3} onChange={handleAccountingCodesChange} />
                                    </td>
                                    <td>
                                        <label htmlFor="description3" className="form-label">Description:</label>
                                        <input type="text" className="form-control" id="description3" value={accountingCodes.description3} onChange={handleAccountingCodesChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        CRF code
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </td>
                                    <td>
                                        <label htmlFor="accountcode4" className="form-label">Account code:</label>
                                        <input type="text" className="form-control" id="accountcode4" value={accountingCodes.accountcode4} onChange={handleAccountingCodesChange} />
                                    </td>
                                    <td>
                                        <label htmlFor="description4" className="form-label">Description:</label>
                                        <input type="text" className="form-control" id="description4" value={accountingCodes.description4} onChange={handleAccountingCodesChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Management code 1</td>
                                    <td>
                                        <label htmlFor="accountcode5" className="form-label">Account code:</label>
                                        <input type="text" className="form-control" id="accountcode5" value={accountingCodes.accountcode5} onChange={handleAccountingCodesChange} />
                                    </td>
                                    <td>
                                        <label htmlFor="description5" className="form-label">Description:</label>
                                        <input type="text" className="form-control" id="description5" value={accountingCodes.description5} onChange={handleAccountingCodesChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Management code 2</td>
                                    <td>
                                        <label htmlFor="accountcode6" className="form-label">Account code:</label>
                                        <input type="text" className="form-control" id="accountcode6" value={accountingCodes.accountcode6} onChange={handleAccountingCodesChange} />
                                    </td>
                                    <td>
                                        <label htmlFor="description6" className="form-label">Description:</label>
                                        <input type="text" className="form-control" id="description6" value={accountingCodes.description6} onChange={handleAccountingCodesChange} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
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
                    <button type="submit" className="btn btn-primary mt-2">Continue to People</button>
                </div>
                {showModal && <Modal onClose={closeModal} />}
            </div>
        </form>
    );
};

export default Costs;

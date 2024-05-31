import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';

const Quantities = () => {
    const { quantityData, setQuantityData } = useContext(FormContext); // Current form data and update current form data

    // Update the form with any inital values from the form context component
    const [limitedPlacesOption, setLimitedPlacesOption] = useState(quantityData.limitedPlaces);
    const [itemQuantityOption, setItemQuantityOption] = useState(quantityData.itemQuantityOption);
    const [itemSetupOption, setItemSetupOption] = useState(quantityData.itemSetupOption);
    const [numberOfPlaces, setNumberOfPlaces] = useState(quantityData.numberOfPlaces);
    const [itemQuantity, setItemQuantity] = useState(quantityData.itemQuantity);
    const [minQuantity, setMinQuantity] = useState(quantityData.minQuantity);
    const [maxQuantity, setMaxQuantity] = useState(quantityData.maxQuantity);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        if (limitedPlacesOption === 'yes') {
            if (!numberOfPlaces) {
                newErrors.numberOfPlaces = 'Number of places is required';
            }
        }
        if (itemQuantityOption === 'yes') {
            if (!itemQuantity || !minQuantity || !maxQuantity) {
                newErrors.itemQuantity = 'Fill out all quantity fields';
            }
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
            setQuantityData({
                ...quantityData,
                limitedPlaces: limitedPlacesOption,
                numberOfPlaces: limitedPlacesOption === 'yes' ? numberOfPlaces : '',
                itemQuantityOption: itemQuantityOption,
                itemQuantity: itemQuantityOption === 'yes' ? itemQuantity : '',
                minQuantity: itemQuantityOption === 'yes' ? minQuantity : '',
                maxQuantity: itemQuantityOption === 'yes' ? maxQuantity : '',
                itemSetupOption: itemSetupOption,
            });
            navigate('/costs');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Quantities</h5>
                    <div className="text-start col-3">
                        <label className="form-label bold">How is this payment item to be used?</label>
                        <div className="form-checks">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="itemSetupOption"
                                    value="Only once"
                                    checked={itemSetupOption === 'Only once'}
                                    onChange={(e) => setItemSetupOption(e.target.value)}
                                />
                                <label className="form-check-label me-3" htmlFor="itemSetupOption">Only once</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="itemSetupOption"
                                    value="Repeating"
                                    checked={itemSetupOption === 'Repeating'}
                                    onChange={(e) => setItemSetupOption(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="itemSetupOption">Repeating</label>
                            </div>
                        </div>
                    </div>
                    {itemSetupOption === 'Only once' && (
                        <small className="text-muted text-start">
                            <p className="mb-3">For example, a single or one off payment for a disco</p>
                        </small>
                    )}
                    {itemSetupOption === 'Repeating' && (
                        <small className="text-muted text-start">
                            <p className="mb-3">For example, school meal/breakfast or after club, or an item that can purchased multiple times</p>
                        </small>
                    )}

                    <div className="mb-3 text-start">
                        <label className="form-label bold">Are there a limited number of places available?</label>
                        <div className="form-checks col-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="limitedPlaces"
                                    value="yes"
                                    checked={limitedPlacesOption === 'yes'}
                                    onChange={(e) => setLimitedPlacesOption(e.target.value)}
                                />
                                <label className="form-check-label me-3" htmlFor="limitedPlaces">Yes</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="limitedPlaces"
                                    value="no"
                                    checked={limitedPlacesOption === 'no'}
                                    onChange={(e) => setLimitedPlacesOption(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="limitedPlaces">No</label>
                            </div>
                        </div>
                    </div>
                    {limitedPlacesOption === 'yes' && (
                        <div className="mb-3 text-start col-3">
                            <label htmlFor="numberOfPlaces" className="form-label">Number of places available</label>
                            <input
                                type="number"
                                className="form-control"
                                id="numberOfPlaces"
                                value={numberOfPlaces}
                                onChange={(e) => setNumberOfPlaces(e.target.value)}
                            />
                            {errors.numberOfPlaces && <div className="text-danger">{errors.numberOfPlaces}</div>}
                        </div>
                    )}

                    <div className="mb-3 text-start">
                        <label className="form-label bold">Can parents/carers purchase more than one of this item?</label>
                        <div className="form-checks col-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="itemQuantityOption"
                                    value="yes"
                                    checked={itemQuantityOption === 'yes'}
                                    onChange={(e) => setItemQuantityOption(e.target.value)}
                                />
                                <label className="form-check-label me-3" htmlFor="itemQuantityOption">Yes</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="itemQuantityOption"
                                    value="no"
                                    checked={itemQuantityOption === 'no'}
                                    onChange={(e) => setItemQuantityOption(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="itemQuantityOption">No</label>
                            </div>
                        </div>
                    </div>
                    {itemQuantityOption === 'yes' && (
                        <div className="row mb-3 text-start">
                            <div className="col-2">
                                <label htmlFor="itemQuantity" className="form-label">Default quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="itemQuantity"
                                    value={itemQuantity}
                                    onChange={(e) => setItemQuantity(e.target.value)}
                                />
                            </div>
                            <div className="col-2">
                                <label htmlFor="minQuantity" className="form-label">Minimum quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="minQuantity"
                                    value={minQuantity}
                                    onChange={(e) => setMinQuantity(e.target.value)}
                                />
                            </div>
                            <div className="col-2">
                                <label htmlFor="maxQuantity" className="form-label">Maximum quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="maxQuantity"
                                    value={maxQuantity}
                                    onChange={(e) => setMaxQuantity(e.target.value)}
                                />
                            </div>
                            {errors.itemQuantity && <div className="text-danger">{errors.itemQuantity}</div>}
                        </div>
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
                    <button className="btn btn-light mt-2 me-2">Close without saving</button>
                    <button type="submit" className="btn btn-primary mt-2">Continue to Costs</button>
                </div>
            </div>
        </form>
    );
};

export default Quantities;

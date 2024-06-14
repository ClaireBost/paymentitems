import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';
import Modal from './ExitModal';

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

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        if (limitedPlacesOption === 'Limited') {
            if (!numberOfPlaces) {
                newErrors.numberOfPlaces = 'Number of places is required';
            }
        }
        if (itemQuantityOption === 'Limited') {
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
                numberOfPlaces: limitedPlacesOption === 'Limited' ? numberOfPlaces : '',
                itemQuantityOption: itemQuantityOption,
                itemQuantity: itemQuantityOption === 'Limited' ? itemQuantity : '',
                minQuantity: itemQuantityOption === 'Limited' ? minQuantity : '',
                maxQuantity: itemQuantityOption === 'Limited' ? maxQuantity : '',
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
                    <div className="text-start col-3 mb-3">
                        <label className="form-label bold mb-1">Item availability</label>
                        <p>After the item is purchased, should it:</p>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="itemSetupOption"
                                    value="Only once"
                                    checked={itemSetupOption === 'Only once'}
                                    onChange={(e) => setItemSetupOption(e.target.value)}
                                />
                                <label className="form-check-label me-3" htmlFor="itemSetupOption">Be removed after payment</label>
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
                                <label className="form-check-label" htmlFor="itemSetupOption">Be available to buy again</label>
                            </div>
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label bold mb-1">Inventory</label>
                        <p>How many are available to sell?</p>
                        <div className="col-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="limitedPlaces"
                                    value="Unlimited"
                                    checked={limitedPlacesOption === 'Unlimited'}
                                    onChange={(e) => setLimitedPlacesOption(e.target.value)}
                                />
                                <label className="form-check-label me-3" htmlFor="limitedPlaces">Unlimited</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="limitedPlaces"
                                    value="Limited"
                                    checked={limitedPlacesOption === 'Limited'}
                                    onChange={(e) => setLimitedPlacesOption(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="limitedPlaces">Set inventory</label>
                            </div>
                        </div>
                    </div>
                    {limitedPlacesOption === 'Limited' && (
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
                        <label className="form-label bold mb-1">Purchase volume</label>
                        <p>How many can be purchased per transaction?</p>
                        <div className="col-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="itemQuantityOption"
                                    value="Unlimited"
                                    checked={itemQuantityOption === 'Unlimited'}
                                    onChange={(e) => setItemQuantityOption(e.target.value)}
                                />
                                <label className="form-check-label me-3" htmlFor="itemQuantityOption">Unlimited</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="itemQuantityOption"
                                    value="Limited"
                                    checked={itemQuantityOption === 'Limited'}
                                    onChange={(e) => setItemQuantityOption(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="itemQuantityOption">Set limit</label>
                            </div>
                        </div>
                    </div>
                    {itemQuantityOption === 'Limited' && (
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
                    <button type="button" className="btn btn-light mt-2 me-2" onClick={exitWithoutSaving}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary mt-2">Continue to Costs</button>
                </div>
                {showModal && <Modal onClose={closeModal} />}
            </div>
        </form>
    );
};

export default Quantities;

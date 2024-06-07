import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from './FormContext';
import { Link, useNavigate } from "react-router-dom";
import Modal from './ExitModal';

const Summary = () => {
    const { formData, costsData, quantityData } = useContext(FormContext); // Get all form data
    let navigate = useNavigate();
    const [isPublished, setIsPublished] = useState(false); // Not yet published
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

    // Once published hide the buttons, show banner and scroll to top of page
    const handlePublish = () => {
        setIsPublished(true);
        window.scrollTo(0, 0);
    };

    return (
        <>
            {isPublished && (
                <div className="alert alert-success text-start" role="alert">
                    <p className="bold">You have successfully published your payment item</p>
                    <p>Your payment item has been setup and will now be viewable to users. <a href="url">Return to your payment items.</a></p>
                </div>
            )}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Details</h5>
                    <div class="text-start">
                        <p><span class="bold">Payment item name:</span> {formData.itemName}</p>
                        <p><span class="bold">Payment item short name:</span> {formData.itemShortName}</p>
                        <p><span class="bold">Description:</span> {formData.description}</p>
                        <p><span class="bold">Notes:</span> {formData.notes}</p>
                        <p><span class="bold">Category:</span> {formData.category}</p>
                        {!isPublished && (
                            <Link to="/details">
                                <button className="btn btn-primary mt-2">Edit details</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Quantites</h5>
                    <div class="text-start">
                        <p><span class="bold">Stock:</span> {quantityData.itemSetupOption}</p>
                        <p><span class="bold">Purchase quantity:</span> {quantityData.limitedPlaces}</p>
                        {quantityData.limitedPlaces === 'Limited' && <p>
                            <span class="bold">Number of places:</span> {quantityData.numberOfPlaces}</p>}
                        <p><span class="bold">Purchase availability:</span> {quantityData.itemQuantityOption}</p>
                        {quantityData.itemQuantityOption === 'Unlimited' && <><p>
                            <span class="bold">Default amount:</span> {quantityData.itemQuantity}</p>
                            <p>
                                <span class="bold">Minimum amount:</span> {quantityData.minQuantity}</p>
                            <p>
                                <span class="bold">Maximum amount:</span> {quantityData.maxQuantity}</p></>}
                        {!isPublished && (
                            <Link to="/quantities">
                                <button className="btn btn-primary mt-2">Edit quantites</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Costs</h5>

                    <div class="text-start">
                        <p><span class="bold">Price:</span> {costsData.costOption}</p>
                        {costsData.costOption === 'Variable amount' && (
                            <>
                                <p><span class="bold">Default amount:</span> {costsData.defaultAmount}</p>
                                <p><span class="bold">Minimum amount:</span> {costsData.minimumAmount}</p>
                                <p><span class="bold">Maxiumum amount:</span> {costsData.maximumAmount}</p>
                            </>
                        )}
                        {costsData.costOption === 'Fixed amount' && (
                            <>
                                <p><span class="bold">Amount:</span> £{costsData.fixedAmount}</p>
                            </>
                        )}
                        <p><span class="bold">Due date:</span> {costsData.dueDateOption}</p>
                        {costsData.dueDateOption === 'yes' && (
                            <>
                                <p><span class="bold">Due date selected:</span> {costsData.dueDate}</p>
                            </>
                        )}
                        <p><span class="bold">Bank account selected:</span> {costsData.bankAccount}</p>
                        <p><span class="bold">Accounting codes:</span> {costsData.addAccountingCodes}</p>
                        {!isPublished && (
                            <Link to="/costs">
                                <button className="btn btn-primary mt-2">Edit costs</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {!isPublished && (
                <div class="trips-buttons">
                    <div class="text-start">
                        <button className="btn btn-link mt-2" onClick={() => navigate(-1)}>Back</button>
                    </div>
                    <div className="text-end">
                        <button type="button" className="btn btn-light mt-2 me-2" onClick={exitWithoutSaving}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary mt-2" onClick={handlePublish}>Publish</button>
                    </div>
                    {showModal && <Modal onClose={closeModal} />}
                </div>
            )}
        </>
    );
};

export default Summary;

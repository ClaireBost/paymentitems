import React, { useState, useEffect } from 'react';
import './my-sass.scss';
import { useNavigate } from 'react-router-dom';
import Modal from './ExitModal';

function People() {
  let navigate = useNavigate();
  const [assignmentType, setAssignmentType] = useState('');
  const [savedAssignmentType, setSavedAssignmentType] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Retrieve the saved assignment type from localStorage
    const savedType = localStorage.getItem('savedAssignmentType');
    if (savedType) {
      setSavedAssignmentType(savedType);
      setAssignmentType(savedType);
    }
  }, []);

    // Show modal
    const exitWithoutSaving = () => {
      setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
};

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setAssignmentType(value);
  };

  const handleSaveAndContinue = () => {
    localStorage.setItem('savedAssignmentType', assignmentType); // Save the selected radio button to localStorage
    if (assignmentType === 'manually') {
      navigate('/manuallyAdd');
    } else if (assignmentType === 'global') {
      navigate('/globallyAdd');
    }
  };

  const handleReset = () => {
    localStorage.removeItem('savedAssignmentType');
    setAssignmentType('');
    setSavedAssignmentType('');
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Assign people</h5>
          <p className="bold text-start">Assignment type</p>
          {(!savedAssignmentType || savedAssignmentType === 'manually') && (
            <div className="form-check text-start">
              <input
                className="form-check-input"
                type="radio"
                name="assignmentType"
                id="manually"
                value="manually"
                checked={assignmentType === 'manually'}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="manually">
                Selected pupils, staff, visitors, pre-admissions or others
              </label>
            </div>
          )}
          {(!savedAssignmentType || savedAssignmentType === 'global') && (
            <div className="form-check text-start">
              <input
                className="form-check-input"
                type="radio"
                name="assignmentType"
                id="global"
                value="global"
                checked={assignmentType === 'global'}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="global">
                Global - This will go to the whole school and any new people automatically
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="trips-buttons">
        <div className="text-start">
          <button className="btn btn-link mt-2" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="text-end">
        <button className="btn btn-link mt-2 ms-2 reset" onClick={handleReset}>Reset</button>
        <button type="button" className="btn btn-light mt-2 me-2" onClick={exitWithoutSaving}>
                        Cancel
                    </button>
          <button className="btn btn-primary mt-2" onClick={handleSaveAndContinue}>Save and continue</button>
          {showModal && <Modal onClose={closeModal} />}
        </div>
      </div>
    </>
  );
}

export default People;

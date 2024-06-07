import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';
import Modal from './ExitModal';

const Details = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();
  const [itemName, setItemName] = useState(formData.itemName || '');
  const [itemShortName, setItemShortName] = useState(formData.itemShortName || '');
  const [description, setDescription] = useState(formData.description || '');
  const [notes, setNotes] = useState(formData.notes || 'No notes field');
  const [category, setCategory] = useState(formData.category || 'None');
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

  const validateForm = () => {
    const newErrors = {};
    if (!itemName) newErrors.itemName = 'Item name is required';
    if (!itemShortName) newErrors.itemShortName = 'Item short name is required';
    if (!description) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setFormData({
        ...formData,
        itemName,
        itemShortName,
        description,
        notes,
        category,
      });
      navigate('/quantities');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Details</h5>
          <div className="mb-3 text-start col-3">
            <label htmlFor="itemName" className="form-label">Item name</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            {errors.itemName && <div className="text-danger">{errors.itemName}</div>}
          </div>
          <div className="mb-3 text-start col-3">
            <label htmlFor="itemShortName" className="form-label mb-0">Item short name</label>
            <small className="text-muted">
              <p className="mb-1">Used in SMS messages</p>
            </small>
            <input
              type="text"
              className="form-control"
              id="itemShortName"
              value={itemShortName}
              onChange={(e) => setItemShortName(e.target.value)}
            />
            {errors.itemShortName && <div className="text-danger">{errors.itemShortName}</div>}
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="description" className="form-label mb-0">Description</label>
            <small className="text-muted">
              <p class="mb-1">Provide information about your payment item</p>
            </small>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && <div className="text-danger">{errors.description}</div>}
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="notes" className="form-label mb-0">Additional information needed</label>
            <div className="col-3">
              <select
                id="notes"
                className="form-select"
                aria-label="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              >
                <option value="No notes field">No notes field</option>
                <option value="Mandatory">Mandatory</option>
                <option value="Optional">Optional</option>
              </select>
            </div>
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="category" className="form-label mb-0">Category (optional)</label>
            <div className="col-3">
              <select
                id="category"
                className="form-select"
                aria-label="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="None">None</option>
                <option value="Activity">Activity</option>
                <option value="Course">Course</option>
                <option value="Exam resit">Exam resit</option>
                <option value="Fees or contribution">Fees or contribution</option>
                <option value="Letting">Letting</option>
                <option value="Meal">Meal</option>
                <option value="Parents evening">Parents evening</option>
                <option value="School bus">School bus</option>
                <option value="Tickets">Tickets</option>
                <option value="Tuition">Tuition</option>
                <option value="Uniform">Uniform</option>
                <option value="Wrap around care">Wrap around care</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <>
        <div className="text-end">
          <button type="button" className="btn btn-light mt-2 me-2" onClick={exitWithoutSaving}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary mt-2">Continue to quantities</button>
        </div>

        {showModal && <Modal onClose={closeModal} />}
      </>
    </form>
  );
};

export default Details;

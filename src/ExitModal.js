import React from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="modal fade show exitmodal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Unsaved changes</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to leave? Your changes will not be saved.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Lose changes
            </button>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Continue editing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

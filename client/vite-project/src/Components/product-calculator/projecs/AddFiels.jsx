import React, { useState } from 'react';

const IconModalsWithForm = ({ projectData }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    Calcium: '',
    Magnecium: '',
    Celen: '',
    'Vitamin-B6': '',
    'Vitamin-B12': '',
  });

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    // Reset form data when closing the modal
    setFormData({
      name: '',
      Calcium: '',
      Magnecium: '',
      Celen: '',
      'Vitamin-B6': '',
      'Vitamin-B12': '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting new product:', formData);
    closeModal();
  };

  return (
    <div>
      <div className="controls">
        <i className="ph ph-plus-square" onClick={() => openModal('add')}></i>
        <i className="ph ph-pencil" onClick={() => openModal('edit')}></i>
        <i className="ph ph-trash" onClick={() => openModal('delete')}></i>
        <i className="ph ph-sliders-horizontal" onClick={() => openModal('settings')}></i>
      </div>

      {activeModal === 'add' && (
        <div className="modal">
          <h2>Create New Product</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type product name"
                required
              />
            </div>
            {Object.entries(projectData.table.Values).map(([key, unit]) => (
              <div key={key}>
                <label htmlFor={key}>{`${key} (${unit})`}</label>
                <input
                  type="number"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={`Enter ${key} value`}
                  required
                />
              </div>
            ))}
            <div className="modal-actions">
              <button type="button" onClick={closeModal}>Cancel</button>
              <button type="submit">Add new product</button>
            </div>
          </form>
        </div>
      )}

      {/* Placeholder modals for other icons */}
      {activeModal === 'edit' && <div className="modal">Edit Modal Content</div>}
      {activeModal === 'delete' && <div className="modal">Delete Modal Content</div>}
      {activeModal === 'settings' && <div className="modal">Settings Modal Content</div>}
    </div>
  );
};

export default IconModalsWithForm;
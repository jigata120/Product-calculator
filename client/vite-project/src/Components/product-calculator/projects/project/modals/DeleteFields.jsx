import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './crudFormsStyle.module.css';

export default function DeleteField({ project, setProjectData, setModalDeleteActive }) {
    const navigate = useNavigate();
    const values = project.table?.Values || {};
    const products = project.table?.Products || {};
    const [selectedValues, setSelectedValues] = useState({});
    const [selectedProducts, setSelectedProducts] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [doubleConfirm, setDoubleConfirm] = useState(false);

    const handleValueChange = (e) => {
        const { name, checked } = e.target;
        setSelectedValues(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleProductChange = (e) => {
        const { name, checked } = e.target;
        setSelectedProducts(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleDeleteProject = () => {
    
        navigate('/projects/');
    };

    const handleSubmit = () => {
        if (doubleConfirm) {
         
            const updatedValues = { ...values };
            const updatedProducts = { ...products };

            Object.keys(selectedValues).forEach(key => {
                if (selectedValues[key]) {
                    delete updatedValues[key];
                    Object.keys(updatedProducts).forEach(prodKey => {
                        delete updatedProducts[prodKey][key];
                    });
                }
            });

            Object.keys(selectedProducts).forEach(key => {
                if (selectedProducts[key]) {
                    delete updatedProducts[key];
                }
            });

            const updatedProject = {
                ...project,
                table: {
                    Values: updatedValues,
                    Products: updatedProducts
                }
            };

            setProjectData(updatedProject);
            setModalDeleteActive(false);
        } else if (confirmDelete) {
            if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
                if (window.confirm("This action will delete the project permanently. Are you absolutely sure?")) {
                    handleDeleteProject();
                }
            }
        } else {
            setDoubleConfirm(true);
        }
    };

    const closeModal = () => setModalDeleteActive(false);

    const valueCheckboxes = Object.keys(values).map(key => (
        <div className={styles.row} key={key}>
            <input
                className={styles.inputbox}
                type="checkbox"
                name={key}
                checked={!!selectedValues[key]}
                onChange={handleValueChange}
            />
            <label className={styles.labelCheckbox}>
                {key}
            </label>
        </div>
    ));

    const productCheckboxes = Object.keys(products).map(key => (
        <div className={styles.row} key={key}>
            <input
                className={styles.inputbox}
                type="checkbox"
                name={key}
                checked={!!selectedProducts[key]}
                onChange={handleProductChange}
            />
            <label className={styles.labelCheckbox}>
                {key}
            </label>
        </div>
    ));

    return (
        <div className={styles.box}>
            <div className={styles.boxForm}>
                <div className={styles.boxLoginTitle}>
                    <div className={`${styles.icon} ${styles.iconLogin}`} />
                    <h2 className={styles.h2}>Delete Fields</h2>
                </div>
                <div className={styles.boxLogin}>
                    <div className={styles.fieldsetBody}>
                        <h2 className={styles.h2}>Select Values to Delete</h2>
                        {valueCheckboxes}
                        <h2 className={styles.h2}>Select Products to Delete</h2>
                        {productCheckboxes}
                        <div className={styles.row}>
                            <input
                                type="button"
                                className={styles.box__submit}
                                value={doubleConfirm ? "Confirm Delete" : "Delete"}
                                onClick={handleSubmit}
                            />
                            <input
                                type="button"
                                className={styles.box__submit__close}
                                value="Close"
                                onClick={closeModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

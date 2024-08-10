import React, { useState, useCallback } from 'react';
import styles from './crudFormsStyle.module.css';

export default function AddField({ project, setProjectData, setModalAddActive }) {
    const values = project.table?.Values || {};
    const products = project.table?.Products || {};

    const defaultValues = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});

    const [formData, setFormData] = useState({
        value: '',
        unit: '',
        product: '',
        ...defaultValues
    });

    const handleChange = useCallback((e) => {
        let { name, value } = e.target;

         
        if (!isNaN(value)) {
            value = value.includes('.') ? parseFloat(value) : parseInt(value, 10);
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback(() => {
        const { value, unit, product, ...restValues } = formData;

        if (!value || !unit || !product) {
            alert('Please fill in all fields.');
            return;
        }

        const valuesData = { [value]: unit };
        const productsData = { [product]: restValues };

        addData(valuesData, productsData);
        setModalAddActive(false);
    }, [formData, setModalAddActive]);

    const addData = useCallback((valuesData = {}, productsData = {}) => {
        let lastNewProductValue = '';

        Object.keys(valuesData).forEach(key => {
            if (!values[key]) {
                lastNewProductValue = key;
                values[key] = valuesData[key];
                Object.keys(products).forEach(prodKey => {
                    products[prodKey][lastNewProductValue] = 0;
                });
            }
        });

        Object.keys(productsData).forEach(prodKey => {
            if (!products[prodKey]) {
                products[prodKey] = productsData[prodKey];
                products[prodKey][lastNewProductValue] = 0;
            }
        });

        localProjectData();
    }, [values, products, project, setProjectData]);

    const localProjectData = useCallback(() => {
        const updatedProject = {
            ...project,
            table: {
                Values: values,
                Products: products
            }
        };
        setProjectData(updatedProject);
    }, [project, setProjectData, values, products]);

    const closeModal = useCallback(() => setModalAddActive(false), [setModalAddActive]);

    const productValuesFields = Object.keys(values).map(key => (
        <p key={key} className={styles.field}>
            <label>{key}</label>
            <input
                type="number"
                name={key}
                placeholder={`${values[key]}`}
                value={formData[key]}
                onChange={handleChange}
            />
            <span className={`${styles.icon} ${styles.iconClose}`} />
        </p>
    ));

    return (
        <div className={styles.box}>
            <div className={styles.boxForm}>
                <div className={styles.boxLoginTitle}>
                    <div className={`${styles.icon} ${styles.iconLogin}`} />
                    <h2 className={styles.h2}>Add fields</h2>
                </div>
                <div className={styles.boxLogin}>
                    <div className={styles.fieldsetBody}>
                        <h2 className={styles.h2}>Add Values</h2>
                        <p className={styles.field}>
                            <label htmlFor="value">Value</label>
                            <input
                                type="text"
                                id="value"
                                name="value"
                                placeholder='ex. protein'
                                value={formData.value}
                                onChange={handleChange}
                            />
                            <span className={`${styles.icon} ${styles.iconWarning}`} />
                        </p>
                        <p className={styles.field}>
                            <label htmlFor="unit">Unit</label>
                            <input
                                type="text"
                                id="unit"
                                name="unit"
                                placeholder='ex. g - (for grams)'
                                value={formData.unit}
                                onChange={handleChange}
                            />
                            <span className={`${styles.icon} ${styles.iconClose}`} />
                        </p>
                        <h2 className={styles.h2}>Add Product</h2>
                        <p className={styles.field}>
                            <label htmlFor="product">Product name</label>
                            <input
                                type="text"
                                id="product"
                                name="product"
                                placeholder='ex. beef'
                                value={formData.product}
                                onChange={handleChange}
                            />
                            <span className={`${styles.icon} ${styles.iconClose}`} />
                        </p>
                        {productValuesFields}
                        <div className={styles.row}>
                            <input
                                type="button"
                                className={styles.box__submit}
                                value="Add"
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

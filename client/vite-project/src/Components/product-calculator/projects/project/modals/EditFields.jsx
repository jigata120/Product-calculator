import React, { useState, useEffect, useCallback } from 'react';
import styles from './crudFormsStyle.module.css';

export default function EditField({ 
    project, 
    setProjectData, 
    setModalEditActive,
    selectedProduct 
}) {
    const values = project.table?.Values || {};
    const products = project.table?.Products || {};

  
    const [formData, setFormData] = useState(() => {
        const defaultValues = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: products[selectedProduct]?.[key] || 0 }), {});
        return {
            product: selectedProduct,
            ...defaultValues
        };
    });

    
    const handleChange = useCallback((e) => {
        let { name, value } = e.target;
        if (!isNaN(value) && value !== '') {
            value = value.includes('.') ? parseFloat(value) : parseInt(value, 10);
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);

   
    const handleSubmit = useCallback(() => {
        const { product, ...restValues } = formData;

        if (!product) {
            alert('Product name is required.');
            return;
        }

        const productsData = { [product]: restValues };

        editData(productsData);
        setModalEditActive(false);
    }, [formData, setModalEditActive]);

    const editData = useCallback((productsData = {}) => {
        Object.keys(productsData).forEach(prodKey => {
            products[prodKey] = productsData[prodKey];
        });

 
        localProjectData();
    }, [products]);

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

    const closeModal = useCallback(() => setModalEditActive(false), [setModalEditActive]);

    const productValuesFields = Object.keys(values).map(key => (
        <p key={key} className={styles.field}>
            <label>{key}</label>
            <input
                type="number"
                name={key}
                placeholder={`${values[key]}`}
                value={formData[key] || ''}
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
                    <h2 className={styles.h2}>Edit fields</h2>
                </div>
                <div className={styles.boxLogin}>
                    <div className={styles.fieldsetBody}>
                        <h2 className={styles.h2}>Edit Product</h2>

                        <p className={styles.field}>
                            <label htmlFor="product">Product name</label>
                            <input
                                type="text"
                                id="product"
                                name="product"
                                placeholder='Product name'
                                value={formData.product || ''}
                                onChange={handleChange}
                            />
                            <span className={`${styles.icon} ${styles.iconClose}`} />
                        </p>
                        {productValuesFields}
                        <div className={styles.row}>
                            <input
                                type="button"
                                className={styles.box__submit}
                                value="Save"
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

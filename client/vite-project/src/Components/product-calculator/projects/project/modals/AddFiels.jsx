import React, { useState } from 'react';
import styles from './crudFormsStyle.module.css'
import { object } from 'yup';

export default function AddField ({ 
  project ,
  setProjectData ,
  setModalAddActive
}){
   
  const [formData, setFormData] = useState({});

   
  const values = project.table?.Values || {};
  const products = project.table?.Products || {};

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
  };
  function addData(valuesData = {}, productsData = {} ){
    if (Object.keys(valuesData).length > 0){
        for (const key of Object.keys(valuesData)) {
            if (values[key]){
                console.log('already entered value');
            }else{
                values[key] = valuesData[key]
                for (const key of Object.keys(products)) {
                    products[key][values[key]]=0
                }
            }
         }   
    }
    if(Object.keys(productsData).length > 0){
        for (const key of Object.keys(productsData)) {
            if (products[key]){
                console.log('already entered product');
            }else{
                products[key] = productsData[key]
            }
         } 
    }
    localProjectData()   
  }
  function localProjectData(){
    const localProject ={
        ...project,
        table:{
            Values:values,
            Products:products
            }

    }
    setProjectData(localProject)
  }
  const handleSubmit = () => {
     
    console.log('Submitting new product:', formData);
    const  valuesData= {
      [formData.value]: formData.unit
    }; 
    const productsData = () => {
      const { value, unit, ...rest } = formData;  
      const { product, ...values}= rest
      return { [formData.product]:{...values}}; 
    };
    addData(valuesData,productsData())
    

    console.log(valuesData);
    console.log(productsData());
    setModalAddActive(false)
  };
   const closeModal = ()=>{
    setModalAddActive(false)
   } 
  const productValuesFields = Object.keys(values).map((key)=>(
    <p key={`${key}input`} className={styles.field}>
            <label  >{key}</label>
            <input type="number" id="valunit" name={key}   placeholder={`${values[key]}`}
             value={formData.name}
             onChange={handleChange}/>
            <span   className={`${styles.icon} ${styles.iconClose}`} />
    </p>
  ))
    
  return (
    <div className={styles.box}>
    <div className={styles.boxForm}>
      <div className={styles.boxLoginTab} />
      <div className={styles.boxLoginTitle}>
        <div className={`${styles.icon} ${styles.iconLogin}`} />
        <h2 className={styles.h2}>Add fields</h2>
      </div>
      <div className={styles.boxLogin}>
        <div className={styles.fieldsetBody} id="login_form">
        <h2 className={styles.h2}>Add Values</h2>
          <p className={styles.field}>
            <label htmlFor="user">Value</label>
            <input type="text" id="user" name="value" title="Username" placeholder='ex. protein'
            value={formData.name}
            onChange={handleChange}
            />
            <span id="valida" className={`${styles.icon} ${styles.iconWarning}`} />
          </p>
          <p className={styles.field}>
            <label htmlFor="unit">Unit</label>
            <input type="text" id="unit" name="unit" title="Password" placeholder='ex. g - (for grams)'
             value={formData.name}
             onChange={handleChange}/>
            <span id="valida" className={`${styles.icon} ${styles.iconClose}`} />
          </p>
          <h2 className={styles.h2}>Add Product</h2>

          <p className={styles.field}>
            <label htmlFor="Product">Product name</label>
            <input type="text" id="Product" name="product" title="Password" placeholder='ex. beef'
             value={formData.name}
             onChange={handleChange}/>
            <span id="valida" className={`${styles.icon} ${styles.iconClose}`} />
          </p>
          {productValuesFields}
          {/* <label className={styles.labelCheckbox}>
            <input
              type="checkbox"
              defaultValue="TRUE"
              title="Keep me Signed in"
            />{" "}
            Keep me Signed in
          </label> */}
          <div className={styles.row}>
          <input
            type="submit"
            id="do_login"
            className={styles.box__submit}
            defaultValue="GET STARTED"
            title="Get Started"
            onClick={handleSubmit}
          />
          <input
             
            id="do_login"
            className={styles.box__submit__close}
            defaultValue="Close"
             
          />
          </div>
        </div>
      </div>
    </div>
  </div>

  

    
      
  );
};

 
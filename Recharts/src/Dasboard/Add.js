import axios from "axios";
import React, { useState } from "react";
import '../Components/Signup.css';
import { API_url } from '../api';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';


export default function Add(){
    
    const navigate = useNavigate();


    const validate = (values) => {
      const errors = {};
  
      if (!values.Product) {
        errors.Product = "*Required"
      } 
  
      if (!values.price) {
        errors.price = "*Required"
      } 
      if (!values.discount) {
        errors.discount = "*Required"
      } 
  
      return errors;
  
    };
  
  
  
  
  
    const formik = useFormik({
      initialValues: {
        Product: "",
        price: "",
        discount: "",
  
      },
      validate,
      onSubmit: async(values) => {
        console.log(values);
        await axios.post(API_url,{
          Product:values.Product,
          price:values.price,
          discount:values.discount,
        })
        navigate("/Getall");
      }
    })
    
   
    return(
        <div className="main">

            <h1>Add data</h1>
            <form onSubmit={formik.handleSubmit}>
        <input type="text" placeholder='Product' name='Product' value={formik.values.Product} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.touched.Product && formik.errors.Product ? <span>{formik.errors.Product}</span> : null}
        <input type="text" placeholder='price' name='price' value={formik.values.price} onBlur={formik.handleBlur} onChange={formik.handleChange} />


        {formik.touched.price && formik.errors.price ? <span>{formik.errors.price}</span> : null}
        <input type="text" placeholder='discount' name='discount' value={formik.values.discount} onBlur={formik.handleBlur} onChange={formik.handleChange} />


        {formik.touched.discount && formik.errors.discount ? <span>{formik.errors.discount}</span> : null}

        <input type="submit"></input>


      </form>
        </div>
    )
}
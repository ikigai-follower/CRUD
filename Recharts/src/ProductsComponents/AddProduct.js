import axios from "axios";
import React from "react";
import "../Components/SignUp.css";
import { API_url } from "../api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { REQUIRED } from "../Components/ErrorMessage";
import { Button } from "@mui/joy";

export default function AddProduct() {
  //navigate to one to another page
  const navigate = useNavigate();

  //validation -error message function
  const validate = (values) => {
    const errors = {};

    if (!values.Product) {
      errors.Product = REQUIRED;
    }

    if (!values.price) {
      errors.price = REQUIRED;
    }
    if (!values.discount) {
      errors.discount = REQUIRED;
    }

    return errors;
  };

  //initialize the formik valdation
  const formik = useFormik({
    initialValues: {
      Product: "",
      price: "",
      discount: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      await axios.post(API_url, {
        Product: values.Product,
        price: values.price,
        discount: values.discount,
      });
      navigate('/ProductList' );
    },
  });

  return (
    <div className="main">
      <h1>Add data</h1>
      {/* ADD NEW PRODUCT LIST DETAILS FIELDS*/}
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Product"
          name="Product"
          value={formik.values.Product}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.Product && formik.errors.Product ? (
          <span>{formik.errors.Product}</span>
        ) : null}
        <input
          type="text"
          placeholder="price"
          name="price"
          value={formik.values.price}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.price && formik.errors.price ? (
          <span>{formik.errors.price}</span>
        ) : null}
        <input
          type="text"
          placeholder="discount"
          name="discount"
          value={formik.values.discount}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.discount && formik.errors.discount ? (
          <span>{formik.errors.discount}</span>
        ) : null}
        <Button   variant="outlined" type="submit" placeholder='Submit' name='submit' className='btn'>Submit</Button>
      </form>
    </div>
  );
}

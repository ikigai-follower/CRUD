import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "primeicons/primeicons.css";
import { EMAIL,PASSWORD,REQUIRED } from "./ErrorMessage";
import { Button} from "@mui/joy";

export default function Login() {
  //state for password eye icon
  const [update, setUpdate] = useState(true);
  const navigate = useNavigate();

  //condition for password eye icon
  const Toggle = () => {
    setUpdate(!update);
  };

 
  //validation -error message function
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email =REQUIRED;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = EMAIL;
    }

    if (!values.password) {
      errors.password = REQUIRED;
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(
        values.password
      )
    ) {
      errors.password = PASSWORD;
    }

    return errors;
  };
  //initialize the formik valdation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      navigate("/Main");
    },
  });

  return (
    <div className="login" style={{ marginTop: "100px" }}>
      <h1>LogIn</h1>
      {/* login Fields */}
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <span>{formik.errors.email}</span>
        ) : null}
        <input
          type={update ? "password" : "text"}
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />

        {!update ? (
          <button type="button" className="btneye" onClick={Toggle}>
            <span className="pi pi-eye"></span>
          </button>
        ) : (
          <button className="btneye" type="button" onClick={Toggle}>
            <span className="pi pi-eye-slash"></span>
          </button>
        )}
        <br />

        {formik.touched.password && formik.errors.password ? (
          <span>{formik.errors.password}</span>
        ) : null}

      
        <Button variant="outlined" type="submit"  className='btn'>Submit</Button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          New User?
          <a
            href="/"
            style={{
              color: "green",
              fontSize: "20px",
              padding: "10px",
              textDecoration: "none",
            }}
          >
            {" "}
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}

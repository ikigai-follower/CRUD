import { useFormik } from 'formik';
import React from 'react';
import './SignUp.css';
import {useNavigate } from 'react-router-dom';
import {REQUIRED ,PASSWORD,CONFIRMPASSWORD,EMAIL,VALIDATENAME} from "./ErrorMessage";
import { Button} from "@mui/joy";

export default function SignUp() {

    //Navigate to one page to another
    const navigate = useNavigate ();

    //validation -error message function
    const validate= (values) => {
        const errors={} ;
        if (!values.firstName) {
            errors.firstName=REQUIRED
        }else if(!/^[a-zA-Z ]{2,30}$/.test(values.firstName)){
            errors.firstName= VALIDATENAME
        }
        if (!values.lastName) {
            errors.lastName=REQUIRED
        }else if((values.lastName.length >=3 )){
            errors.lastName= VALIDATENAME
        }
        if (!values.email) {
            errors.email=REQUIRED
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email= EMAIL
        }
        
        if (!values.password) {
            errors.password=REQUIRED
        }else if(! /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(values.password)){
            errors.password= PASSWORD
        }
        if (!values.confirmPassword) {
            errors.confirmPassword=REQUIRED
        }else if(values.password !== values.confirmPassword){
            errors.confirmPassword =CONFIRMPASSWORD
        }

        return errors;
        
    };
    //initialize the formik valdation
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",

        },
        validate,
        onSubmit:(values)=>{
            alert(`${values.firstName} successfully registered`);
            navigate("/Login");
        }

    });


    return (
        <div className="main">

            <h1>SignUp</h1>
            {/* SignUp Fields */}
            <form onSubmit={formik.handleSubmit}>
                <input type="text" placeholder='First Name' name='firstName' value={formik.values.firstName} onChange={formik
                    .handleChange}  onBlur={formik.handleBlur} autoComplete='off'>

                </input>
                    {formik.touched.firstName && formik.errors.firstName ? <span>{formik.errors.firstName}</span> :null
                    }

                <input type="text" placeholder='Last Name' name='lastName' onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete='off'>

                </input>
                {formik.touched.lastName && formik.errors.lastName ? <span>{formik.errors.lastName}</span> :null
                    }
                <input type="text" placeholder='Email' name='email' onChange={formik
                    .handleChange}  onBlur={formik.handleBlur} autoComplete='off'>

                </input>
                {formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> :null
                }

                <input type="password" placeholder='Password' name='password' onChange={formik
                    .handleChange} onBlur={formik.handleBlur} autoComplete='off'>

                </input>
                {formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> :null
                }

                <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={formik
                    .handleChange} onBlur={formik.handleBlur} autoComplete='off'>

                </input>
                     {formik.touched.confirmPassword && formik.errors.confirmPassword ? <span>{formik.errors.confirmPassword}</span> :null
                }
                    <br></br>
                <Button   variant="outlined" type="submit" placeholder='Submit' name='submit' className='btn'>Submit</Button>
                <p style={{textAlign:"center",marginTop:"20px"}}>Already Have an account?   
                    <a href='/Login'  style={{color:"green",fontSize:"20px",padding:"10px",textDecoration:"none"}}> Login</a></p>

             
            </form>
        </div>
    )

}

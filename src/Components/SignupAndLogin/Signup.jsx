import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import './Login.css'
const Signup = () => {
    const navigate = useNavigate();
    const initialValues = {
        Name: "",
        email: "",
        password: "",
        cpassword: "",
      };
      const validation = Yup.object({
        Name: Yup.string().required("Name is Required"),
        email: Yup.string().required("Email is Required"),
        password: Yup.string().required("Password is Required"),
        cpassword: Yup.string().required("Confirm Password is required"),
      });
      
  return (
  
   <div className='container-Image'>
   <Formik
              initialValues={initialValues}
              validationSchema={validation}
              // onSubmit = {submission()}
              onSubmit={async (value, actions) => {
                try {
                  if(value.password !== value.cpassword){
                    toast.error("Password not matched");
                  }
                  else if (value !== undefined || "") {
                    const { data } = await axios.post("http://localhost:8080/api/user/setsignin", value);
                    console.log(data, "data");
                  if(data.status ==true){
                   toast.success(data.message);
                   actions.resetForm();
                   setTimeout(()=>{
                     navigate("/login");
                   },3000);
               
                  }
                  else if(data.status ==false){
                    toast.error(data.message);
                  }
                    
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              {(formik) => (
                
                <div className='Main-Container p-5'>
                 
                <Form>
                   <ToastContainer/>
   
    
    <div className="row">
      
        <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
            {/* <h1 className='text-center mt-2 text-primary'>CONNECT  METAVERSE</h1>
            <h5 className='text-center mt-2 text-secondary'>Explore the virtual world</h5> */}
            <div className="panel border bg-white p-5">
    

                <div className="panel-heading">
                    <h3 className="pt-3 font-weight-bold">Register</h3>
                </div>
                <div className="panel-body p-3">
                    
                        <div className="form-group py-2">
                            <div className="input-field"> <span className="far fa-user py-3 px-3"></span>
                             <input type="text" placeholder="Username "  name="Name" value={formik.values.Name} onChange={formik.handleChange} />
                             </div>
                             <ErrorMessage component="div" className="color" name="Name" />
                        </div>
                        <div className="form-group py-2">
                            <div className="input-field"> <span className="far fa-user py-3 px-3"></span>
                             <input type="email" placeholder="Email"  name="email" value={formik.values.email} onChange={formik.handleChange}  />
                            
                             </div>
                             <ErrorMessage component="div" className="color" name="email" /> 
                        </div>
                        <div className="form-group  ">
                            <div className="input-field"> <span className="fas fa-lock  py-3 px-3"></span>
                             <input type="password" placeholder="Enter your Password"  name="password" value={formik.values.password} onChange={formik.handleChange} /> 
                             {/* <button className="btn bg-white text-muted"> <span className="far fa-eye-slash"></span> </button>  */}
                            </div> <ErrorMessage component="div" className="color" name="password" />
                        </div>
                        <div className="form-group  ">
                            <div className="input-field"> <span className="fas fa-lock  py-3 px-3"></span>
                             <input type="password" placeholder="Confirm Password"  name="cpassword" value={formik.values.cpassword} onChange={formik.handleChange} /> 
                             {/* <button className="btn bg-white text-muted">
                               <span className="far fa-eye-slash"></span> </button>  */}
                             </div>
                             <ErrorMessage component="div" className="color" name="cpassword" />
                        </div>                      
                        <button type="submit" className="btn btn-primary btn-block p-2 mt-3">Register</button>
                        <div className="text-center pt-4 text-muted">Have an account? <Link to="/login">Login</Link> </div>
                   
                </div>
                {/* <div className="mx-3 my-2 py-2 bordert">
                    <div className="text-center  py-3"> <a href="" target="_blank" className="px-2">  </a> <a href="" target="_blank" className="px-2"> <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="" /> </a> <a href="" target="_blank" className="px-2"> <img src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png" alt=""/> </a> </div>
                </div> */}
            </div>
        </div>
    </div>


</Form>
    </div>          )}
            </Formik>
            </div>
  
  )
}

export default Signup
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import './Login.css'
const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        
        email: "",
        password: "",
       
      };
      const validation = Yup.object({
       
        email: Yup.string().required("Email is Required"),
        password: Yup.string().required("Password is Required"),
       
      });
    
  return (
   <>
   <div className='container-Image'>
    <Formik
              initialValues={initialValues}
              validationSchema={validation}
              // onSubmit = {submission()}
             
              onSubmit={async (value, actions) => {
                try {
                  console.log(value);
                  
                    const  data  = await axios.post("http://localhost:8080/api/user/setlogin", value);
                    console.log(data.data, "data");
                  if(data.data.status ===true){
                    localStorage.setItem("user", data.data.data)
                    // console.log(data.data.data)
                    toast.success(data.data.message);
                   actions.resetForm();
                   setTimeout(()=>{
                  navigate("/home")
                   },3000)
                   
                   
                  }
                  else if(data.data.status ==false){

                    toast.error(data.data.message);
                  }
                    
                 
                } catch (err) {
                  console.log(err);
                }
              }}
            
            >
              {(formik) => (
                <Form>
                  
  
  <div className='Main-Container p-5'>
    <div className=' p-5'>
    <ToastContainer/>
    <div className="row p-5">
        <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
        {/* <h1 className='text-center mt-2 text-primary'>CONNECT  METAVERSE</h1>
            <h5 className='text-center mt-2 text-secondary'>Explore the virtual world</h5>   */}
            <div className="panel border bg-white">
    

                <div className="panel-heading py-3">
                    <h3 className="">Login</h3>
                </div>
                <div className="panel-body  p-3">
                    
                        <div className="form-group ">
                            <div className="input-field"> <span className="far fa-user py-3 px-4"></span> <input type="text" placeholder="Enter Email"  name="email" value={formik.values.email} onChange={formik.handleChange} /> </div>
                            <ErrorMessage component="div" className="color" name="email" />
                        </div>
                        <div className="form-group  pb-2">
                            <div className="input-field"> <span className="fas fa-lock py-3 px-4"></span> <input type="password" placeholder="Enter your Password"  name="password" value={formik.values.password} onChange={formik.handleChange}/>   </div>
                            <ErrorMessage component="div" className="color" name="password" />
                        </div>
                        <div className="form-inline"> 
                        {/* <input type="checkbox" name="remember" id="remember"/> */}
                         {/* <label for="remember" className="text-muted">Remember me</label> */}
                         <a id="forgot" className="font-weight-bold">Forgot password?</a> </div>
                        <button className="btn btn-primary btn-block p-2 mt-3" type='submit'>Login</button>
                        <div className="text-center pt-4 text-muted">Don't have an account?  <Link to="/register">Sign up</Link> </div>
                    
                </div>
                {/* <div className="mx-3 my-2 py-2 bordert">
                    <div className="text-center  py-3"> <a href="" target="_blank" className="px-2">  </a> <a href="" target="_blank" className="px-2"> <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="" /> </a> <a href="" target="_blank" className="px-2"> <img src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png" alt=""/> </a> </div>
                </div> */}
            </div>
        </div>
    </div>
</div>
</div>
</Form>
              )}
            </Formik>
            </div>
   </>
  )
}

export default Login
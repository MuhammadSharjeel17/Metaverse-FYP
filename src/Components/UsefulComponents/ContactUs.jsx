import React from 'react'
import '../UsefulComponents/ContactUs.css';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const ContactUs = () => {
  const initialValues = {
    Name: "",
    email: "",
    phoneNumber:"",
    message: "",
  };
  const validation = Yup.object({
    Name: Yup.string().required("Name is Required"),
    email: Yup.string().required("Email is Required"),
    phoneNumber: Yup.string().required("phoneNumberis Required"),
    message: Yup.string().required("Message cannot be Blank"),
  });

  return (
   <>
   
   <Formik
              initialValues={initialValues}
              validationSchema={validation}
              // onSubmit = {submission()}
              onSubmit={async (value, actions) => {
                try {
                   if (value !== undefined || "") {
                    const { data } = await axios.post("http://localhost:8080/api/details/sendmessage", value);
                    console.log(data, "data");
                  if(data.success ==true){
                   toast.success(data.message);
                   actions.resetForm();
                  }
                    
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              {(formik) => (
                <Form>
                   <ToastContainer/>
   <div className=" d-flex justify-content-center ">
  
                  <div className="form-box ">
                    <div className="Forms d-grid justify-content-center items-center">
                      <div>
                        <label className="text-muted mr-4">Name *</label>
                        <br />
                        <input className="input" type="text" placeholder="Enter Your Name" name="Name" value={formik.values.Name} onChange={formik.handleChange} />
                        <ErrorMessage component="div" className="color" name="Name" />
                        <br />
                      </div>

                      <div className="mt-2">
                        <label className="text-muted mr-4">Email *</label>
                        <br />
                        <input className="input" type="email" placeholder="Enter Your Email" name="email" value={formik.values.email} onChange={formik.handleChange}/>
                        <ErrorMessage component="div" className="color" name="email" />
                        <br />
                      </div>
                      <div className="mt-2">
                        <label className="text-muted mr-4">Contact No *</label>
                        <br />
                        <input className="input" type="number" placeholder="Enter Your Phone Number" name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange}/>
                        <ErrorMessage component="div" className="color" name="phoneNumber" /> <br />
                      </div>
                      <div className="mt-2">
                        <label className="text-muted mr-4">Message *</label>
                        <br />
                        <textarea placeholder="Write Message..." rows="4" name="message" value={formik.values.message} onChange={formik.handleChange}></textarea>
                        <ErrorMessage component="div" className="color" name="message" />
                      </div>

                      <button type="submit"  className="btn buttons btn-primary btn-lg rounded mx-2 ">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                </Form>
              )}
            </Formik>
   </>
  )
}

export default ContactUs
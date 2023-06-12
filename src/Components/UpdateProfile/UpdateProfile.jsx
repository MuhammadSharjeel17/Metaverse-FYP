import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './UpdateProfile.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const UpdateProfile = ({ handleCloseModal }) => {
  const [data, setData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/getuser/${id}`)
      .then((response) => {
        setData(response.data.data);
        setImagePreview(`http://localhost:8080/ImageUploads/${response.data.data.image}`);
        formik.setFieldValue('name', response.data.data.Name);
        formik.setFieldValue('email', response.data.data.email);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: null,
      email: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is Required'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      if (imageFile) {
        formData.append('image', imageFile);
      }
      formData.append('name', values.name);
      formData.append('email', values.email);
      const { data } = await axios.put(`http://localhost:8080/api/user/updateuser/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.status === true) {
        toast.success(data.message);
        setTimeout(() => {
          // handleCloseModal();
          navigate('/home')
        }, 1000);
      } else if (data.status === false) {
        toast.error(data.message);
        setSubmitting(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      formik.setFieldValue('image', file);
    } else {
      setImagePreview(`http://localhost:8080/ImageUploads/${data.image}`);
      formik.setFieldValue('image', data.image);
    }
  };

  return (
    <>
      <ToastContainer />
      <h2 className="text-center mt-5 text-black">Update Profile</h2>
      <form onSubmit={formik.handleSubmit} className="form-container">
        <div>
          <label>Profile Picture</label>
          <input id="image" type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img className="image-size" src={imagePreview} alt="Profile Preview" />}
          {formik.touched.image && formik.errors.image && <div className="text-danger">{formik.errors.image}</div>}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Enter name" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" readOnly placeholder="Enter email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </>
  );
};

export default UpdateProfile;

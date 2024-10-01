import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

//this page is for new users to register
const Register = () => {
  const navigate = useNavigate();

  // formik declaration
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `https://jobssearchbackend.onrender.com/api/auth/register`,
          values
        );
        if (response.status == 200) {
          toast.success(response.data.message);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <div className="font-bold  text-4xl">
              <span className="px-2 py-1 bg-gradient-to-r from-blue-400 via via-blue-500 to-blue-700 rounded-lg text-white">
                Account Must!
              </span>
            </div>
            <p className="text-sm mt-6">
              **To use this app, registration is must. You can login, if you
              already have an account.
            </p>
          </div>
          <div className="flex-1">
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <Label value="Username" className="form-label" />
                <TextInput
                  type="text"
                  className="form-control"
                  placeholder="Enter your User Name"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                <div className="text-red-600">{formik.errors.username}</div>
              </div>
              <div>
                <Label value="Email" className="form-label" />
                <TextInput
                  type="email"
                  className="form-control"
                  placeholder="name@emailservice.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <div className="text-red-600">{formik.errors.email}</div>
              </div>
              <div>
                <Label value="Password" className="form-label" />
                <TextInput
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <div className="text-red-600">{formik.errors.password}</div>
              </div>
              <Button gradientDuoTone="purpleToBlue" type="submit">
                Register
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-6">
              <span>Already Have An Account ?</span>
              <Link to="/login" className="text-blue-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
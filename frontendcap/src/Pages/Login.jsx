//import
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { mycontext } from "../App";


// login form
const Login = () => {
  //to navigate to pages
  const navigate = useNavigate();
  //statemanagement
  const [user, setUser] = useContext(mycontext);
  
  // formik declaration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `https://jobssearchbackend.onrender.com/api/auth/login`,
          values
        );
        if (response.status == 200) {
          toast.success(response.data.message);
          localStorage.setItem("Token", response.data.token); //token from the response is stored in local storage

          setUser(response.data.rest); //user details from the response is set to user
          navigate("/home");
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
          <div className="flex-1"></div>

          <div className="flex-1">
            <p className="font-bold text-xl mb-5 text-blue-700 text-center">
              USER LOGIN
            </p>
            <form
              className="flex flex-col gap-5"
              onSubmit={formik.handleSubmit}
            >
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
                Login 
              </Button>
            </form>
            <div className="flex   gap-2 textsm mt-6 justify-between">
              <div>
                <span>New user? </span>
                <Link to="/" className="text-blue-700 ">
                  Click here
                </Link>
              </div>
              <div>
                {" "}
                <Link to="/forgetpassword" className="text-red-600">
                  Forget password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
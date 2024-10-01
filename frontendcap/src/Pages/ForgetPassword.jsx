import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SiMinutemailer } from "react-icons/si";

// Forget Password Page 
const ForgetPassword = () => {
  const navigate = useNavigate();

  // formik declaration
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {

        //will post the user mail to backend to perform required action
        const response = await axios.post(
          "https://jobssearchbackend.onrender.com/api/auth/forgot-password",
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
                Forget Password?
              </span>
            </div>
            <p className="text-sm mt-6">
              Don&apos;t worry! Enter your email, we will send you a password
              reset link via mail.
            </p>
          </div>
          <div className="flex-1">
            <form
              className="flex flex-col gap-4"
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

              <Button gradientDuoTone="purpleToBlue" type="submit">
                Send Mail&nbsp;<SiMinutemailer/>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
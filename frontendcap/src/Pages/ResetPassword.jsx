import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineLockReset } from "react-icons/md";

//reset password page
const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  // formik declaration
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `https://jobssearchbackend.onrender.com/api/auth/reset-password/${id}/${token}`,
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
                Password Reset
              </span>
            </div>
            <p className="text-sm mt-6">
              To reset your password for the JobSearch website login, kindly
              enter your new password and click on the reset button.
            </p>
          </div>
          <div className="flex-1">
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <Label value="Password" className="form-label" />
                <TextInput
                  type="password"
                  className="form-control"
                  placeholder="Enter a New Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <div className="text-red-600">{formik.errors.password}</div>
              </div>

              <Button gradientDuoTone="purpleToBlue" type="submit">
                Reset Password &nbsp;<MdOutlineLockReset className="text-xl"/>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
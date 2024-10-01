import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";

//admin's post job page
const PostJobs = () => {
  const navigate = useNavigate();
  // formik declaration
  const formik = useFormik({
    initialValues: {
      company: "",
      role: "",
      skillsRequired: [],
      location: "",
      salary: "",
      link: "",
      email: "",
    },
    validationSchema: Yup.object({
      company: Yup.string().required("company name is required"),
      role: Yup.string().required("role is required"),
      skillsRequired: Yup.array().required("skills are required"),
      location: Yup.string().required("location is required"),
      salary: Yup.string().required("salary is required"),
      link: Yup.string().required("Company's Website is required"),
      email: Yup.string().required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `https://jobssearchbackend.onrender.com/api/admin/post-job`,
          values
        );
        if (response.status == 200) {
          toast.success(response.data.message);
          console.log(response.data);
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
      <div className="m-10 p-10 bg-gradient-to-r from-indigo-400 to-cyan-400  text-white ">
        <h1 className="text-center text-xl ">CREATE NEW JOB POST</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* company name */}
                  <div className="sm:col-span-3">
                    <Label
                      value="Company Name"
                      className="form-label block text-sm font-medium leading-6 text-gray-900"
                    />
                    <div className="mt-2">
                      <TextInput
                        type="text"
                        name="company"
                        id="company"
                        onChange={formik.handleChange}
                        className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <div className="text-red-600">
                        {formik.errors.company}
                      </div>
                    </div>
                  </div>
                  {/* Job role */}
                  <div className="sm:col-span-3">
                    <Label
                      value="Job Role"
                      className="form-label block text-sm font-medium leading-6 text-gray-900"
                    />
                    <div className="mt-2">
                      <TextInput
                        type="text"
                        name="role"
                        id="role"
                        onChange={formik.handleChange}
                        className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <div className="text-red-600">{formik.errors.role}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Skills */}
              <div className="border-b border-gray-900/10 pb-12">
                <p className="text-base font-medium leading-7 text-gray-900 mt-4">
                  Required Skills
                </p>

                <div
                  className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                  role="group"
                  aria-labelledby="checkbox-group"
                >
                  <div className="sm:col-span-2 sm:col-start-1">
                    <div className="flex items-center gap-x-3 mb-3">
                      <TextInput
                        type="checkbox"
                        name="skillsRequired"
                        value="HTML"
                        onChange={formik.handleChange}
                      />
                      <Label>HTML</Label>
                    </div>
                    <div className="flex items-center gap-x-3  mb-3">
                      <TextInput
                        type="checkbox"
                        name="skillsRequired"
                        value="CSS"
                        onChange={formik.handleChange}
                      />
                      <Label> CSS</Label>
                    </div>
                    <div className="flex items-center gap-x-3  mb-3">
                      <TextInput
                        type="checkbox"
                        name="skillsRequired"
                        value="Javascript"
                        onChange={formik.handleChange}
                      />
                      <Label> Javascript</Label>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center gap-x-3  mb-3">
                      <TextInput
                        type="checkbox"
                        name="skillsRequired"
                        value="MongoDB"
                        onChange={formik.handleChange}
                      />
                      <Label>MongoDB</Label>
                    </div>
                    <div className="flex items-center gap-x-3  mb-3">
                      <TextInput
                        type="checkbox"
                        name="skillsRequired"
                        value="MySQL"
                        onChange={formik.handleChange}
                      />
                      <Label>MySQL</Label>
                    </div>
                    <div className="flex items-center gap-x-3  mb-3">
                      <TextInput
                        type="checkbox"
                        name="skillsRequired"
                        value="DataStructure"
                        onChange={formik.handleChange}
                      />
                      <Label> DataStructure</Label>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center gap-x-3  mb-3">
                      <TextInput
                        type="checkbox"
                        name="skillsRequired"
                        value="Java"
                        onChange={formik.handleChange}
                      />
                      <Label>Java</Label>
                    </div>
                    <div className="flex items-center gap-x-3  mb-3">
                      <TextInput
                        type="checkbox"
                        name="skillsRequired"
                        value="Python"
                        onChange={formik.handleChange}
                      />
                      <Label> Python</Label>
                    </div>
                    <div className="flex items-center gap-x-3  mb-3">
                      <TextInput
                        type="checkbox"
                        name="skillsRequired"
                        value="C++"
                        onChange={formik.handleChange}
                      />
                      <Label> C++</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Location */}
                <div className="sm:col-span-2 sm:col-start-1">
                  <Label
                    value="Location"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="location"
                      id="location"
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <div className="text-red-600">{formik.errors.location}</div>
                  </div>
                </div>

                {/* Salary */}
                <div className="sm:col-span-2">
                  <Label
                    value="Salary"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="number"
                      name="salary"
                      id="salary"
                      onChange={formik.handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <div className="text-red-600">{formik.errors.salary}</div>
                  </div>
                </div>
                {/* company's website link */}
                <div className="sm:col-span-2">
                  <Label
                    value="Website"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="link"
                      id="link"
                      onChange={formik.handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <div className="text-red-600">{formik.errors.link}</div>
                  </div>
                </div>
              </div>

              {/* Mail id */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-3">
                  <Label
                    value="Mail Id"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="email"
                      name="email"
                      id="email"
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <div className="text-red-600">{formik.errors.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <Button
              type="submit"
              className="rounded-md w-40  text-sm font-semibold text-white shadow-sm bg-blue-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              POST{AiOutlineUpload}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostJobs;
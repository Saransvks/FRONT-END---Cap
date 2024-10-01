import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { mycontext } from "../App";
import { Link } from "react-router-dom";
import { GiGraduateCap} from "react-icons/gi";
import { BiBuildings} from "react-icons/bi";
import { BsPerson, BsPostcard } from "react-icons/bs";
import {  GrUpdate } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { FaIndianRupeeSign, FaLocationDot, FaUserPen } from "react-icons/fa6";
import { LuPenLine } from "react-icons/lu";
import { PiCertificateLight } from "react-icons/pi";
import { AiOutlinePercentage } from "react-icons/ai";

//home page
const Home = () => {
  const [user, setUser] = useContext(mycontext);
  const token = localStorage.getItem("Token");

  // formik declaration
  const formik = useFormik({
    initialValues: {
      about: "",
      ugdegree: "",
      ugcourse: "",
      ugpercentage: "",
      pgdegree: "",
      pgcourse: "",
      pgpercentage: "",
      skills: [],
      expectingSalary: "",
      firstname: "",
      lastname: "",
      streetaddress: "",
      city: "",
      region: "",
      postalcode: "",
    },
    validationSchema: Yup.object({
      about: Yup.string().required("Need to be specified"),
      ugdegree: Yup.string().required("Need to be specified "),
      ugcourse: Yup.string().required("Need to be specified"),
      ugpercentage: Yup.string().required("Need to be specified"),
      pgdegree: Yup.string(),
      pgcourse: Yup.string(),
      pgpercentage: Yup.string(),
      skills: Yup.array(),
      expectingSalary: Yup.string().required("Need to be specified"),
      firstname: Yup.string().required(
        "Need to be specified in Capital letters"
      ),
      lastname: Yup.string().required(
        "Need to be specified in Capital letters"
      ),
      streetaddress: Yup.string().required("Need to be specified"),
      city: Yup.string().required("Need to be specified"),
      region: Yup.string().required("Need to be specified"),
      postalcode: Yup.string().required("Need to be specified"),
    }),
    onSubmit: async (values) => {
      try {
        //update user profile
        const response = await axios.put(
          `https://jobssearchbackend.onrender.com/api/user/update/${user._id}/${token}`,
          values
        );

        if (response.status == 200) {
          toast.success(response.data.message);

          localStorage.setItem("Token", response.data.token);
          setUser(response.data.rest); //user details from the response is set to user
        }
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message);
      }
    },
  });
  //for checkbox default value check
  const HTML = user.skills.filter((ele) => ele == "HTML").length;
  const CSS = user.skills.filter((ele) => ele == "CSS").length;
  const Javascript = user.skills.filter((ele) => ele == "Javascripy").length;
  const MySQL = user.skills.filter((ele) => ele == "MySQL").length;
  const MongoDB = user.skills.filter((ele) => ele == "MongoDB").length;
  const DataStructure = user.skills.filter(
    (ele) => ele == "DataStructure"
  ).length;
  const Java = user.skills.filter((ele) => ele == "Java").length;
  const Python = user.skills.filter((ele) => ele == "Python").length;
  const C = user.skills.filter((ele) => ele == "C++").length;

  return (
    <>
      <div className="m-10 p-10 bg-blue-200 rounded-lg">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-12 ">
            <div className="border-b border-gray-900/10 pb-12 ">
              {/* if the user is admin will show option to post jobs instead of card which display user details */}
              {user.isAdmin ? (
                <Button gradientDuoTone="purpleToBlue">
                  <Link to="/post-jobs">Post New Job +</Link>
                </Button>
              ) : (
                <Card className="max-w-8xl mx-auto">
                  <h5 className="text-2xl text-center font-bold tracking-tight text-blue-600">
                    USER DETAILS
                  </h5>
                  <div className="flex flex-col items-center ">
                    <img
                      alt="Bonnie image"
                      height="96"
                      src="https://tse3.mm.bing.net/th?id=OIP.fjrooo1XQXt5TYi1fHTJXgHaHa&pid=Api&P=0&h=180"
                      width="100"
                      className="mb-3 rounded-full shadow-lg"
                    />
                  </div>

                  <p className="text-center">
                    {" "}
                    <span className="font-semibold">{user.username}</span>
                  </p>
                  <p className="text-center">
                    {" "}
                    <span className="font-semibold">{user.email}</span>
                  </p>
                  <span className="text-sm text-gray-500 block text-center ">
                    {user.about}
                  </span>

                  <span className="text-sm text-green-500 font-semibold block text-center">
                    Hi {user.username}! To get job recommendations ,kindly update your details here
                  </span>
                </Card>
              )}
            </div>
            {/* About the user */}
            <div className="border-b border-gray-900/10 pb-12">
              <div className="col-span-full">
                <Label
                  value="About"
                  icon={FaUserPen}
                  className="form-label block text-sm font-medium leading-6 text-gray-900"
                />
                <div className="mt-2">
                  <Textarea
                    id="about"
                    name="about"
                    rows="3"
                    
                    defaultValue={user.about || ""}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></Textarea>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                  <div className="text-red-600">{formik.errors.about}</div>
                </div>
              </div>
            </div>
            {/* Educational qualifications */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Qualifications
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Undegraduation(must) and Postgraduation details(if user has
                one).
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <Label
                    value="UG Degree"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="ugdegree"
                      icon={GiGraduateCap}
                      id="ugdegree"
                      defaultValue={user.ugdegree || ""}
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <div className="text-red-600">{formik.errors.ugdegree}</div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label
                    value="UG Course"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="ugcourse"
                     icon={PiCertificateLight}
                      id="ugcourse"
                      defaultValue={user.ugcourse || ""}
                      onChange={formik.handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <div className="text-red-600">{formik.errors.ugcourse}</div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label
                    value="Percentage"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="ugpercentage"
                      icon={AiOutlinePercentage}
                      id="ugpercentage"
                      defaultValue={user.ugpercentage || ""}
                      onChange={formik.handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <div className="text-red-600">
                      {formik.errors.ugpercentage}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <Label
                    value="PG Degree"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="pgdegree"
                      id="pgdegree"
                      icon={GiGraduateCap}
                      defaultValue={user.pgdegree || ""}
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label
                    value="PG Course"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="pgcourse"
                      icon={PiCertificateLight}
                      id="pgcourse"
                      defaultValue={user.pgcourse || ""}
                      onChange={formik.handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label
                    value="Percentage"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="pgpercentage"
                      icon={AiOutlinePercentage}
                      id="pgpercentage"
                      defaultValue={user.pgpercentage || ""}
                      onChange={formik.handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Skills
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Select the skills you know
              </p>

              <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                role="group"
                aria-labelledby="checkbox-group"
              >
                <div className="sm:col-span-2 sm:col-start-1">
                  <div className="flex items-center gap-x-3 mb-3">
                    <TextInput
                      type="checkbox"
                      name="skills"
                      value="HTML"
                      onChange={formik.handleChange}
                      defaultChecked={HTML == 1}
                    />
                    <Label>HTML</Label>
                  </div>
                  <div className="flex items-center gap-x-3  mb-3">
                    <TextInput
                      type="checkbox"
                      name="skills"
                      value="CSS"
                      onChange={formik.handleChange}
                      defaultChecked={CSS == 1}
                    />
                    <Label> CSS</Label>
                  </div>
                  <div className="flex items-center gap-x-3  mb-3">
                    <TextInput
                      type="checkbox"
                      name="skills"
                      value="Javascript"
                      onChange={formik.handleChange}
                      defaultChecked={Javascript == 1}
                    />
                    <Label> Javascript</Label>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-x-3  mb-3">
                    <TextInput
                      type="checkbox"
                      name="skills"
                      value="MongoDB"
                      onChange={formik.handleChange}
                      defaultChecked={MongoDB == 1}
                    />
                    <Label>MongoDB</Label>
                  </div>
                  <div className="flex items-center gap-x-3  mb-3">
                    <TextInput
                      type="checkbox"
                      name="skills"
                      value="MySQL"
                      onChange={formik.handleChange}
                      defaultChecked={MySQL == 1}
                    />
                    <Label>MySQL</Label>
                  </div>
                  <div className="flex items-center gap-x-3  mb-3">
                    <TextInput
                      type="checkbox"
                      name="skills"
                      value="DataStructure"
                      onChange={formik.handleChange}
                      defaultChecked={DataStructure == 1}
                    />
                    <Label> DataStructure</Label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center gap-x-3  mb-3">
                    <TextInput
                      type="checkbox"
                      name="skills"
                      value="Java"
                      onChange={formik.handleChange}
                      defaultChecked={Java == 1}
                    />
                    <Label>Java</Label>
                  </div>
                  <div className="flex items-center gap-x-3  mb-3">
                    <TextInput
                      type="checkbox"
                      name="skills"
                      value="Python"
                      onChange={formik.handleChange}
                      defaultChecked={Python == 1}
                    />
                    <Label> Python</Label>
                  </div>
                  <div className="flex items-center gap-x-3  mb-3">
                    <TextInput
                      type="checkbox"
                      name="skills"
                      value="C++"
                      onChange={formik.handleChange}
                      defaultChecked={C == 1}
                    />
                    <Label> C++</Label>
                  </div>
                </div>
              </div>
            </div>
            {/* salary expectation per year */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Salary Expectation
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Enter the amount you expect as salary per year in number.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <TextInput
                      type="number"
                      icon={FaIndianRupeeSign}
                      name="expectingSalary"
                      id="expectingSalary"
                      defaultValue={user.expectingSalary || ""}
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <Label
                      value="per year*"
                      className="form-label block text-sm font-medium leading-6 text-gray-900"
                    />
                    <div className="text-red-600">
                      {formik.errors.expectingSalary}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* personal informations */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Label
                    value="First Name"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="firstname"
                     icon={BsPerson}
                      id="firstname"
                      defaultValue={user.firstname || ""}
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="text-red-600">
                      {formik.errors.firstname}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <Label
                    value="Last Name"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="lastname"
                      icon={LuPenLine}
                      id="lastname"
                      defaultValue={user.lastname || ""}
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="text-red-600">{formik.errors.lastname}</div>
                  </div>
                </div>

                <div className="col-span-full">
                  <Label
                    value="Street"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="streetaddress"
                      icon={IoHome}
                      id="streetaddress"
                      defaultValue={user.streetaddress || ""}
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="text-red-600">
                      {formik.errors.streetaddress}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <Label
                    value="City"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="city"
                      id="city"
                      icon={BiBuildings}
                      defaultValue={user.city || ""}
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <div className="text-red-600">{formik.errors.city}</div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Label
                    value="State"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="region"
                      id="region"
                      icon={FaLocationDot}
                      defaultValue={user.region || ""}
                      onChange={formik.handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <div className="text-red-600">{formik.errors.region}</div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Label
                    value="Postalcode"
                    className="form-label block text-sm font-medium leading-6 text-gray-900"
                  />
                  <div className="mt-2">
                    <TextInput
                      type="text"
                      name="postalcode"
                      icon={BsPostcard}
                      id="postalcode"
                      defaultValue={user.postalcode || ""}
                      onChange={formik.handleChange}
                      className="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="text-red-600">
                      {formik.errors.postalcode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              className="rounded-md px-3 py-2 text-sm font-semibold font-serif text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              UPDATE &nbsp;<GrUpdate/>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
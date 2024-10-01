import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { mycontext } from "../App";
import { Button, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";

// this page is to show the jobs based on the search and preferences

const Search = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useContext(mycontext);
  const token = localStorage.getItem("Token");
  const [applied, setApplied] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [query]); //need to be render when query is changed

  const fetchData = async () => {
    //sending the search value to backend simultaneously when search input is given
    const response = await axios.get(
      `https://jobssearchbackend.onrender.com/api/admin/getsearch?query=${query}`
    );
    if (response.status == 200) {
      setJobs(response.data); //on successful fetch response is set to jobs
    } else {
      console.log(response.data.message);
    }
  };

  //to handle job application
  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobId = e.target[0].value;

    try {
      const response = await axios.put(
        `https://jobssearchbackend.onrender.com/api/user/application/${jobId}/${token}`
      );
      if (response.status == 200) {
        setUser(response.data.rest);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //to manage button status
  const handleUpdate = () => {
    setApplied([...applied, true]);
  };

  return (
    <>
      <div className="m-2 p-8 min-h-screen">
        {/* search bar */}
        <form>
          <TextInput
            type="text"
            placeholder="try company name or role or location or salary!"
            onChange={(e) => setQuery(e.target.value)}
            rightIcon={AiOutlineSearch}
            className="hidden md:inline  "
          />
        </form>

        {jobs.map((ele, index) => {
          return (
            <div key={index}>
              <form onSubmit={handleSubmit}>
                <div className="space-y-12 p-4 m-2 hover:shadow-xl">
                  <div className="border border-gray-900/10 rounded-lg mx-auto bg-gradient-to-r from-indigo-400 to-cyan-400 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-6 p-12">
                    {/* for company name  and link */}
                    <div className="md:col-span-2 sm:col-start-1 mt-5">
                      <h1 className="text-center mb-3 mt-5 md:text-4xl fond-bold sm:text-xl font-serif">
                        {ele.company}
                      </h1>
                      <a
                        href={ele.link}
                        target="_blank"
                        className="md:text-center overflow-hidden block hover:text-transparent hover:bg-clip-text  hover:bg-gradient-to-br from-blue-200 to-cyan-200 text-gray-800"
                      >
                        <i>{ele.link}</i>
                      </a>
                    </div>

                    {/* for role and salary*/}
                    <div className="md:col-span-1 p-3 font-serif">
                      <p className="text-center ">
                        Role:
                        <br />
                        <span className="shadow-md mt-5">{ele.role}</span>
                      </p>
                      <p className="text-center mt-8 ">
                        Package:
                        <br />
                        <span className="shadow-md mt-1">{ele.salary}</span> /yr
                      </p>
                    </div>
                    {/* for location and skills*/}
                    <div className="md:col-span-1 p-3  font-serif">
                      <p className="text-center ">
                        Location:
                        <br />
                        <span className="shadow-md mt-1">{ele.location}</span>
                      </p>
                      <p className="text-center mt-8 overflow-x-auto ">
                        Skills:
                        <br />
                        <span className="shadow-md mt-1 ">
                          {ele.skillsRequired}
                        </span>
                      </p>
                    </div>
                    {/* to apply*/}
                    <div className="md:col-span-1 p-3  font-serif flex justify-center items-center">
                      <p className="text-center  overflow-hidden ">
                        Mail us:
                        <br />
                        <span className="shadow-md mt-1 ">{ele.email}</span>
                      </p>
                    </div>
                    <div className="md:col-span-1 p-4 ms-10 font-serif flex justify-center items-center">
                      <input
                        type="text"
                        className="hidden"
                        value={ele._id}
                        readOnly
                      />
                      {user.applications.includes(`${ele._id}`) ? (
                        <Button>APPLIED</Button>
                      ) : (
                        <Button
                          className="bg-blue-700"
                          type="submit"
                          onClick={() => handleUpdate(index)}
                        >
                          APPLY
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Search;
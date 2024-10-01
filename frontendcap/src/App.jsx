import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Job from "./Pages/Job";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TrackApplication from "./Pages/TrackApplication";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import Header from "./Components/Header";
import FooterComp from "./Components/FooterComp";
import PrivateRoute from "./Components/PrivateRoute";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute";
import PostJobs from "./Pages/PostJobs";
import PageNotFound from "./Pages/PageNotFound";

export const mycontext = createContext("");
const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  return (
    <>
      <BrowserRouter>
        <div>
          <ToastContainer />
        </div>
        <mycontext.Provider value={[token, setToken, user, setUser]}>
          <Header />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/job" element={<Job />} />
              <Route path="/track" element={<TrackApplication />} />
              <Route path="/search" element={<Search />} />
              
            </Route>
            <Route element={<OnlyAdminPrivateRoute />}>
              <Route path="/post-jobs" element={<PostJobs />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route
              path="/resetpassword/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <FooterComp />
        </mycontext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
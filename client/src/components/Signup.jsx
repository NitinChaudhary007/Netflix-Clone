import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Button from "./Button";
import Header from "./Header";

import netflixBG from "../assets/NetflixBackground.png";
import { API_ENDPOINT } from "../utils/Constant";

export default function Signup() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = { fullname, email, password };

    try {
      const res = await axios.post(`${API_ENDPOINT}/register`, user);

      toast.success(res.data.message);
      navigate("/login");

      console.log(res);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }

    setFullname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="w-[100vw] h-[100vh]" src={netflixBG} />
      </div>

      <div className="flex items-center justify-center w-[100vw] h-[100vh]">
        <form className="p-10 bg-black opacity-80 z-10 rounded-lg text-white">
          <h2 className="text-white font-bold text-3xl p-4">Sign up</h2>

          <div className="flex flex-col items-start">
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="outline-none p-3 my-3 w-96 bg-gray-800 rounded-sm"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="outline-none p-3 my-3 w-96 bg-gray-800 rounded-sm"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="outline-none p-3 my-3 w-96 bg-gray-800  rounded-sm"
            />

            <Button className="w-full" onClick={submitHandler}>
              Submit
            </Button>

            <p className="items-start">
              Already have account ?
              <Link to="/login" className="hover:text-red-700 cursor-pointer">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

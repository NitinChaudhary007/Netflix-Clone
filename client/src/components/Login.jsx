import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "./Header";
import Button from "./Button";

import netflixBG from "../assets/NetflixBackground.png";
import { API_ENDPOINT } from "../utils/Constant.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice.js";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((store) => store.app.isLoading);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const user = { email, password };

      const url = `${API_ENDPOINT}/login`;
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      };
      const res = await fetch(url, options);

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message);
        throw new Error(err.message || "Something went wrong");
      }
      const data = await res.json();

      dispatch(setUser(data.user));
      navigate("/browse");

      toast.success(data.message);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }

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
          <h2 className="text-white font-bold text-3xl p-4">Login</h2>
          <div className="flex flex-col items-start">
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
              {isLoading ? "Loading..." : "Login"}
            </Button>

            <p className="items-start">
              Don't have an account?
              <Link to="/signup" className="hover:text-red-700 cursor-pointer">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

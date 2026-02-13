import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

import Button from "./Button";

import netflixLogo from "../assets/NetflixLogo.png";
import { API_ENDPOINT } from "../utils/Constant";
import { setUser } from "../redux/userSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_ENDPOINT}/logout`);
      toast.success(res.data.message);
      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="absolute flex justify-between items-center w-full z-10 bg-gradient-to-b from-black">
      <img className="w-40" src={netflixLogo} alt="netflixLogo" />

      {user && (
        <div className="flex items-center">
          <h2 className="text-white font-medium">{user.fullname}</h2>
          <div className="ml-10">
            <Link to="/login">
              <Button>LogIn</Button>
            </Link>
            <Button onClick={logoutHandler}>Logout </Button>
          </div>
        </div>
      )}
    </div>
  );
}

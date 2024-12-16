/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

export const BASE_URL=import.meta.env.VITE_BASE_URL

const UserLogin = () => {
  // That's two way binding
  const navigate=useNavigate();
  const {user,setUser}=useContext(UserDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userData, setUserData] = useState({});

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const newUser={
      email: email,
      password: password,
    };
    
    const res=await axios.post(`${BASE_URL}/users/login`,newUser)

    if(res.status===200){
      const data=res.data;
      setUser(data.user);
      localStorage.setItem("token",data.token);
      navigate("/home");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div className="">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png"
          className="w-16 mb-10"
          alt=""
        />

        <form onSubmit={SubmitHandler} className="">
          <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
          <input
            type="email"
            required
            className="bg-white rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
            value={email}
            onChange={(val) => setEmail(val.target.value)}
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            className="bg-white rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold rounded mb-7 px-4 py-2  w-full text-lg ">
            Login
          </button>
          <p className="text-center">
            New here ?{" "}
            <Link to={"/signup"} className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={"/captain-login"} className="bg-[#10b461] flex items-center justify-center mb-5 text-white font-semibold rounded mb-7 px-4 py-2  w-full text-lg ">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;

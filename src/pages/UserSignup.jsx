/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
const BASE_URL=import.meta.env.VITE_BASE_URL
import {UserDataContext} from "../context/UserContext"
const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  // const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const {user,setUser}=useContext(UserDataContext);

  const submitHandler =async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: LastName,
      },
      email: email,
      password: password,
    };
    const res=await axios.post(`${BASE_URL}/users/register`,newUser);
    
    if(res.status===200){
      const data=res.data;
      setUser(data.user)
      localStorage.setItem("token",data.token);
      navigate("/home");
    }
    
    
    setEmail("");
    setFirstName("");
    setLastName("");
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

        <form className="" onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What&apos;s your name</h3>
          <div className="flex flex-row gap-2 mb-5">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white rounded w-1/2  px-4 py-2 border  text-lg placeholder:text-base"
              placeholder="First name"
            />
            <input
              type="text"
              required
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold rounded mb-5 px-4 py-2  w-full text-lg ">
            Create Account
          </button>
          <p className="text-center">
            Already have a account ?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-xs leading-tight text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem quia
          ea architecto vel natus repudiandae, officia vero provident sit
          accusantium?
        </p>
      </div>
    </div>
  );
};

export default UserSignup;

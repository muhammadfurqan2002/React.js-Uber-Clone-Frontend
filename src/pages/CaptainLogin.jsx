import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { BASE_URL } from "./UserLogin";

const CaptainLogin = () => {
  // That's two way binding
  const {  setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [CaptainData, setCaptainData] = useState({});

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      email: email,
      password: password,
    };
    const res = await axios.post(`${BASE_URL}/captains/login`, newCaptain);
    if (res.status === 200) {
      const data = res.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
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
            Join a fleet ?{" "}
            <Link to={"/captain-signup"} className="text-blue-600">
              Register as Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to={"/login"}
          className="bg-[#d5622d] flex items-center justify-center mb-5 text-white font-semibold rounded mb-7 px-4 py-2  w-full text-lg "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;

/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { BASE_URL } from "./UserLogin";

const CaptainSignup = () => {
  const navigate=useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  // Personal Information state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Vehicle Information state variables
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [vehicleType, setVehicleType] = useState("");

  const submitHandler =async (e) => {
    e.preventDefault();

    // Creating a new captain object with both personal and vehicle information
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      }
    };

    const res=await axios.post(`${BASE_URL}/captains/register`,newCaptain)
    
    if(res.status===201){
      const data=res.data;
      setCaptain(data.captain)
      localStorage.setItem("token",data.token);
      navigate("/captain-home")
    }
    // For now, logging the data to the console (you can use setCaptain to save it in context or send to a server)
    console.log(newCaptain);

    // Clear the form after submission
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div className="">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png"
          className="w-16 mb-10"
          alt="Uber logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What&apos;s your name</h3>
          <div className="flex flex-row gap-2 mb-5">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              placeholder="First name"
            />
            <input
              type="text"
              required
              value={lastName}
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="password"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
          <div className="flex flex-row gap-2 mb-5">
            <input
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-white rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              placeholder="Vehicle Color"
            />
            <input
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-white rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              placeholder="Vehicle Plate"
            />
          </div>
          <div className="flex flex-row gap-2 mb-5">
            <input
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-white rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              placeholder="Vehicle Capacity"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-white rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
            >
              <option value="">Select Vehicle Type</option>
              <option value="auto">auto</option>
              <option value="car">car</option>
              <option value="motorcycle">motorcycle</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold rounded mb-5 px-4 py-2 w-full text-lg">
            Sign Up
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to={"/captain-login"} className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div>
        <p className="text-xs leading-tight text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia
          ea architecto vel natus repudiandae, officia vero provident sit
          accusantium?
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

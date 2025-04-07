/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { BASE_URL } from "./UserLogin";

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
    const {setCaptain}=useContext(CaptainDataContext);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(() => {
      if (!token) {
        navigate("/captain-login");
        return;
      }
    
      axios.get(`${BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setCaptain(res.data.captain);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
    }, [token, navigate, setCaptain]);
    
  if(isLoading){
    return <div>Loading...</div>
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;

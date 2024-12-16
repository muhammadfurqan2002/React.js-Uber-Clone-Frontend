import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function  UserLogout() {
  const token = localStorage.getItem("token");
  const navigate=useNavigate();
  axios.get(`${BASE_URL}/users/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res)=>{
    console.log(res.status)
    if(res.status===200){
        localStorage.removeItem("token");
        navigate("/login")
    }
  });
  return <></>;
}

export default UserLogout;

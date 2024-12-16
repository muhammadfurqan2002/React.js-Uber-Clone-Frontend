/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const CaptainDataContext= createContext();

const CaptainContext = ({ children }) => {
    
    const [Captain,setCaptain]=useState({
        email:'',
        fullName:{
            firstName:"",
            lastName:""
        }
    });

  return (
    <div>
      <CaptainDataContext.Provider value={{Captain,setCaptain}}>{children}</CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;

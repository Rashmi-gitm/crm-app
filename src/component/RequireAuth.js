import { useLocation, Outlet, Navigate } from "react-router-dom";
import React from "react";

const RequireAuth = ( {allowedRoles}) => {
    const location = useLocation();

    return (
        //wrap thsi condition with status = logged in
        localStorage.getItem("userTypes") === allowedRoles[0] 
         // placeholder for react component
                     ?   <Outlet/> 
                 : localStorage.getItem("userTypes") 
                 ?
                <Navigate to = "/unauthorized"
                state={{ from: location }} replace />
                  : <Navigate to="/" state={{ from: location }} replace />
        
                
                )
     
}

export default RequireAuth;
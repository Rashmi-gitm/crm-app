import { useLocation, Outlet, Navigate } from "react-router-dom";
import React from "react";


//from app.js we get roles: a comparable value
const RequireAuth = ( {allowedRoles}) => {
    const location = useLocation();

    return (
        //wrap this condition with status = logged in
        //comparing the localstorage value to the roles value
        localStorage.getItem("userTypes") === allowedRoles[0] 
        //ivalue is true 
         // placeholder for react component
                     ?   <Outlet/> 
                     //false : localStorage and role dont match
                 : localStorage.getItem("userTypes") 
                 //customer => admin: check u r in admin then they will be replace by unauthorized
                 ?
                <Navigate to = "/unauthorized"
                state={{ from: location }} replace />
                //usertype is not in localstorage then throw them in home page
                  : <Navigate to="/" state={{ from: location }} replace />
        
                
                )
     
}

export default RequireAuth;

import React, {useState} from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {userSignup, userSignin} from '../api/auth'
import {useNavigate} from 'react-router-dom';

function Login() {
    const [SignUp, setShowSignUp] = useState(false);
    const [userType, setuserType] = useState("CUSTOMER");
    const [userSignupData, setUserSignupData] = useState({});
    const [message, setMessage] = useState("");



    const toggleSignup = () => {
        setShowSignUp(!SignUp)
    }
    const handleSelect = (e) => {
        setuserType(e)
    }

    const updateSignupData = (e) => {
        userSignupData[e.target.id]= e.target.value;
        console.log(userSignupData);
    }

    const signupFn = (e) => {
       const username = userSignupData.username;
       const userId = userSignupData.userId;
       const email = userSignupData.email;
       const password = userSignupData.password;

       const data = {
           name: username, 
           userId: userId, 
           email: email, 
           userType: userType,
           password: password
       }

       console.log('DATA', data);

       e.preventDefault();
       

       userSignup(data)
            .then(function(response){
               if(response.status===201) {
               history(0);
           }
       })
       .catch(function(error){
           if(error.response.status === 400){
            setMessage(error.response.data.message);
           } else {
               console.log(error);
           }
       });

    }
    const history = useNavigate();


    const loginFn = (e) => {
        const userId= userSignupData.userId;
        const password= userSignupData.password;

        const data = {
            userId: userId,
            password: password
        };
        console.log("DATA", data);
        e.preventDefault();


        userSignin(data)
            .then(function(response){
            console.log(response);
            if(response.status === 200){
                // userid, email, userType, userStatus, token
                localStorage.setItem("name", response.data.name);
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("userTypes", response.data.userTypes);
                localStorage.setItem("userStatus", response.data.userStatus);
                localStorage.setItem("token", response.data.token);
            
            // customer, engineer, admin
            if(response.data.userType === "CUSTOMER"){
                history ("/customer");
            }else if (response.data.userTypes === "ENGINEER") {
                history ("/engineer");
            }else {
                history ("/admin");
            }
        }
        }).catch(function(error){
            if(error.response.status === 400){
             setMessage(error.response.data.message);
            } else {
                console.log(error);
            }
         });
   };

  return (
    <div className="bg-primary d-flex justify-content-center align-items-center vh-100">
        <div className="card m-5 p-5">
            <div className="row">
                <div className="col">
                    {
                        !SignUp ? (
                            <div className="login">
                                <form onSubmit={loginFn}>
                                    <h4 className= "text-center p-3"> LogIn</h4>
                                        <input 
                                        className= "input-group m-2 form-control"
                                        type="text" placeholder='Enter your userId' id="userId"
                                        onChange={updateSignupData} />
                                    

                                    <input 
                                        className= "input-group m-2 form-control"
                                        type="password" placeholder='Enter your Password' id="password"
                                        onChange={updateSignupData} />
                                       
                                    <button className= "btn btn-success m-2 d-flex justify-content-center align-items-center">
                                        LogIn
                                    </button>
                                  
  
                                    <div className="text-info text-center" 
                                    onClick={toggleSignup}>Don't have an account? Signup</div>
                                    <div className="text-danger text-center">{message}</div>
                                </form>
                            </div>
                        ) : 
                        (
                          <div className="signup">
                               
                                 <form onSubmit={signupFn}>
                                 <h4 className="text-center p-3">SignUp</h4>

                                    <input 
                                    className= "input-group m-2 form-control"
                                    type="text"  placeholder='Enter your Name' id="username" onChange={updateSignupData} />

                                    <input 
                                    className= "input-group m-2 form-control"
                                    type="text"  placeholder='Enter your userId' id="userId" onChange={updateSignupData} />

                                    <input 
                                    className= "input-group m-2 form-control"
                                    type="email"  placeholder='Enter your Email' id="email" onChange={updateSignupData} />

                                    <input 
                                    className= "input-group m-2 form-control"
                                    type="password"  placeholder='Enter your Password' id="password" onChange={updateSignupData} />
                                   
                                    
                                 <div className="input-group m-1">
                                       <span className='text-muted'>User Type</span>
                                        <DropdownButton 
                                        align="end"
                                        title={userType}
                                        variant="light"
                                        className="mx-1"
                                        onSelect={handleSelect} >
                                            <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                            <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                        </DropdownButton>

                                    </div>


                                    <div className="input-group m-1">
                                        <input type="submit" className='form-control btn btn-primary' value= "Sign Up" />
                                    </div>
                                    <div className="text-info text-center" onClick={toggleSignup}>Already have an account? Login</div>
                                    <div className="text-danger">{message}</div>
                                </form>
                            
                          </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;
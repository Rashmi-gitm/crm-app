

import { Dropdown, DropdownButton } from 'react-bootstrap';
import React, {useState} from 'react'
import {userSignin, userSignup} from '../api/auth';

function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [userType, setuserType] = useState("CUSTOMER");
    const [userSignupData, setUserSignupData] = useState({});
    const [message, setMessage] =useState('');

const toggleSignup = () => {
    setShowSignup(!showSignup)
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

 console.log ('DATA', data);

e.preventDefault();

userSignup(data).then(function(response){
  if(response.status===201){
    window.location.href = '/'

  }
})
.catch(function(error){
  if(error.response.status === 400){
    setMessage( error.response.data.message);
  }else {
    console.log(error);
  }
})

}


const loginFn=(e) => {
  const userId= document.getElementById("userId").value;
  const password = document.getElementById("passowrd").value;

  const data = {
    userId: userId,
    password: password
  }

userSignin(data).then(function(response){
  console.log(response);
  if(response.status === 200){
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("userId", response.data.userId);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("userTypes", response.data.userTypes);
    localStorage.setItem("userStatus", response.data.userStatus);
    localStorage.setItem("token", response.data.accessToken);
  }

  if(response.data.userType === "CUSTOMER"){
    window.location.href = "/customer";
  } else if (response.data.userTypes === "ENGINEER"){
    window.location.href = "/engineer";
  } else{
    window.location.href ="/admin";
  }
}).catch(function(error){
  if(error.response.status === 400){
    setMessage( error.response.data.message);
  }else {
    console.log(error);
  }
})

}

  return (
   <div className="bg-secondary d-flex justify-content-center align-items-center vh-100">
   <div className="card m-5 p-5">
    <div className="row">
      <div className ="col">
        {
          !showSignup ? (
            
            <div className="login">
            <form onSubmit={loginFn}>
            <h4 className='text-center p-3'>Login</h4>
            <div className="input-group m-2">
              <input type="text"  id="userId" placeholder="Enter Your UserId" className='form-control' />

            </div>
            <div className="input-group m-2">
              <input type="password"  id="password" placeholder="Enter Password" className='form-control' />

            </div>
            <div className='input-group'>
              <button  className="btn btn-primary m-2 d-flex justify-content-center align-items-center form-control">LogIn</button>
            </div>
            <div className='text-center text-info' onClick={() => toggleSignup() }>Not a Member? Signup </div>
            {/* user id, passowrd, login button, toggle text */}

            </form>
            </div>
            
          ) :
          ( <form onSubmit = {signupFn}>
            <div className='signup'>
                        <h4 className='text-center p-3 '>Signup
                        </h4>
                        <div className='input-group m-2'>
                            <input type="text"  id="userId" placeholder='UserId' className='form-control' onChange={updateSignupData} />
                        </div>
                        <div className='input-group m-2'>
                            <input type="text"  id="username" placeholder='Enter Your Username' className='form-control' onChange={updateSignupData} />
                        </div>
                             <div className='input-group m-2'>                  
                            <input type="email"  id="email" placeholder='Enter Your e-mail' className='form-control'  onChange={updateSignupData}/>
                            </div> 
                            <div className='input-group m-2'>
                            <input type="password"  id="password" placeholder='Enter Your Password' className='form-control' onChange={updateSignupData} />
                        </div>
                        <div className="input-group m-2 form-control">
                          <span className='text-muted'>User Type</span>
                          <DropdownButton 
                          align="end"
                          title={userType}
                          variant="light"
                          className="mx-2"
                          onSelect ={handleSelect}>
                            <Dropdown.Item eventkey="CUSTOMER">CUSTOMER</Dropdown.Item>
                            <Dropdown.Item eventkey="ENGINEER">ENGINEER</Dropdown.Item>
                          </DropdownButton>
                        </div>
                        <button className="btn btn-primary m-2 d-flex justify-content-center align-items-center">
                    Signup
                  </button>
                        
                        <div className='text-center text-info' onClick={() => toggleSignup()}>Already a member? LogIn</div>
                           
                </div>
                <div className="text-danger text-center">{message}</div>
                </form>
          )
        }
      </div>
    </div>
    </div>


</div>
  )
}

export default Login;

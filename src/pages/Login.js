

import { Dropdown, DropdownButton } from 'react-bootstrap';
import React, {useState} from 'react'

function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [userType, setUSerType] = useState("CUSTOMER");

const toggleSignup = () => {
    setShowSignup(!showSignup)
}
const handleSelect = (e) => {
  setUSerType(e)
}

  return (
   <div className="bg-secondary d-flex justify-content-center align-items-center vh-100">
   <div className="card m-5 p-5">
    <div className="row">
      <div className ="col">
        {
          !showSignup ? (
            
            <div className="login">
            <form>
            <h4 className='text-center p-3'>Login</h4>
            <div className="input-group m-2">
              <input type="text"  id="username" placeholder="Enter Your UserId" className='form-control' />

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
          ( <form>
            <div className='signup'>
                        <h4 className='text-center p-3 '>Signup
                        </h4>
                        <div className='input-group m-2'>
                            <input type="text"  id="username" placeholder='Enter Your Name' className='form-control' />
                        </div>
                        <div className='input-group m-2'>
                            <input type="text"  id="username" placeholder='Enter Your UserId' className='form-control' />
                        </div>
                             <div className='input-group m-2'>                  
                            <input type="email"  id="email" placeholder='Enter Your e-mail' className='form-control' />
                            </div> 
                            <div className='input-group m-2'>
                            <input type="password"  id="password" placeholder='Enter Your Password' className='form-control' />
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

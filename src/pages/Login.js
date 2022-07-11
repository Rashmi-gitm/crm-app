
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import React, {useState} from 'react'

function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [userType, setUSerType] = useState("CUSTOMER");

const toggleSignup = () => {
    setShowSignup(!showSignup)
}
const handleSelect = (e) => {
  setUSerType(e);
}

  return (
   <div className="bg-secondary d-flex justify-content-center align-items-center vh-100">
   <div className="card m-5 p-5">
    <div className="row">
      <div className ="col">
        {
          !showSignup ? (
            
            <div className="login-wrapper">
            <form>
            <h4 className='text-center'>Login</h4>
            <div className="input-group">
              <input type="text"  id="username" placeholder="User Id" className='form-control' />

            </div>
            <div className="input-group">
              <input type="password"  id="password" placeholder="Password" className='form-control' />

            </div>
            <div className='input-group'>
              <Link to ="/home" className="btn btn-primary form-control">Log in as user</Link>
            </div>
            <div className='text-center text-info' onClick={toggleSignup}>Don't have an account? Signup </div>
            {/* user id, passowrd, login button, toggle text */}

            </form>
            </div>
            
          ) :
          ( <form>
            <div className='login-wrapper'>
                        <h4 className='text-center'>Signup
                        </h4>
                        <div className='input-group'>
                            <input type="text"  id="username" placeholder='User Id' className='form-control' />
                        </div>
                        <div className='input-group'>
                            <input type="text"  id="username" placeholder='Username' className='form-control' />
                        </div>
                                                
                            <input type="email"  id="email" placeholder='E-mail' className='form-control my-1' />
                            <div className='input-group'>
                            <input type="password"  id="password" placeholder='Password' className='form-control' />
                        </div>
                        <div className="input-group m-1">
                          <span className='text-muted'>User Type</span>
                          <DropdownButton 
                          align="end"
                          title={userType}
                          variant="light"
                          className="mx-1"
                          onSelect ={handleSelect}>
                            <Dropdown.Item eventkey="CUSTOMER">Customer</Dropdown.Item>
                            <Dropdown.Item eventkey="ENGINEER">Engineer</Dropdown.Item>
                          </DropdownButton>
                        </div>
                        <div className='input-group'>
                            <input type="submit" value="SignUp in as User" className='btn btn-primary form-control'/>

                        </div>
                        <div className='text-center text-info' onClick={toggleSignup}>Already have an account? LogIn</div>
                        
                </div>
                </form>
          )
        }
      </div>
    </div>
   </div>

    <h3>Hello</h3>
   </div>
  )
}

export default Login

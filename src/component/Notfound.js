import React from 'react';
import { useNavigate } from 'react-router-dom';
import Not from '../assets/404s.svg';

function NotFound() {

const history = useNavigate();

function goBack() {
   history(-1);
}



  return(
    <div className="d-flex justify-content-center align-items-center vh-100 text-center">
      <div>
        <h3>Hmm.. this doesn't seem right.</h3>
        <p>You do have access to the requested page. </p>
        <img src={Not} alt= "404" />

        <div>
        <button onCLick={goBack} className='btn btn-primary'>Go Back</button>
        </div>
        
      </div>
    </div>
  )
}

export default NotFound
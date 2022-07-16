import axios from 'axios';

//accesing the base url using process and storing it
const BASE_URL = process.env.REACT_APP_SERVER_URL;


//a functin that will take user data from the ui and send to bacened api
export async function userSignup(data) {
    //hitting the api and sending data using post
    console.log(BASE_URL);
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}



export async function userSignin(data) {
      //hitting the api and sending data using post
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}
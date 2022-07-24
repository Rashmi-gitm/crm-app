//first what we need to fecth api
//axios library
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

//for ticket url: crm/api/v1/tickets
//tp fetch this api we need authorisation means having details in local storage
//Authorization: {we need token} x-access-token : token, userId
//because there is delay in api then ui will not rendered anything then it will show error..for this we use async await


// post api : allow the user to create a ticket 
// url : crm/api/v1/tickets 
// Authorization : x-access-token : token 


// put api : allow the engineer,user to edit the ticket
// url : crm/api/v1/tickets/${id}
// Authorization : x-access-token : token , userId: userid


export async function fetchTicket (data) {
    return await axios.get(`${BASE_URL}/crm/api/v1/tickets`,
    {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    },
    {
        "userId" : localStorage.getItem('userId')
    }
    )
}

/*
POST API : create  a ticket 
method : post 
url :  /crm/api/v1/tickets/
headers : token 
*/

export async function ticketCreation(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/tickets/`, data, {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    }) 
}





export async function ticketUpdation(id, selectedCurrTicket) {
    return await axios.put(`${BASE_URL}/crm/api/v1/tickets/${id}`, selectedCurrTicket, {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    },{
        "userId":localStorage.getItem("userId")
    })
}

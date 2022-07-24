import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Sidebar from "../component/Sidebar";
import { Modal, Button } from "react-bootstrap";
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { fetchTicket, ticketUpdation } from "../api/tickets"

import "../styles/admin.css"
import { getAllUsers } from "../api/user";

//admin is decided by the backend
//showing some representational data
//graphs as well to  show some statical data
//access to veiwing all the users
// admin can look at engineer also and they can change the status as approve/decline/assign

//admin had also access to veiw all the tickets
//admin can also edit some details


function Admin() {

    const [userModal, setUserModal] = useState(false);
    const [ticketList, setTicketList]= useState([]);
    const [userDetails, setUserDetails] = useState([]);  
    // old values
    const [ticketDetails, setTicketDetails] = useState({});
    //new updated values
    const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
    const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
    //{new obje} new values user
    //first update with selectedCurrTicket ==> grab the specific row==> CURRENT VALUES
    //second update: replacing old values with new data ==> NEW VALUE THAT YOU ENTER IN MODAL
    const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data)

    const onCloseTicketModal = ()=> {
        setTicketUpdateModal(false)
    }
   
   
    const showUserModal = () => {
        setUserModal(true);
    }

    const closeUserModal = () =>{
        setUserModal(false)
    }
  
    useEffect(()=> {
        (async () => {
            fetchTickets()
            fetchUsers()
        }) ()
    }, [])

//user logic
    const fetchUsers = (userId) => {
        getAllUsers(userId).then(function(response) {
            if(response.status === 200) {
                if(userId){
                    setUserDetails(response.data)
                } else {
                    setUserDetails(response.data);
                }
                              
            }
        }).catch((error) => {
            console.log(error);
        } )
    }


//ticket section logic
    const fetchTickets =() => {
        fetchTicket().then(function(response) {
            if(response.status === 200) {
                console.log(response);
                setTicketList(response.data);
            }
        }).catch((error) => { 
            console.log(error);
        } )
    }

//read the existing values
const editTicket=(ticketDetail) => {
         
    //this object is the updated data
        const ticket = {
            assignee:       ticketDetail.assignee,
            description:    ticketDetail.description,
            id:             ticketDetail.id,
            reporter:       ticketDetail.reporter,
            status:         ticketDetail.status,
            ticketPriority: ticketDetail.ticketPriority,
            title:          ticketDetail.title
        }
        console.log(ticket);
        //storing the existing values that we grabbed in a state
        setSelectedCurrTicket(ticket);
        //open a modal
        setTicketUpdateModal(true);


        }

        console.log("hdkc", selectedCurrTicket);

//read the updated value from the user
    const onTicketUpdate=(e) => {
            if(e.target.name == "title"){
                selectedCurrTicket.title = e.target.value;
            }
            //else if (e.target.name == "description"){
               // selectedCurrTicket.description = e.target.value;
            //}
  //we will create new object with new values ==> object.assign
  //target, source target: new values, source: destination where you want to update value
updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket))
        }

//call the api
const updateTicket= (e) => {
    e.preventDefault();
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket)
      .then(function(response) {
        console.log("Ticket Updated Successfully");
        onCloseTicketModal();
     })
     .catch(function(error) {
        console.log(error);
    })
}

    return (
<div className="bg-light min-vh-100">
<div className="row">
    <div className="col-1">
        <Sidebar/>
        </div>
        <div className="container col m-1">
    <h3 className="text-success text-center"> Welcome Admin</h3>
        <p className="text-dark text-center">Take a quick look at your Stats below..</p>
 
    {/* STATS CARDS START HERE */}

   {/* 1st card */}
   <div className="row my-5 mx-2 text-center"> 
  <div className="col-xs-12 col-lg-3 col-md-6 my-1">
    
        <div className="card cardItem shadow bg-primary text-dark bg-opacity-25 borders-b" style={{width: 12 + 'rem'}}>
            <div className="card-body ">
                <h5 className="card-subtitle mb-2"><i className="bi bi-pencil text-primary mx-2"> </i>Progress</h5>
                <hr/>
                <div className="row">
                    <div className="col"><h1 className="col text-dark mx-4">8</h1></div>
                    <div className="col">
                        <div style={{height: 40, width: 40}}>
                        <CircularProgressbar value={80} 
                   styles={buildStyles ({
                        textColor: "red",
                        pathColor: "darkblue",
                        
                    })} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    {/*2nd Cards */}

    <div className="col-xs-12 col-lg-3 col-md-6 my-1">
    
        <div className="card shadow bg-warning text-dark bg-opacity-25 borders-y" style={{width: 12 + 'rem'}}>
            <div className="card-body ">
                <h5 className="card-subtitle mb-2"><i className="bi bi-lightning-charge text-warning mx-2"> </i>Progress</h5>
                <hr/>
                <div className="row">
                    <div className="col"><h1 className="col text-dark mx-4">7</h1></div>
                    <div className="col">
                        <div style={{height: 40, width: 40}}>
                        <CircularProgressbar value={60} 
                   styles={buildStyles ({
                        textColor: "red",
                        pathColor: "darkgoldenrod",
                        
                    })} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

   {/* 3rd Card */}

   <div className="col-xs-12 col-lg-3 col-md-6 my-1">
    
        <div className="card shadow bg-success text-dark bg-opacity-25 borders-g" style={{width: 12 + 'rem'}}>
            <div className="card-body ">
                <h5 className="card-subtitle mb-2"><i className="bi bi-check2-circle text-success mx-2"> </i>Closed</h5>
                <hr/>
                <div className="row">
                    <div className="col"><h1 className="col text-dark mx-4">4</h1></div>
                    <div className="col">
                        <div style={{height: 40, width: 40}}>
                        <CircularProgressbar value={50} 
                   styles={buildStyles ({
                        textColor: "red",
                        pathColor: "darkolivegreen",
                        
                    })} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* 4th Card */}

    <div className="col-xs-12 col-lg-3 col-md-6 my-1">

        <div className="card shadow bg-secondary text-dark bg-opacity-25 borders-grey" style={{width: 12 + 'rem'}}>
            <div className="card-body ">
                <h5 className="card-subtitle mb-2"><i className="bi bi-slash-circle text-secondary mx-2"> </i>Blocked</h5>
                <hr/>
                <div className="row">
                    <div className="col"><h1 className="col text-dark mx-4">2</h1></div>
                    <div className="col">
                        <div style={{height: 40, width: 40}}>
                        <CircularProgressbar value={30} 
                   styles={buildStyles ({
                        textColor: "red",
                        pathColor: "black",
                        
                    })} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <hr/>
    <div className="container">

<MaterialTable 

    onRowClick={(event, ticketDetail)=> editTicket(ticketDetail)}
    
        data ={ticketList}

            columns={[
                 {
                     title: "Ticket ID",
                     field: "id"
                 },
                 {
                     title: "Title",
                     field: "title"

                 },
                 {
                     title: "Description",
                     field: "description"
                     
                 },
                 {
                     title: "Reporter",
                     field: "reporter"
                 },
                 {
                     title: "Priority",
                     field: "ticketPriority"
                 },
                 {
                     title: "Assignee",
                     field: "assignee"
                 },
       {
           title: 'Status',
           field: "status",
           lookup: {
               "OPEN" : "OPEN",
               "IN-PROGRESS" : "IN-PROGRESS",
               "BLOCKED" : "BLOCKED",
               "CLOSED" : "CLOSED"
           }
       }
    ]} 

   options={{
           exportMenu: [{
               label: 'Export Pdf',
               exportFunc: (cols, datas) => ExportPdf(cols, datas,
               'Ticket Records')
           },
           {
           label: 'Export Csv',
               exportFunc: (cols, datas) => ExportCsv(cols, datas,
               'Ticket Records')
               },
           ],

       headerStyle: {
           backgroundColor: 'green',
           color: "#fff"

       },
       rowStyle: {
           backgroundColor: "#EEE"
       }
   }}
  
   title="TICKET RECORDS"
/>

{ticketUpdateModal ? (
    <Modal 
            show={ticketUpdateModal}
            onHide={onCloseTicketModal}
            backdrop="static"
            centered  >
            <Modal.Header closeButton>
            <Modal.Title>Updated Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={updateTicket}>
                    <div className="p-1">
                        <h5 className="text-primary">Ticket ID :{selectedCurrTicket.id} </h5>
                        <div className="input-group">
                         <label className="label input-group-text"> Title 
                            
                        </label>
                        <input type="text" className="form-control" name="title" value= {selectedCurrTicket.title} onChange={onTicketUpdate}/>
                     </div>
                     <Button type="submit" className="my-1">Update</Button>
                    </div>
                </form>
            </Modal.Body>

            </Modal>
) : ("")}
</div>

<div className="container">

         <MaterialTable 
         onRowClick={(rowData, userId) => fetchUsers(rowData, userId)}
            columns={[
                {
                              title: "User ID",
                              field: "userId",
                          },
                          {
                              title: "Name",
                              field: "name",
  
                          },
                          {
                              title: "Email",
                              field: "email",
                          },
                          {
                              title: "User Type",
                              field: "userTypes ",
                              lookup: {
                                    "CUSTOMER" : "CUSTOMER",
                                    "ENGINEER" : "ENGINEER",
                                    "ADMIN" : "ADMIN"
                                }
                          },
                         {
                    title: 'Status',
                    field: "userStatus",
                    lookup: {
                        APPROVED: "APPROVED",
                        PENDING : "PENDING",
                        REJECTED : "REJECTED"
                    }
                    
                }
 ]} 

            options={{
                    exportMenu: [{
                        label: 'Export Pdf',
                        exportFunc: (cols, datas) => ExportPdf(cols, datas,
                        'Ticket Records')
                    },
                    {
                    label: 'Export Csv',
                        exportFunc: (cols, datas) => ExportCsv(cols, datas,
                        'Ticket Records')
                        },
                    ],

                headerStyle: {
                    backgroundColor: 'green',
                    color: "#fff"

                },
                rowStyle: {
                    backgroundColor: "#eee"
                }
            }}
            data ={userDetails}
            title="USER RECORDS"
     />
     </div> 

     <hr />

     <button className="btn btn-success" onClick={showUserModal}>
   Open Modal</button>

           
    </div>
    </div>
  </div>
</div>   
    )
}

export default Admin;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  React, { Suspense } from 'react';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Customer from './pages/Customer';
import Engineer from './pages/Engineer';
import RequireAuth from './component/RequireAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import NotFound from './component/NotFound';


const ROLES = {
  'CUSTOMER' : 'CUSTOMER',
  'ENGINEER' : 'ENGINEER',
  'ADMIN' : 'ADMIN'
}

function App() {
  return (
  <Router>
    <Routes>
      <Route exact path ="/" element={
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      } 
      />


     <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]}/>}>
      <Route path ='/admin' exact element = {<Admin/>}/>
     </Route>

     
     <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]}/>}>
      <Route path ='/customer' exact element = {<Customer/>}/>
     </Route>



     <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]}/>}>
      <Route path ='/engineer' exact element = {<Engineer/>}/>
     </Route>



<Route path="/*" element={<NotFound/>} />


    </Routes> 
  </Router>
  );
}

export default App;

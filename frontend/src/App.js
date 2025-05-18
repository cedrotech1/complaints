import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/customer/home';
import Claim from './pages/customer/claim';
import MyClaim from './pages/customer/myclaim';
import MyOneClaim from './pages/customer/myoneclaim';

import AgencyHome from './pages/agency/home';
import AdminOneclaim from './pages/agency/myoneclaim';
import AdminClaim from './pages/agency/myclaim';
import AdminEmployee from './pages/admin/register';
import AdminEmployeeList from './pages/admin/employees';
import AdminHome from './pages/admin/home';


import HomeLanding from './pages/landing/home';
import Login from './pages/landing/login';
import Register from './pages/landing/register';
import Logout from './pages/landing/logout';
import AddAgency from './pages/admin/addagency';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* landing page */}
     
        <Route path="/Register" element={<Register />} exact={true} />
        <Route path="/Login" element={<Login />} exact={true} />
        <Route path="/" element={<HomeLanding />} />
        <Route path="/logout" element={<Logout />} exact={true} />

        {/* customer pages */}
   
        <Route path="/customer" element={<Home/>} />
        <Route path="/claim" element={<Claim />} exact={true} />
        <Route path="/myclaim" element={<MyClaim />} exact={true} />
        <Route path="/one/:id" element={<MyOneClaim />} exact={true} />

           {/* Admin pages */}
           <Route path="/agency_Home" element={<AgencyHome/>} />
         <Route path="/admin_Home" element={<AdminHome/>} />
         <Route path="/admin_Employee" element={<AdminEmployee/>} />
        <Route path="/admin_claim" element={<AdminClaim />} exact={true} />
        <Route path="/admin_one/:id" element={<AdminOneclaim />} exact={true} />
        <Route path="/admin_Employee_List" element={<AdminEmployeeList/>} />
        <Route path="/admin_addagency" element={<AddAgency/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

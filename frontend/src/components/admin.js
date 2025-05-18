import React, { useEffect, useState } from 'react';

function App() {

  // useEffect(() => {
  //   const fetchclaims = async () => {
  //       const token = localStorage.getItem('token'); 
  //   };

  //   fetchclaims();
  // }, []);
  // console.log(token)
    return (
      <>
<header id="header" class="fixed-top d-flex align-items-center">
<div class="container d-flex justify-content-between align-items-center">

  <div class="logo">
    <h1><a href="/admin_Home">Complaint </a></h1>
    {/* <!-- Uncomment below if you prefer to use an image logo --> */}
    <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"/></a>
  </div>

  <nav id="navbar" class="navbar">
    <ul>
      <li><a class="active " href="admin_Home">Home</a></li>
      <li><a href="/admin_addagency">manage agency</a></li>
  
      <li><a href="/admin_Employee">manage users</a></li>
      <li><a href="/logout">logout</a></li>
  
   
    </ul>
    <i class="bi bi-list mobile-nav-toggle"></i>
  </nav>

</div>
</header>
  
  
      </>
    );
  }
  
  export default App;
  
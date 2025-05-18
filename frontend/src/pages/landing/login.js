// import './App.css';
import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading'; 

import 'react-toastify/dist/ReactToastify.css'
function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        const role = res.user.role;
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (role === 'customer') {
          await navigate('../customer');
        } else if (role === 'superadmin') {
          await navigate('../admin_Home');
        } 
        else if (role === 'employee') {
          await navigate('../agency_Home');
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error creating account', error);
      toast.error('Failed to create account. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>

      <section class="hero-section" style={{ height: '100vh' }}>



        <div class="container" style={{ height: '100vh' }}>
          <div class="row align-items-center">
            <div class="col-12 hero-text-image">
              <div class="row">
                <div class="col-lg-7 text-center text-lg-start">
                  <h1 data-aos="fade-right">SIGN IN HERE</h1>

                  <form onSubmit={handleSubmit}  class="php-email-form">

                    <div class="row">
                      <div class="col-md-12 form-group">
                        <label for="name">Name</label>
                        <input type="email" name="email" class="form-control" id="name" required  onChange={handleChange}/>
                      </div>
                    

                      <div class="col-md-12 form-group" style={{marginTop:'0.5cm',marginBottom:'0.5cm'}}>
                        <label for="name">Password</label>
                        <input type="password" name="password" class="form-control" id="name" required onChange={handleChange} />
                      </div>
                     
                    
                    
                      
                      <div class="col-md-12 mb-3">
                        <div class="loading">Loading</div>
                        <div class="error-message"></div>
                        <div class="sent-message">Your message has been sent. Thank you!</div>
                      </div>

                      <div class="col-md-6 form-group">
                      <button type="submit" style={{color:'white'}} className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? <LoadingSpinner /> : 'login'}
            </button>
                      </div>
                      <div class="col-md-6 form-group">
                      <a href="register" >  <input type="button" class="btn btn-info d-block w-100" value="Back to register" /></a>
                      </div>
                    </div>

                  </form>

                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-4 iphone-wrap p-10">
                  <img src="assets/img/lg1.png" alt="Image" class="phone-1" data-aos="fade-right" style={{ width: '100%',marginTop:'5cm',borderBottomLeftRadius:'150px'}} />
                  {/* <img src="assets/img/phone_2.png" alt="Image" class="phone-2" data-aos="fade-right" data-aos-delay="200"/> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      {/* <!-- End Hero --> */}
      <ToastContainer />




    </>
  );
}

export default App;

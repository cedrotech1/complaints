import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading'; 

import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',

    nid: '',
    email: '',
    password: '',
    comfirmpassword: '',
    businessDescription: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'customer',
          status: 'active',
        }),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        // Redirect to login page after successful signup
        // Example: history.push('/login');
        // await navigate('login');
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
      <section className="hero-section" style={{ height: '100vh' }}>
        <div className="container" style={{ height: '100vh' }}>
          <div className="row align-items-center">
            <div className="col-12 hero-text-image">
              <div className="row">
                <div className="col-lg-7 text-center text-lg-start">
                  <h1 data-aos="fade-right">SIGN UP HERE</h1>
                  <form onSubmit={handleSubmit} className="php-email-form">
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name="firstname" className="form-control" id="firstname" onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name="lastname" className="form-control" id="lastname" onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="phone">Telephone number</label>
                        <input type="text" name="phone" className="form-control" id="phone" onChange={handleChange} required />
                      </div>
                     
                      <div className="col-md-6 form-group">
                        <label htmlFor="nid">National Identification number (NID)</label>
                        <input type="text" name="nid" className="form-control" id="nid" onChange={handleChange} required  maxLength={16} minLength={16}/>
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-control" id="email" onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="comfirmpassword" className="form-control" id="confirmPassword" onChange={handleChange} required />
                      </div>
                     
                    </div>
                    <br />
                    <div className='row'>
                      <div className="col-md-6 form-group">
                        {/* <input type="submit" className="btn btn-primary d-block w-100" value="Register" /> */}

                        <button type="submit" style={{color:'white'}} className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Create account'}
            </button>

                      </div>
                      <div className="col-md-6 form-group">
                        <a href="login">
                          <input type="button" className="btn btn-info d-block w-100" value="Back to login" />
                        </a>
                      </div>
                    </div>

                  </form>

                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-4 iphone-wrap p-10">
                  <img src="assets/img/lg1.png" alt="Image" class="phone-1" data-aos="fade-right" style={{ width: '100%', marginTop: '8cm' }} />
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
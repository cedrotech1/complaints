import Menu from '../../components/menu';
import Footer from '../../components/footer';
import Hero from '../../components/samplehero';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  const [agencies, setAgencies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    agencyId: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/agencies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAgencies(data);
      } else {
        toast.error('Failed to fetch agencies');
      }
    } catch (error) {
      console.error('Error fetching agencies:', error);
      toast.error('Failed to fetch agencies');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        console.log(formData)
      }
    } catch (error) {
      console.error('Error creating claim', error);
      toast.error('Failed to create claim. Please try again later.');
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
   <Menu/>
   <Hero title='claim' discription='make your claim and make check updates to every time to view claim updates !'/>

    <section className="section">
      <div className="container">
        <div className="row mb-5 align-items-end">
          <div className="col-md-6" data-aos="fade-up">
            <h2>make your claim</h2>
            <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus incidunt ut officiis explicabo inventore.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5 ms-auto order-2" data-aos="fade-up">
            <div className="col-lg-12 iphone-wrap">
              <img src="assets/img/lg1.png" alt="Image" className="phone-1" data-aos="fade-right" style={{width:'100%',borderRadius:'130px'}}/>
            </div>
          </div>

          <div className="col-md-6 mb-5 mb-md-0" data-aos="fade-up">
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                <div className="col-md-12 form-group mt-3">
                  <label htmlFor="agency">Select Agency</label>
                  <select 
                    className="form-control" 
                    name="agencyId" 
                    required 
                    onChange={handleChange}
                    value={formData.agencyId}
                  >
                    <option value="">Select an agency</option>
                    {agencies.map((agency) => (
                      <option key={agency.id} value={agency.id}>
                        {agency.name} - {agency.contactEmail}
                      </option>
                    ))}
                  </select>
                </div>
         
                <div className="col-md-12 form-group mt-3">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" name="title" id="subject" required onChange={handleChange}/>
                </div>
                <div className="col-md-12 form-group mt-3">
                  <label htmlFor="description">Message</label>
                  <textarea className="form-control" name="description" required onChange={handleChange}></textarea>
                </div> 

                <div className="col-md-6 form-group">
                  <br/>
                  <button type="submit" style={{color:'white'}} className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} disabled={loading}>
                    {loading ? <LoadingSpinner /> : 'Make claim'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    <ToastContainer />
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Menu from '../../components/admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading';
import Hero from '../../components/samplehero';

const AgencyManagement = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
  });

  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error fetching agencies:', error);
      toast.error('Failed to fetch agencies');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/agencies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success('Agency created successfully');
        setFormData({
          name: '',
          location: '',
          contactEmail: '',
          contactPhone: '',
        });
        fetchAgencies(); // Refresh the list
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error creating agency', error);
      toast.error('Failed to create agency. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDelete = async (agencyId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this agency?");
      if (!isConfirmed) {
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/agencies/${agencyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Agency deleted successfully');
        fetchAgencies(); // Refresh the list
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error deleting agency:', error);
      toast.error('Failed to delete agency');
    }
  };

  const filteredAgencies = agencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.contactPhone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Menu />
      <Hero title="Agency Management" discription="Add and manage agencies in the system" />
      
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12" style={{border:'1px solid skyblue',borderRadius:'10px'}}>
             
              <div className="step">
                <h3>Add Agency</h3>
                <form onSubmit={handleSubmit} className="php-email-form mb-5">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="name">Agency Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        value={formData.name}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="location">Location</label>
                      <input 
                        type="text" 
                        name="location" 
                        className="form-control" 
                        value={formData.location}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="contactPhone">Contact Phone</label>
                      <input 
                        type="text" 
                        name="contactPhone" 
                        className="form-control" 
                        value={formData.contactPhone}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="contactEmail">Contact Email</label>
                      <input 
                        type="email" 
                        name="contactEmail" 
                        className="form-control" 
                        value={formData.contactEmail}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6 form-group">
                      <button 
                        type="submit" 
                        style={{ color: 'white' }} 
                        className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} 
                        disabled={loading}
                      >
                        {loading ? <LoadingSpinner /> : 'Add Agency'}
                      </button>
                    </div>
                  </div>
                </form>

                <div className="table-section">
                    <h3>Agency List</h3>
                  <center>
                    <p>
                      <input 
                        type='text' 
                        className='search' 
                        placeholder='SEARCH AGENCY' 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </p>
                  </center>
                  <br/>
                  
                  <div className="table-responsive">
                    <table className='table'>
                      <thead>
                        <tr className='htr'>
                          <td>Name</td>
                          <td>Location</td>
                          <td>Email</td>
                          <td>Phone</td>
                          <td>Actions</td>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              <LoadingSpinner />
                            </td>
                          </tr>
                        ) : (
                          filteredAgencies.map((agency) => (
                            <tr key={agency.id}>
                              <td>{agency.name}</td>
                              <td>{agency.location}</td>
                              <td>{agency.contactEmail}</td>
                              <td>{agency.contactPhone}</td>
                              <td>
                                <button className='btncancil' onClick={() => handleDelete(agency.id)}>
                                  delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default AgencyManagement;

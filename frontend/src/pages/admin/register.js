import React, { useState, useEffect } from 'react';
import Menu from '../../components/admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading';
import Hero from '../../components/samplehero';

const AddEmployee = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    agencyId: ''
  });

  const [agencies, setAgencies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAgencies();
    fetchEmployees();
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
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setEmployees(data.users);
      } else {
        console.error('Failed to fetch employees:', data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/add`, {
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
        setFormData({
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          agencyId: ''
        });
        fetchEmployees();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      toast.error('Failed to create employee. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDelete = async (userId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
      if (!isConfirmed) {
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        fetchEmployees();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Failed to delete employee');
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Menu />
      <Hero title="Employee Management" discription="Add and manage employees in the system" />
      
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12" style={{border:'1px solid skyblue',borderRadius:'10px'}}>
              <div className="step">
                <h3 className='mt-5'>Add Employee</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="firstname">First Name</label>
                      <input 
                        type="text" 
                        name="firstname" 
                        className="form-control" 
                        value={formData.firstname}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="lastname">Last Name</label>
                      <input 
                        type="text" 
                        name="lastname" 
                        className="form-control" 
                        value={formData.lastname}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="text" 
                        name="phone" 
                        className="form-control" 
                        value={formData.phone}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                   
                    <div className="col-md-6 form-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        value={formData.email}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                 
                    <div className="col-md-6 form-group">
                      <label htmlFor="agencyId">Agency</label>
                      <select
                        name="agencyId"
                        className="form-control"
                        value={formData.agencyId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Agency</option>
                        {agencies.map((agency) => (
                          <option key={agency.id} value={agency.id}>
                            {agency.name}
                          </option>
                        ))}
                      </select>
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
                        {loading ? <LoadingSpinner /> : 'Add user'}
                      </button>
                    </div>
                  </div>
                </form>
                

                <h3 className='mt-5'>Employee List</h3>
                <center>
                  <p>
                    <input 
                      type='text' 
                      className='search' 
                      placeholder='SEARCH EMPLOYEE' 
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
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Agency</td>
                        <td>Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            <LoadingSpinner />
                          </td>
                        </tr>
                      ) : (
                        filteredEmployees.map((employee) => (
                          <tr key={employee.id}>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{agencies.find(a => a.id === employee.agencyId)?.name || 'N/A'}</td>
                            <td>
                              <button c
                               className={` btncancil btn btn-danger btn-sm d-block w-100`} 
                               onClick={() => handleDelete(employee.id)}>
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
      </section>
      <ToastContainer />
    </>
  );
};

export default AddEmployee; 
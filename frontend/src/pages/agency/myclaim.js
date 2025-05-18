import Menu from '../../components/agency';
import Hero from '../../components/samplehero';

import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/loading';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const [claims, setclaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchclaims = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setclaims(data.data);
        } else {
          console.error('Failed to fetch claims:', data.message);
        }

        // Set loading to false after fetching data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching claims:', error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    fetchclaims();
  }, []);

  const handleView = (id) => {
    navigate(`../admin_one/${id}`);
  };


  const handleApprove = async (userId) => {
    // navigate(`../one/${id}`);

    try {
      const isConfirmed = window.confirm("Are you sure you want to approve this claim?");
      if (!isConfirmed) {
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/approve/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed

        window.location.reload();
        // await navigate('../admin_claim');
      } else {
        const errorData = await response.json();
        console.error(`Failed to approve user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleReject = async (userId) => {
    // navigate(`../one/${id}`);


    try {
      const isConfirmed = window.confirm("Are you sure you want to reject this claim?");
      if (!isConfirmed) {
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/reject/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed

        window.location.reload();
        // await navigate('../admin_claim');
      } else {
        const errorData = await response.json();
        console.error(`Failed to approve user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  console.log(claims)
  return (
   <>
   <Menu/>
   <Hero title='all claims' discription='my all claims and status for each'/>

    


    <section class="section">

  <div class="container">
    <div class="row justify-content-center text-center mb-5" data-aos="fade">
      {/* <div class="col-md-6 mb-5">
        <img src="assets/img/undraw_svg_1.svg" alt="Image" class="img-fluid"/>
      </div> */}
    </div>

    <div class="row">
  
      <div class="col-md-12">
        <div class="step table-responsive">
          {/* <span class="number">03</span> */}
          {/* <h3>new claims</h3> */}
         <center> <p>
          <form>
            <input type='text' className='search' placeholder='SEARCH CLAIM' />
          </form>
          </p></center> <br/>
          <table className='table table-responsive'>
            <tr className='htr'>
              <td>title</td><td>date/time</td><td>status</td><td></td>
            </tr>
            {loading ? (
              <LoadingSpinner />
            ) : (
              claims.map((claim) => (
                <tr key={claim.id}>
                <td>{claim.title}</td><td> {claim.date} &nbsp; {claim.time}</td><td>{claim.status}</td>
                <td><button className='btn1' onClick={() => handleView(claim.id)}>view</button>
                
                {claim.status == 'approved' ||  !claim.status == 'approved' ? (
                          <button onClick={() => handleReject(claim.id)} className='btncancil'>reject</button>

                        ) : (
                              <button onClick={() => handleApprove(claim.id)} className='btnapproval'>approve</button>
                        )
                        }

                        
             
                
                
                </td>
              </tr>
  
              ))
            )}



       
          </table>
        </div>
      </div>
    </div>
  </div>

</section>




    </>
  );
}

export default App;

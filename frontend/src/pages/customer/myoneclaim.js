import Menu from '../../components/agency';
import Footer from '../../components/footer';
import Hero from '../../components/samplehero';

import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/loading';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claims, setclaims] = useState();
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchclaims = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/one/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setclaims([data.data]);
          console.log([data.data])
        } else {
          console.error('Failed to fetch claims:', data.message);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching claims:', error);
        setLoading(false);
      }
    };

    fetchclaims();
  }, []);

  const handleReply = async (claimId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          claimId: claimId,
          message: replyMessage
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Reply sent successfully');
        setReplyMessage('');
        // Refresh the page to show new reply
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Error sending reply');
    }
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

        // window.location.reload();
        await navigate('../admin_claim');
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

        // window.location.reload();
        await navigate('../admin_claim');
      } else {
        const errorData = await response.json();
        console.error(`Failed to approve user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  // console.log(claims)
  return (
    <>
      <Menu />
      <Hero title='Details of my claim' discription='details of this claim' />

      <section className="section">
        <div className="container">
          <div className="row">
            {loading ? (
              <LoadingSpinner />
            ) : (
              claims.map((claim) => (
                <div className="col-12" key={claim.id}>
                  <div className="step">
                    <span className="number">Claim number:#000{claim.id}</span>
                    <h3>{claim.title}</h3>
                    
                    {/* Claim Details */}
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">Claim Details</h5>
                        <p>{claim.description}</p>
                        <div className="row">
                          <div className="col-md-4">Status: <span className="badge bg-primary">{claim.status}</span></div>
                          <div className="col-md-4">Date: {claim.date}</div>
                          <div className="col-md-4">Time: {claim.time}</div>
                        </div>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">Your Information</h5>
                        <div className="row">
                          <div className="col-md-6">
                            <p>Name: {claim.ClaimsUser.firstname} {claim.ClaimsUser.lastname}</p>
                            <p>Email: {claim.ClaimsUser.email}</p>
                            <p>Phone: {claim.ClaimsUser.phone}</p>
                          </div>
                         
                        </div>
                      </div>
                    </div>

                    {/* Agency Details */}
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">Agency Information</h5>
                        <div className="row">
                          <div className="col-md-6">
                            <p>Name: {claim.ClaimsAgency.name}</p>
                            <p>Email: {claim.ClaimsAgency.contactEmail}</p>
                          </div>
                          <div className="col-md-6">
                            <p>Phone: {claim.ClaimsAgency.contactPhone}</p>
                            <p>Location: {claim.ClaimsAgency.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Replies Section */}
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">Replies</h5>
                        {claim.ClaimsReplies && claim.ClaimsReplies.length > 0 ? (
                          claim.ClaimsReplies.map((reply) => (
                            <div key={reply.id} className="border-bottom mb-3 pb-3">
                              <p>{reply.message}</p>
                              <small className="text-muted">
                                Replied on: {new Date(reply.createdAt).toLocaleString()}
                              </small>
                            </div>
                          ))
                        ) : (
                          <p>No replies yet</p>
                        )}

                 
                      </div>
                    </div>

                
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;

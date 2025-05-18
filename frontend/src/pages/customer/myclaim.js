import Menu from '../../components/menu';
import Footer from '../../components/footer';
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
    navigate(`../one/${id}`);
  };
  // console.log(claims)
  return (
    <>
      <Menu />
      <Hero title='My claims' discription='my all claims and status for each' />





      <section class="section">

        <div class="container">
          <div class="row justify-content-center text-center mb-5" data-aos="fade">
          </div>

          <div class="row">

            {/* <div class="col-md-4">
        <div class="step">
          <span class="number">01</span>
          <h3>Sign Up</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div> */}


            {loading ? (
              <LoadingSpinner />
            ) : (
              claims.map((claim) => (
          

                <div class="col-md-6" onClick={() => handleView(claim.id)} key={claim.id}>
                  <div class="step">
                    <span class="number">Claim number:#000{claim.id}</span>
                    <h3>{claim.title}</h3>
                    <p>{claim.description}</p>
                    <br />
                    <div className='row'>
                      <div className='col-4'>  <i><button className='statusbtn'>{claim.status}</button> </i></div>
                      <div className='col-4'> </div>
                      {/* <div className='col-4'> <i></i> </div> */}
                      {/* view button */}
         

                    </div>
                    <div className='row'>
                      <div className='col-4'>  <i>{claim.date} </i></div>
                      <div className='col-4'> </div>
                      <div className='col-4'> <i>{claim.time} </i> </div>


                    </div>
                    <div className='col-12'> <i><button className='btn btn-primary mt-3 w-100 btn-sm'>View this claim</button> </i></div>

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

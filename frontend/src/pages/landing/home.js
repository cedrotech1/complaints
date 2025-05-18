// import './App.css';
import Menu from '../../components/menuLanding';
import Footer from '../../components/footer';
import Hero from '../../components/homeHero';
function App() {
  return (
   <>
   <Menu/>

  

   <Hero title='WELCAME TO CLAIMING PAGE' 
   discription='welcame to claiming page !'/>

    



   <main id="main">

{/* <!-- ======= Home Section ======= --> */}
<section className="section">
  <div className="container">
    <div className="row justify-content-center text-center mb-5">
      <div className="col-md-5" data-aos="fade-up">
        <h2 className="section-heading">Efficient Claims Management System</h2>
      </div>
    </div>

    <div className="row">
      <div className="col-md-4" data-aos="fade-up" data-aos-delay="">
        <div className="feature-1 text-center">
          <div className="wrap-icon icon-1">
            <i className="bi bi-file-earmark-text"></i>
          </div>
          <h3 className="mb-3">Submit Claims</h3>
          <p>Easily submit your claims to various government agencies through our streamlined digital platform.</p>
        </div>
      </div>
      <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
        <div className="feature-1 text-center">
          <div className="wrap-icon icon-1">
            <i className="bi bi-clock-history"></i>
          </div>
          <h3 className="mb-3">Real-time Tracking</h3>
          <p>Track the status of your claims in real-time and receive instant notifications on updates.</p>
        </div>
      </div>
      <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
        <div className="feature-1 text-center">
          <div className="wrap-icon icon-1">
            <i className="bi bi-chat-dots"></i>
          </div>
          <h3 className="mb-3">Direct Communication</h3>
          <p>Communicate directly with government agencies and receive official responses to your claims.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="section">
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <div className="step">
          <span className="number">01</span>
          <h3>Register Account</h3>
          <p>Create your account using your National ID and verify your identity for secure access.</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="step">
          <span className="number">02</span>
          <h3>Submit Your Claim</h3>
          <p>Fill out the necessary details, attach supporting documents, and submit your claim to the relevant agency.</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="step">
          <span className="number">03</span>
          <h3>Track Progress</h3>
          <p>Monitor the status of your claim and receive updates as government agencies process your request.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="section">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-4 me-auto">
        <h2 className="mb-4">Transparent Communication</h2>
        <p className="mb-4">Our platform ensures transparent communication between citizens and government agencies. 
        Get real-time updates, official responses, and track the progress of your claims efficiently.</p>
        <p><a href="/register" className="btn btn-primary">Register Now</a></p>
      </div>
      <div className="col-md-6" data-aos="fade-left">
        <img src="assets/img/claim.png" alt="Claims Process" className="img-fluid"/>
      </div>
    </div>
  </div>
</section>

<section className="section">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-4 ms-auto order-2">
        <h2 className="mb-4">Multiple Agency Support</h2>
        <p className="mb-4">Submit claims to various government agencies including RRA, Local Government, 
        and other public institutions. All your communications are managed in one centralized platform.</p>
        <p><a href="/agencies" className="btn btn-primary">View Supported Agencies</a></p>
      </div>
      <div className="col-md-6" data-aos="fade-right">
        <img src="assets/img/support.jpeg" alt="Government Agencies" className="img-fluid"/>
      </div>
    </div>
  </div>
</section>


{/* <!-- ======= CTA Section ======= --> */}
<section className="section cta-section">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6 me-auto text-center text-md-start mb-5 mb-md-0">
        <h2>Start Filing Your Claims Today</h2>
      </div>
      <div className="col-md-5 text-center text-md-end">
        <p>
          <a href="/register" className="btn btn-primary">Register Now</a>
          <a href="/learn-more" className="btn btn-secondary ms-2">Learn More</a>
        </p>
      </div>
    </div>
  </div>
</section>
{/* <!-- End CTA Section --> */}

</main>
{/* <!-- End #main --> */}

{/* <!-- ======= Footer ======= --> */}
<Footer/>

   </>
  );
}

export default App;

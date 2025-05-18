function Footer() {
    return (
      <>
        <footer className="footer" role="contentinfo">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <h3>About Claims Portal</h3>
                <p>Your comprehensive platform for managing and submitting claims to various government agencies in Rwanda. We streamline communication between citizens and public institutions for efficient service delivery.</p>
                <p className="social">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><span className="bi bi-twitter"></span></a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><span className="bi bi-facebook"></span></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><span className="bi bi-linkedin"></span></a>
                </p>
              </div>
              <div className="col-md-7 ms-auto">
                <div className="row site-section pt-0">
                  <div className="col-md-4 mb-4 mb-md-0">
                    <h3>Quick Links</h3>
                    <ul className="list-unstyled">
                      <li><a href="/customer">Dashboard</a></li>
                      <li><a href="/claim">Submit Claim</a></li>
                      <li><a href="/myclaim">My Claims</a></li>
                      <li><a href="/agencies">Partner Agencies</a></li>
                    </ul>
                  </div>
                  <div className="col-md-4 mb-4 mb-md-0">
                    <h3>Resources</h3>
                    <ul className="list-unstyled">
                      <li><a href="/how-it-works">How It Works</a></li>
                      <li><a href="/faqs">FAQs</a></li>
                      <li><a href="/support">Support Center</a></li>
                      <li><a href="/guidelines">Forms & Guidelines</a></li>
                    </ul>
                  </div>
                  <div className="col-md-4 mb-4 mb-md-0">
                    <h3>Contact Info</h3>
                    <ul className="list-unstyled">
                      <li>Claims Portal Office</li>
                      <li>Kigali, Rwanda</li>
                      <li><a href="tel:+250XXXXXXXX">Support: +250 XXX XXX XXX</a></li>
                      <li><a href="mailto:support@claims.gov.rw">support@claims.gov.rw</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center text-center">
              <div className="col-md-7">
                <p className="copyright">&copy; {new Date().getFullYear()} Government Claims Portal. All Rights Reserved</p>
                <div className="credits">
                  A Government of Rwanda e-Service
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
  
  export default Footer;
  
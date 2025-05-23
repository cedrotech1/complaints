

function Hero(props) {
  return (
    <>
      <section class="hero-section" id="hero">

        <div class="wave">

          <svg width="100%" height="355px" viewBox="0 0 1920 355" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Apple-TV" transform="translate(0.000000, -402.000000)" fill="#FFFFFF">
                <path d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,757 L1017.15166,757 L0,757 L0,439.134243 Z" id="Path"></path>
              </g>
            </g>
          </svg>

        </div>

        <div class="container">
          <div class="row align-items-center">
            <div class="col-12 hero-text-image">
              <div class="row">
                <div class="col-lg-7 text-center text-lg-start">
                  <h1 data-aos="fade-right">{props.title}</h1>
                  <p class="mb-5" data-aos="fade-right" data-aos-delay="100">
                      {props.discription}
                    </p>
                  <div class='row'>
                    <div class='col-md-3'>
                      <p data-aos="fade-right" data-aos-delay="200" data-aos-offset="-500"><a href="register" class="btn btn-outline-white">Get started</a></p>
                    </div>

                    <div class='col-md-3'>
                      <p data-aos="fade-right" data-aos-delay="200" data-aos-offset="-500"><a href="login" class="btn btn-outline-white">sign in</a></p>
                    </div>
                  </div>

                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-4 iphone-wrap">
                  <img src="assets/img/lg1.png" style={{width:'100%',height:''}} alt="Image" class="phone-1" data-aos="fade-right" />
                  {/* <img src="assets/img/phone_2.png" alt="Image" class="phone-2" data-aos="fade-right" data-aos-delay="200"/> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>


    </>
  );
}

export default Hero;

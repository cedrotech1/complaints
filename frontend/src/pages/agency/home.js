// import './App.css';
import Menu from '../../components/agency';
// import Footer from '../../components/footer';
// import Hero from '../../components/homeHero';
import Hero from '../../components/samplehero';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const fullName = `${user.firstname} ${user.lastname}`;
  const welcomeTitle = `WELCOME  ${fullName.toUpperCase()}`;
  const welcomeDescription = `Welcome to claiming(complaining site) claiming page! You are logged in as ${user.role}.`;

  return (
    <>
      <Menu />
      <Hero 
        title={welcomeTitle}
        discription={welcomeDescription}
        Button_1_link='claim'
        Button_1_Name='Claim now'
        Button_2_link='myclaim'
        Button_2_Name='My claims'
      />

      <main id="main">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="step">
                  <span className="number">001</span>
                  <h3>pending claims</h3>
               <p>when citizen make claim , claim status is pending, you can see all pending claims in this section</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="step">
                  <span className="number">002</span>
                  <h3>approved/rejected </h3>
                  <p>when citizen make claim , and agence user can make approve or reject the claim, you can see all approved/rejected claims in this section</p>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="step">
                  <span className="number">003</span>
                  <h3>replies claims</h3>
                 <p>when citizen make claim , and agence user  can see all replies claims in this section</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

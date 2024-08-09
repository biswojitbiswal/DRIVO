import React from 'react'
import AboutImg from '../Images/AboutImg.jpg'

function About() {
  return (
    <>
      <section className='about-page'>
        <div className="about-description">
          <div className="description">
            <h1>Quality Vehicles, where you want it, when you want it.</h1>
            <p>Drivo offers a unparalleled range of Self-Drive Vehicles in Odisha with a wide range of Cars. With the state's first fully fledged vehicle rental company , our team works round the clock with dedicated departments to provide seamless services in the sector.</p>
            <p>With a wide range of Self-Drive Cars, Drivo stands out from its competitors by providing flexibility in booking according to people's need. Who doesn't love unrestricted driving? So we've got our customers an unlimited kilometers access, premium list of vehicles from multiple manufacturers , Top variant models , timely serviced and new vehicles in fleet which makes every ride a smooth and hassle-free.</p>
            <p>Drivo steadily aims to revolutionize the transportation industry by ensuring passenger comfort to highest extent. Available in multiple localities , it has been constantly expanding its operations for the ones who have the roads calling , Drivo has the Keys for them cause we know one destination never suffices. Where's Next?.</p>
          </div>
          <div className="about-img">
            <img src={AboutImg} alt="Image" />
          </div>
        </div>
        <div className="about-advantages">
          <h1>Drivo Advantages</h1>
          <div className="advantages">
            <div className="advantage">
              <h2>Unlimited Kilometers</h2>
              <p>Go the distance with no restrictions on Kilometers. Just refuel the vehicle according to your needs and Drive-Off!</p>
            </div>
            <div className="advantage">
              <h2>24x7 Roadside Assistance</h2>
              <p>We ensure our vehicles in the most fit conditions cause we know no one likes interruptions in their journey. But if obstructed by any , we're just a Call Away!</p>
            </div>
            <div className="advantage">
              <h2>Free Airport/Station Delivery</h2>
              <p>
              Just Landed at the Airport or reached Station? Schedule your trips and we'll ensure you get the Keys there itself! .
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default About

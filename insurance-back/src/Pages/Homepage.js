import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Homepage.css';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSession = () => {
    axios.get('http://localhost:3000/session', { withCredentials: true })
      .then(res => {
        setIsLoggedIn(res.data.loggedIn);
      })
      .catch(err => console.error("Session check error:", err));
  };

  useEffect(() => {
    checkSession();
  }, []);

  // const goToLogin = () => {
  //   navigate('/login');
  // };
  const goToLogin = (destination) => {
    sessionStorage.setItem("redirectAfterLogin", destination);
    navigate('/login');
  };
  const handleLogout = () => {
    axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch(err => console.error("Logout error:", err));
  };
  const handleLearnMore = (destination) => {
    if (isLoggedIn) {
      navigate(destination);
    } else {
      goToLogin(destination);
    }
  };

  return (
    <>
      <div id='navbar'>
        <h3>Insurance</h3>
        {/* <a href='/travel'>Travel</a>
        <a href='/life'>Life</a>
        <a href='/motor'>Motor</a> */}
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={()=>goToLogin('/')}>Login</button>
        )}
      </div>
      <div className='carousel'>
        <Carousel>
          <Carousel.Item>
            <img className='d-block w-100' src='/images/slide1.jpg' alt='First slide' />
            <Carousel.Caption>
              <h3>Secure Your Travels</h3>
              <p>Comprehensive travel insurance to keep you protected on the go.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-100' src='/images/slide2.png' alt='Second slide' />
            <Carousel.Caption>
              <h3>Life Insurance Plans</h3>
              <p>Ensure financial security for your loved ones.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-100' src='/images/slide3.jpg' alt='Third slide' />
            <Carousel.Caption>
              <h3>Motor Protection</h3>
              <p>Reliable motor insurance for your vehicle’s safety.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='insurance-cards'>
        <div className='card'>
          <img src='/images/travel.jpeg' alt='Travel Insurance' />
          <h3>Travel Insurance</h3>
          <p>Travel worry-free with our comprehensive travel insurance</p>
          <button onClick={() => handleLearnMore('/travel')}>Learn More</button>
        </div>
        <div className='card'>
          <img src='/images/life.jpg' alt='Life Insurance' />
          <h3>Life Insurance</h3>
          <p>Ensure financial security for your loved ones with our life insurance plans.</p>
          <button onClick={() => handleLearnMore('/life')}>Learn More</button>
        </div>
        <div className='card'>
          <img src='/images/motor.jpg' alt='Motor Insurance' />
          <h3>Motor Insurance</h3>
          <p>Protect your vehicle against damages with our reliable motor insurance.</p>
          <button onClick={() => handleLearnMore('/motor')}>Learn More</button>
        </div>
      </div>
      <footer className='footer'>
        <p>Contact Us: support@insurance-ind.com</p>
        <p>Phone: +123-456-7890</p>
        <p>About Us: We offer a wide range of insurance options tailored to your needs.</p>
      </footer>
    </>
  );
}

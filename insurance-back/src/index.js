import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/Homepage'
import Login from './Pages/LoginPage';
import Travel from './Pages/Travelnsurance'
import Life from './Pages/LifeInsurance'
import Motor from './Pages/Motorinsurance'
import Sign from './Pages/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Route to HomePage */}
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/travel' element={<Travel></Travel>}></Route>
        <Route path='/motor' element={<Motor></Motor>}></Route>
        <Route path='/life' element={<Life></Life>}></Route>
        <Route path='/signup' element={<Sign></Sign>}></Route>
      </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

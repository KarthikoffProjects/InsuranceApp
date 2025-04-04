import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import './Styles/Motor.css'

export default function Motorinsurance() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/MotorInsurance')
      .then(res => {
        console.log("Fetched Data:", res.data);
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  // const handlePayment = async () => {
  //   setLoading(true);
  //   setMessage("");

  //   try {
  //     const response = await axios.post("http://localhost:3000/mock-payment", {
  //       amount,
  //       currency: "INR",
  //     });

  //     setMessage(response.data.message);
  //   } catch (error) {
  //     setMessage("Payment failed");
  //     console.error("Payment error:", error);
  //   }

  //   setLoading(false);
  // };
   useEffect(()=>{
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    },[])
    const handlePayment = () => {
      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag", // Razorpay public test key
        amount: 1000000, // Amount in paise (₹500)
        currency: "INR",
        name: "Test Merchant",
        description: "Test Transaction",
        handler: function (response) {
          alert("Payment ID: " + response.razorpay_payment_id);
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };

  return (
    <>
    <h2 className='motor-heading'>Motor Schemas</h2>
    <div className='motor-container'>
      {data.map((card,id)=>(<div className='card3' key={id}>
        <h3 className='card3-title'>{card.Name}</h3>
        <p className='card3-term'><strong>Policy:</strong>{card.Term}</p>
        <p className='card3-expiry'><strong>Expiry:</strong>{card.Expiry}</p>
        <button onClick={handlePayment}  style={{ padding: "10px 20px",background:"green",color:"#fff" }}>
      Pay Now
      </button>
      </div>))}
      
    </div>
    </>
  )
}

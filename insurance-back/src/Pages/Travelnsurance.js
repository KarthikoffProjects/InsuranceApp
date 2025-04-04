import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Travel.css';

export default function TravelInsurance() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/TravelInsurance')
      .then(res => {
        console.log("Fetched Data:", res.data);
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  useEffect(()=>{
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  },[])
  const handlePayment = () => {
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Razorpay public test key
      amount: 50000, // Amount in paise (₹500)
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
  return (
    <>
    <h2 className='travel-heading'>Travel Schemas</h2>
    <div className='travel-container'>
      {data.map((card, id) => (
        <div className='card1' key={id}>
          <h3 className="card1-title">{card.Name}</h3>
          <p className="card1-term"><strong>Term:</strong> {card.Term}</p>
          <p className="card1-expiry"><strong>Expiry:</strong> {card.Expiry}</p>
          <button onClick={handlePayment}  style={{ padding: "10px 20px",background:"green",color:"#fff" }}>
        PayNow
      </button>
        </div>
      ))}
    </div>
    </>
  );
}

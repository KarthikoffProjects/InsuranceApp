import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Styles/Life.css'

export default function LifeInsurance() {
  const[data,setData]=useState([]);
  useEffect(()=>{
    axios
    .get('http://localhost:3000/LifeInsurance')
    .then(res=>setData(res.data))
    .catch(err=>console.error(err))
  },[])
  useEffect(()=>{
   const script= document.createElement('script');
   script.src="https://checkout.razorpay.com/v1/checkout.js";
   script.async=true;
   document.body.appendChild(script);
    
  },[])
  const handlePayment=()=>{
    const options={
      key:"rzp_test_1DP5mmOlF5G5ag",
      amount: 3000000, // Amount in paise (₹500)
      currency: "INR",
      name: "Test Merchant",
      description: "Test Transaction",
     handler:function(response){
      alert("payment:"+ response.razorpay_payment_id)
     },
     theme: {
      color: "#3399cc",
    },
    }
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  // const handlePayment = async () => {
  //     setLoading(true);
  //     setMessage("");
  
  //     try {
  //       const response = await axios.post("http://localhost:3000/mock-payment", {
  //         amount,
  //         currency: "INR",
  //       });
  
  //       setMessage(response.data.message);
  //     } catch (error) {
  //       setMessage("Payment failed");
  //       console.error("Payment error:", error);
  //     }
  
  //     setLoading(false);
  //   };
  return (
    <>
    <h2 className='life-heading'>Life Schemas</h2>
    <div className='life-container'>
      {data.map((card,id)=>(<div className='card2'>
        <h3 className='card2-title'>{card.Name}</h3>
        <p className='card2-term'><strong>Expiry:</strong>{card.Term}</p>
        <button onClick={handlePayment} style={{ padding: "10px 20px",background:"green",color:"#fff" }}>
        Pay Now
      </button>
      </div>))}
    </div>
    </>
  )
}

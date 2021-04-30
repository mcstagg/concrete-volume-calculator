import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';

const App = () => {
  // Create coins variable and set to empty array
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {
      const data = await API.get('cvcorderapi', `/cvcorder`);
      setOrders(data.orders);
      console.log(data.orders);
    }
  
    catch (err) {
      console.error(err);
    }

  };

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchOrders()
  }, [])

  return (

    <>
    <div className="App">
      <h3>Order Status:</h3>
      {
        orders.map((order, index) => (
          <div key={index}>
            <p><b>{order.name}</b> {order.symbol}</p>
          </div>
        ))
      }
    </div>
    </>
  );
}

export default App
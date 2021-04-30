import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';
import truck from './truck.png';

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
    };
  };

  // Call fetchOrders function when component loads
  useEffect(() => {
    fetchOrders()
  }, [])

  return (

    <>
      <div>
        <img src={truck} alt="truck"/>
        <h1><u>Concrete Volume Calculator</u></h1>
      </div>
      
      <div>
        <form action="">
          <h3><i>Enter Your Details Below:</i></h3>
          <input type="radio" id="wall" name="options" value="wall" />
          <label for="wall">Wall</label><br />
          <input type="radio" id="footing" name="options" value="footing" />
          <label for="footing">Footing</label><br />
          <input type="radio" id="patio" name="options" value="patio" />
          <label for="patio">Patio</label><br />
          <input type="radio" id="sidewalk" name="options" value="sidewalk" />
          <label for="sidewalk">Sidewalk</label>
        </form>
      </div>

      <div>
        <form>
          <h3><i>New Dimension:</i></h3>
          <label for="width">Width </label>
          <input type="text" id="width" name="widths" value="" /><br />
          <label for="height">Height </label>
          <input type="text" id="height" name="heights" value="" /><br />
          <label for="length">Length </label>
          <input type="text" id="length" name="lengths" value="" />
        </form>
      </div>
    
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
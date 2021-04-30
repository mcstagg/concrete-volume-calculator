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
          <label htmlFor="wall">Wall</label><br />
          <input type="radio" id="footing" name="options" value="footing" />
          <label htmlFor="footing">Footing</label><br />
          <input type="radio" id="patio" name="options" value="patio" />
          <label htmlFor="patio">Patio</label><br />
          <input type="radio" id="sidewalk" name="options" value="sidewalk" />
          <label htmlFor="sidewalk">Sidewalk</label>
        </form>
      </div>

      <div>
        <form>
          <h3>New Dimension:</h3>
          <label htmlFor="width">Width </label>
          <input type="text" id="width" name="widths" value="width" /><br />
          <label htmlFor="height">Height </label>
          <input type="text" id="height" name="heights" value="height" /><br />
          <label htmlFor="length">Length </label>
          <input type="text" id="length" name="lengths" value="length" /><br />
          <input type="submit" value="Add New Dimension" />
        </form>
      </div>

      <div>
        <h3>Entries:</h3>
        <p>8in Wide by 10ft high by 100ft long = 24.7 Cubic Yards</p>
        <h4>Total Cubic Yards: 24.7</h4>
      </div>

      <div>
        <form>
          <h3>Order Form:</h3>
          <label htmlFor="date">Date: </label>
          <input type="text" id="date" name="dates" value="date" /><br />
          <label htmlFor="customer">Customer: </label>
          <input type="text" id="customer" name="customers" value="customer" /><br />
          <label htmlFor="type">Type of Pour: </label>
          <input type="text" id="type" name="types" value="type" /><br />
          <label htmlFor="yards">Cubic Yards: </label>
          <input type="text" id="yards" name="cubicyards" value="yards" /><br />
          <label htmlFor="chloride">Chloride: </label>
          <input type="text" id="chloride" name="chloridecontent" value="chloride" /><br />
          <label htmlFor="fiber">Fiber Mesh: </label>
          <input type="text" id="fiber" name="fibermesh" value="fiber" /><br />
          <label htmlFor="temp">Temperature: </label>
          <input type="text" id="temp" name="temperature" value="temp" /><br />
          <label htmlFor="slump">Slump: </label>
          <input type="text" id="slump" name="slumpin" value="slump" /><br />
          <label htmlFor="water">Water Content: </label>
          <input type="text" id="water" name="h20" value="water" /><br />
          <label htmlFor="address">Address: </label>
          <input type="text" id="address" name="jobadress" value="address" /><br />
          <label htmlFor="special">Special Instructions: </label>
          <input type="text" id="special" name="specialinstructions" value="special" /><br />
          <input type="submit" value="Place Your Order" />
        </form>
      </div>
    
      
      <div className="">
        <h3>Your Order Has Been Confirmed!</h3>
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
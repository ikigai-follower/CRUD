// import './App.css';
import { BarChart, Bar,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Sector, Cell, } from 'recharts';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API_url } from '../api';
import './Main.css';



function Main() {

     const [data, setData] = useState([]);

    const readData = async () => {
        const response = await  axios.get(API_url );
        setData(response.data)
    }
  
    useEffect(() => {
        readData();
    }, []);
    
    const Total=((data.reduce((total,currentItem) => total + parseInt(currentItem.price),0)));
    const Discounted=((data.reduce((total,currentItem) => total + parseInt(currentItem.discount),0)));
    
    const saving=(Total-Discounted);
      
   
  return (
    <div className='Dashboard'>
      <h1 className='heading'>E-commerce</h1>
    
        <div className='lists'>
        <a href='/Tables'>User Details</a>
        <a href='/Getall'>View Product</a>
        <a href='/Add'>Add Product</a>
        <a href='/'>Logout</a>
        </div>

      <div className="bar" >
      <h2 >Dynamic Chart for product price Vs discount</h2><br></br><br></br>
        <ResponsiveContainer  
          style={{backgroundColor:"red"}}
          >
            <BarChart data={data}  
           
            margin={{
            top: 5,
            right: 30,
            left: 10,
            bottom: 5,
          }}>
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey={"price"} barSize={50} fill="blue" 
           />
            <Bar dataKey={"discount"} barSize={30} fill="darkgreen"/>
                <XAxis dataKey={"Product"}/>
                <YAxis />
                <Tooltip />
                <Legend/>
                
            </BarChart>
        </ResponsiveContainer></div>
       
        <div className='Total' >
        
         <h1 className='text'> Total price of the products : Rs. {Total} </h1><br></br>
         <h1 className='text'> Total discount of the products : Rs.{Discounted} </h1><br></br>
         <h1 className='text'> Savings - Rs. {saving}</h1>
         
         </div>
         </div> 
      

  );
}

export default Main;
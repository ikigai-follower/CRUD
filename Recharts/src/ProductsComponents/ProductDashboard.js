import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_url } from "../api";
import "./ProductDashboard.css";

function ProductDashboard() {
  const [ProductsDetails, setProductsDetails] = useState([]);

  //GET PRODUCTS DETAILS AND STORE IT IN A STATE 
  const readData = async () => {
    const response = await axios.get(API_url);
    setProductsDetails(response.data);
  };

  //FOR INITIAL RENDERING
  useEffect(() => {
    readData();
  }, []);

  //CALCULATE TOTAL PRICE OF THE PRODUCT
  const Total = ProductsDetails.reduce(
    (total, currentItem) => total + parseInt(currentItem.price),
    0
  );
  //CALCULATE TOTAL DISCOUNTED PRICE OF THE PRODUCT
  const Discounted = ProductsDetails.reduce(
    (total, currentItem) => total + parseInt(currentItem.discount),
    0
  );
  //CALCULATE THE SAVINGS 
  const saving = Total - Discounted;

  return (
    <div className="Dashboard">
      <h1 className="heading">E-commerce</h1>
      {/* NAVIGATION  */}
      <div className="lists">
        <a href="/UserDetails">User Details</a>
        <a href='/ProductList' >View Product</a>
        <a href='/AddProduct'>Add Product</a>
        <a href="/">Logout</a>
      </div>
      {/* BAR CHART IN ProductDashboard */}
      <div className="bar">
        <h2>Dynamic Chart for product price Vs discount</h2>
        <br></br>
        <br></br>
        <ResponsiveContainer style={{ backgroundColor: "red" }}>
          <BarChart
            data={ProductsDetails}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey={"price"} barSize={50} fill="blue" />
            <Bar dataKey={"discount"} barSize={30} fill="darkgreen" />
            <XAxis dataKey={"Product"} />
            <YAxis />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* TOTAL PRICE OF THE PRODUCTS ,DISCOUNT AND SAVINGS */}
      <div className="Total">
        <h1 className="text"> Total price of the products : Rs. {Total} </h1>
        <br></br>
        <h1 className="text">
          {" "}
          Total discount of the products : Rs.{Discounted}{" "}
        </h1>
        <br></br>
        <h1 className="text"> Savings - Rs. {saving}</h1>
      </div>
    </div>
  );
}

export default ProductDashboard;

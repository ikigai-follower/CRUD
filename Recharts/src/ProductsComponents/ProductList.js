import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_url } from "../api";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function ProductList() {
  const [ProductList, setProductList] = useState([]);
  const navigate = useNavigate();

  //GET THE PRODUCT LISTS FROM THE API
  const readData = async () => {
    const response = await axios.get(API_url);
    setProductList(response.data);
  };
  //INITIAL RENDERING FOR GETTING PRODUCT DETAILS
  useEffect(() => {
    readData();
  }, []);

  //DELETE THE UNNEEDED PRODUCTS DETAILS
  const remove = async (id) => {
    await axios.delete(API_url + "/" + id);
    readData();
  };

  return (
    <div>
      <h1>
        <Button
          style={{ color: "white", marginRight: "30px" }}
          variant="outlined"
          onClick={() => navigate("/ProductDashboard")}
        >
          {" "}
          Back
        </Button>
        Products List
        <Button
          onClick={() => navigate('/AddProduct')}
          style={{ color: "white", marginLeft: "30px" }}
          variant="outlined"
        >
          Add Product
        </Button>
      </h1>
      <div className="displ">
        {/* DISPLAY THE PRODUCT DETAILS  */}
        {ProductList.map((i, index) => (
          <div key={index} className="content ">
            <div className="inside">
              <h3 style={{ color: "brown" }}>Product name- {i.Product} </h3>
              <br />
              <h2 style={{ color: "red" }}> Price - {i.price} </h2>
              <br />
              <h2 style={{ color: "green" }}>
                {" "}
                discount -{i.discount}
                <Button varient="outlined" className="btn" onClick={() => remove(i.id)}>
                  {" "}
                  Remove
                </Button>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React,{ useState, useEffect } from "react"
import axios from "axios";
import { API_url } from '../api';
import './Container.css';

import Tooltip from '@mui/material/Tooltip';


export default function Getall(){
    const [data, setData] = useState([]);

    const readData = async () => {
        const response = await  axios.get(API_url );
        setData(response.data)
    }
   
    useEffect(() => {
        readData();
    }, []);

    const remove = async (id) => {
        await axios.delete(API_url +"/"+ id);
        readData();
    }



    return(
        <div>
            <h1><button className="btn" style={{backgroundColor: "rgb(73, 73, 166)",padding:"10px",cursor:"pointer" ,fontSize:"20px",color:"black",borderRadius:"15px",width:"180px",marginRight:"30px"}}><a href="/Main" style={{color:"black",textDecoration:"none"}}> &lt;-- Back</a> </button>Products List<button style={{backgroundColor: "rgb(73, 73, 166)",padding:"10px",cursor:"pointer" ,fontSize:"20px",color:"black",borderRadius:"15px",width:"180px",marginLeft:"30px"}}><a href="/Add" style={{color:"black",textDecoration:"none"}} >Add Product + </a> </button></h1>
            <div className='displ'>
              
            {data.map((i,index
                )=>(<div key={index} className="content ">
              
                <div className="inside" >
                <h3 style={{color:"brown"}}>Product name- {i.Product} </h3><br/>
                <h2 style={{color:"red"}}> Price - {i.price} </h2><br/>
                <h2 style={{color:"green"}}> discount -
                 {i.discount}
                 <Tooltip title="Remove this product">
                 <button  style={{backgroundColor: "lightgreen",padding:"10px" ,cursor:"pointer",fontSize:"15px",color:"black",borderRadius:"15px",width:"50px",marginLeft:"30px"}}  onClick={() =>remove(i.id)}> X</button></Tooltip>
                 </h2>
                 
                 
                </div>
            </div>))}
            
            </div>
        
 
            
        </div>
    )
}
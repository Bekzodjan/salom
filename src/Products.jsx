import React, { useState } from "react";
import { useEffect } from "react";
import apiCall from "./utils/request";

const Products = ({pr, spr, i, item }) => {
    let cur = localStorage.getItem('currentI')
    const [orders, setOrders] = useState([]);
  useEffect(() => {
    // console.log(item);
  }, []);

  function deleteItem(i) {
    apiCall('/orders?userId='+cur,"get").then(res=>{
        orders.push(...res.data)
        setOrders([...orders])
        setTimeout(() => {
          apiCall('orders/'+orders[i].id,'DELETE').then(res=>{
            apiCall("/orders?userId="+cur, "GET").then((res) => {
              spr(res.data);
            })
                })
        }, 10);
    })
  }

  return (
    <div className="card w-25 rounded p-0">
      <div className="bg-dark card-header text-white">
        <h3>{item.title}</h3>
        <h4>{item.desc}</h4>
      </div>
      <div className="card-body">
        {item.ingredients.map((itm,i) => (
          <ul key={i} className="list-group">
            <li className="list-group-item mb-2">
              {itm.productName}, {itm.productPrice}kg
            </li>
          </ul>
        ))}
      </div>
      <div className="card-footer bg-dark">
        <button className="btn btn-danger" onClick={()=>deleteItem(i)}>Delete</button>
      </div>
    </div>
  );
};

export default Products;

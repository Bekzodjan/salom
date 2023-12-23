import React, { useState } from "react";
import { useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Products from "./Products";
import apiCall from "./utils/request";
import {useNavigate} from 'react-router-dom'

const Cabinet = () => {
    const [isOpen, setIsOpen] = useState(false);
    let id = localStorage.getItem('currentI')
    const defPro = {
      userId: id,
      title: "",
      desc: "",
      ingredients: []
    };
    const [product, setProduct] = useState(defPro);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
  
    useEffect(() => {
      let a = localStorage.getItem("token")
      getProducts()
      if(a===undefined||a===null){
        navigate('/login')
      }
    }, []);
  
    function getProducts() {
      apiCall("/orders?userId="+id, "GET").then((res) => {
        setProducts(res.data);
      })
    }
  
    function addProduct() {
      product.ingredients.push({
        productName: "",
        productPrice: 0
      });
      setProduct({ ...product });
    }
  
    function selectProduct(e, i) {
      product.ingredients[i].productName = e.target.value;
      setProduct({ ...product });
    }
  
    function inputProduct(e, i) {
      product.ingredients[i].productPrice = e.target.value;
      setProduct({ ...product });
    }
  
    function saveProduct() {
      apiCall("/orders", "POST", product).then((res) => {
        console.log(product)
        setIsOpen(!isOpen);
        getProducts();
        setProduct(defPro);
      });
    }
    function dT() {
      localStorage.removeItem('token')
      setTimeout(()=>navigate('/'),1000)
    }
  
    return (
      <div>
        <button className="btn btn-dark" onClick={() => setIsOpen(!isOpen)}>
          open Modal
        </button>
        <button className="btn btn-danger" onClick={dT}>
          Sign out
        </button>
  
        <div className=" d-flex gap-2 flex-wrap p-5">
          {products.map((item, i) => (
            <Products key={i} pr={products} spr={setProducts} item={item} i={i} />
          ))}
        </div>
  
        <Rodal
          height={"auto"}
          visible={isOpen}
          onClose={() => setIsOpen(!isOpen)}
        >
          <div className="p-3">
            <input
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              className="form-control mb-2"
              type="text"
            />
            <textarea
              onChange={(e) => setProduct({ ...product, desc: e.target.value })}
              className="form-control mb-2"
              cols="30"
              rows="5"
            ></textarea>
  
            {product.ingredients.map((item, i) => (
              <div className="d-flex gap-1 mb-1" key={i}>
                <select
                  onChange={(e) => selectProduct(e, i)}
                  value={item.productName}
                  className="form-control"
                >
                  <option value="" hidden disabled selected>
                    Select product
                  </option>
                  <option value="Olma">Olma</option>
                  <option value="Anor">Anor</option>
                  <option value="Nok">Nok</option>
                  <option value="Uzum">Uzum</option>
                  <option value="Shaftoli">Shaftoli</option>
                  <option value="yog'">yog'</option>
                  <option value="guruch">guruch</option>
                  <option value="pomidor">pomidor</option>
                  <option value="bodring">bodring</option>
                  <option value="sabzi">sabzi</option>
                  <option value="kartoshka">kartoshka</option>
                  <option value="go'sht">go'sht</option>
                </select>
                <input
                  onChange={(e) => inputProduct(e, i)}
                  value={item.productPrice}
                  className="form-control"
                  type="number"
                />
                <button onClick={() => deleteProduct(i)} className="btn btn-danger">X</button>
              </div>
            ))}
  
            <button onClick={addProduct} className="btn btn-dark">
              add product
            </button>
            <button onClick={saveProduct} className="btn btn-success">
              save product
            </button>
          </div>
        </Rodal>
      </div>
    );
  }

export default Cabinet
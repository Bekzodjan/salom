import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import apiCall from "./utils/request";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [show, setShow] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  function myS(data) {
    apiCall("/users", "get").then((res) => {
      res.data.filter((item) => {
        if (item.tel === data.tel && item.password === data.pass) {

            navigate("/");
            localStorage.setItem("token", {
              userId: item.id,
              token: item.tel
            });
            localStorage.setItem("currentI", item.id);
            
          } else {
            toast.error('Login yoki parol noto\'g\'ri', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
              });          }
      });
    });
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(myS)}
        className="w-25 mx-auto bg-dark text-white p-2 py-5 pb-4 mt-5 border border-danger border-2"
      >
        <h1 className="text-center mb-2">Login</h1>
        <input
          {...register("tel")}
          placeholder="telni kiriting"
          type="text"
          className="text-bg-secondary form-control my-2"
        />
        <input
          {...register("pass")}
          placeholder="parolni kiriting"
          type={show?"text":"password"}
          className="text-bg-secondary form-control my-3"
        />
        <p className="d-flex align-items-center gap-2 mb-4"><input style={{width: "20px",height: "20px"}} type="checkbox" onClick={()=>setShow(!show)} /> show password</p>
        <button className="btn btn-success d-block mx-auto w-50">login</button>
      </form>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
</>
  );
};

export default Login;

import { useEffect, useState } from "react";
import call from "./utils/request";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  // const [eT, setET] = useState('');
  useEffect(() => {
    call("/users", "get").then((res) => {
      setTimeout(() => {
        setUsers([...res.data]);
        setTimeout(() => console.log(users), 10);
      }, 1000);
    });
  }, []);
  function poss(i) {
    localStorage.setItem("postI", i);
  }
  function tods(i) {
    localStorage.setItem("todoI", i);
  }
  return (
    <div>
      <div className="container w-100 py-3">
      <Link to={-1}className="d-block mx-auto w-25 btn btn-dark">Back</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Age</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>
                  <Link
                    onClick={() => poss(i)}
                    to={"/posts"}
                    className="btn btn-outline-primary"
                  >
                    Posts
                  </Link>
                  <Link
                    onClick={() => tods(i)}
                    to={"/todos"}
                    className="btn btn-outline-secondary mx-1"
                  >
                    Todos
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

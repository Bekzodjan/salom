import { Link, useNavigate, Route, Routes } from "react-router-dom";
import call from './utils/request';
import { useEffect, useState } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);
  let i = String(Number(localStorage.getItem("todoI")) + 1);
  useEffect(() => {
    call("/todos?userId=" + i, "get").then((res) => {
      setTodos([...res.data]);
      //   console.log(res)
    });
  }, []);

  return (
    <div>
      <Link to={-1}className="d-block mx-auto w-25 btn btn-dark">Back</Link>
      <table className="table">
        <thead>
          <tr>
            <th>userId</th>
            <th>Id</th>
            <th>title</th>
            <th>body</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {todos.map((item, i) => (
            <tr key={i}>
              <td>{item.userId}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.completed?<input type="checkbox" checked />:<input type="checkbox"/>}</td>
              {/* <td>
                  <Link onClick={()=>poss(i)} to={"/posts"} className="btn btn-outline-primary">
                    Posts
                  </Link>
                  <Link
                    to={"/todos"}
                    className="btn btn-outline-secondary mx-1"
                  >
                    Todos
                  </Link>
                </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Todos;

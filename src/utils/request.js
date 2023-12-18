import axios from "axios";
function call(url,method,data) {
 return axios({
    baseURL: "http://localhost:3001",
    url,
    method,
    data
 })   
}
export default call
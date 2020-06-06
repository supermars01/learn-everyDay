import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000/admin/api"
});

export default axios;

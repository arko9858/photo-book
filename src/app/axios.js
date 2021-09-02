import axios from "axios";

const baseURL = "https://secret-hamlet-72416.herokuapp.com/";
// const baseURL = "http://localhost:5000/";

const instance = axios.create({
  baseURL,
});

export default instance;

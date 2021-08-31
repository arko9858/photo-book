import axios from "axios";

const instance = axios.create({ baseURL: "https://secret-hamlet-72416.herokuapp.com/" });

export default instance;

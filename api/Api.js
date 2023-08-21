import axios from "axios";

export const LoginApi = axios.create({
  baseURL: "https://w1sppy28xj.execute-api.us-east-1.amazonaws.com/prod/gb97",
  headers:{
    "Accept-Language": "es"
  }
})
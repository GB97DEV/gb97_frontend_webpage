import axios from "axios";

export const LoginApi = axios.create({
  baseURL: process.env.GENERAL_API,
  headers:{
    "Accept-Language": "es"
  }
})

export const EmailApi = axios.create({
  baseURL: "https://nz303gnq69.execute-api.us-east-1.amazonaws.com/prod/gb97",
  headers:{
    "Accept-Language": "es"
  }
});
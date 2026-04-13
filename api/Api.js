import axios from "axios";

const IS_DEV = true;

const getBaseURL = () => {
  if (IS_DEV) {
    return "https://api-dev-textil.gb97.ec";
  }
  return "https://api-textil.gb97.ec";
};

export const LoginApi = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Accept-Language": "es"
  }
});

export const EmailApi = axios.create({
  baseURL: "https://nz303gnq69.execute-api.us-east-1.amazonaws.com/prod/gb97",
  headers:{
    "Accept-Language": "es"
  }
});
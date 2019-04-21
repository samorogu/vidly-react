import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

//as common, post can be used to send information in the header of http post
//axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

//axios.interceptors.response.use(success,error)//for  now we only want intercept errors
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    //console.log("Loggin the error", error);
    logger.log(error);
    toast.error("An unexpected error ocurred.");

    //toast.success toast.info or only toast
  }
  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

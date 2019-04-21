import http from "./httpService";
//import { apiUrl } from "../config.json";

//const apiEndpoint = "http://localhost:3900/api/movies";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

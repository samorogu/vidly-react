import http from "./httpService";
import { apiUrl } from "../config.json";

//const apiEndpoint = "http://localhost:3900/api/movies";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

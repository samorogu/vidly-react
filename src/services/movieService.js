import http from "./httpService";
import { apiUrl } from "../config.json";

//const apiEndpoint = "http://localhost:3900/api/movies";
const apiEndpoint = apiUrl + "/movies";
export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

export function saveMovie(movie) {}

import http from "./httpService";
import { apiUrl } from "../config.json";

//const apiEndpoint = "http://localhost:3900/api/movies";

const apiEndpoint = apiUrl + "/movies";

function MovieUrl(id) {
  return `${apiEndpoint}/${id}`; //template numerals in EG6
  //return "apiEndpoint +'/'+id;";//less elegant solution
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(MovieUrl(movieId));
}

export function getMovie(movieId) {
  return http.get(MovieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(MovieUrl(movie._id), body);
  } else {
    return http.post(apiEndpoint, movie);
  }
}

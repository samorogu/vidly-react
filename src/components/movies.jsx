import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import ListGroup from "../common/listGroup";
import Pagination from "../common/paginantion";
import SearchBox from "../common/searchBox";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [], //until I use lifehooks, this will be the way I will set the state
    genres: [], //For the purpous of this exercise will get the genres in component did mount
    currentPage: 1, //current page in the pagination
    pageSize: 4, //number of pages displayed
    searchQuery: "",
    selectedGenre: null, //for make it easier to understand what is happening
    sortColumn: { path: "title", order: "asc" } //column sorted
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    //in modern javascript when we have this repetition, we can leave only the movie
    //this.setState({ movies: movies });
    this.setState({ movies });
  };
  //this approach is correct but not quite if we dont want to render the table also
  /*
  moviesCount() {
    const { length: count } = this.state.movies; //object destructuring

    let moviesText = "The total number of movies is ";
    count !== 0 ? (moviesText += count) : (moviesText = "There are no movies ");
    return moviesText;
  }
  */

  handleLike = movie => {
    //console.log("movie liked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    //console.log(path);
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter(m => m.genre._id === selectedGenre._id)
    //     : allMovies;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize); //if count is not 0 we will create an array of movies

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies; //object destructuring
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      genres,
      searchQuery
    } = this.state;
    if (count === 0) return <p>There are no movies</p>;

    //before pagination we need to do filtering

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>There are {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import './App.css';
import MovieList from './components/MovieList';
import Heading from './components/Heading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite';
import MovieNavBar from './components/MovieNavBar';

// const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=550460fc70fbc94efd837a66c7e2ee39";
const API_key = "&api_key=355cc7c07b23b6a880f3659fd0bf9b8e";
const base_url = "https://api.themoviedb.org/3";
let url = base_url + "/movie/popular?" + API_key;
const arr = ["Trending", "Theatre", "Kids", "Drama"];


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [url_set, setUrl] = useState(url);

  //fetching data from API
  useEffect(() => {
    fetch(url_set) //fetch API resource url
      .then((response) => response.json()) //convert it into JSON
      .then(data => {
        console.log("MovieGenre", data);
        setMovies(data.results)
      }); //update state with JSON data
  }, [url_set]);

  //fetching data from API upon search submission
  const searchForMovie = async (e) => {
    e.preventDefault();
    try {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=355cc7c07b23b6a880f3659fd0bf9b8e&query=${searchValue}`;
      fetch(searchUrl)
        .then((response) => response.json())
        .then(data => {
          console.log("Searching", data);
          setMovies(data.results)
        });
      //OR
      // const url = `https://api.themoviedb.org/3/search/movie?api_key=550460fc70fbc94efd837a66c7e2ee39&query=${searchValue}`;
      // const response = await fetch(url);
      // const data = await response.json();
      // console.log("Searching", data);
      // setMovies(data.results);
    }
    catch (e) {
      console.log(e);
    }
  };

  //retrieve saved items from local storage 
  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('movie-app-favourites')); //convert JSON to JavaScript
    setFavourites(movieFavourites);
  }, []);

  //save items to local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-app-favourites', JSON.stringify(items)); //convert JavaScript to JSON
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [];
    newFavouriteList.push(...favourites, movie);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.id !== movie.id);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const getMovieData = (movieType) => {
    if (movieType === "Trending") {
      url = base_url + "/movie/popular?" + API_key;
    }
    if (movieType === "Theatre") {
      url = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
    }
    if (movieType === "Kids") {
      url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_key;
    }
    if (movieType === "Drama") {
      url = base_url + "/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10" + API_key;
    }
    setUrl(url);
  };

  return (
    <>
      {/* NavBar Section */}
      <MovieNavBar
        arr={arr}
        getMovieData={getMovieData}
        SearchBox={SearchBox}
        setSearchValue={setSearchValue}
        searchForMovie={searchForMovie}
      />
      {/* Movies & Favourites Section */}
      <Container fluid className="movie-app">
        <Row className="d-flex align-items-center my-4 row1">
          <Col>
            <Heading heading="Movies" />
          </Col>
        </Row>
        {movies.length > 0 ?
          (
            <Row>
              <Col className="d-flex movie-list-scroll" >
                <MovieList
                  movies={movies} //variable prop
                  AddRemoveFavourite={AddFavourite} //component prop  // Non-destructuring method: favouriteComponent={AddFavourites} //
                  handleFavouriteClick={addFavouriteMovie} //function prop
                />
              </Col>
            </Row>
          )
          :
          (
            <Alert className="d-flex justify-content-center" variant='danger'>No movies found!</Alert>
          )}

        <Row className="d-flex align-items-center my-4">
          <Col>
            <Heading heading="Favourites" />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex movie-list-scroll" >
            <MovieList
              movies={favourites}
              AddRemoveFavourite={RemoveFavourite}
              handleFavouriteClick={removeFavouriteMovie}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;

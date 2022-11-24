import React from 'react';

const API_IMG = "https://image.tmdb.org/t/p/w300/";

const MovieList = (props) => {
    const { AddRemoveFavourite } = props; // destructuring method (= const x = props.AddRemoveFavourite)
    // Non-destructuring method:
    // const FavouriteComponent = props.favouriteComponent;
    // then return <FavouriteComponent /> 

    return (
        <>
            {props.movies.map((movie) => (
                <div className='d-flex justify-content-start m-3 image-container' key={movie.id}>
                    <img src={API_IMG + movie.poster_path} alt="movie"></img>
                    <div className="d-flex align-items-center justify-content-center overlay" onClick={() => props.handleFavouriteClick(movie)}>
                        <AddRemoveFavourite />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;
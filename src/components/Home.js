import React from 'react'

import  { useEffect } from 'react';
import { useState } from 'react';
import MoviesList from './MoviesList';

import MovieHeading from './MovieHeading';
import SearchBox from './SearchBox';


import AddFavourites from './AddFavourites';
import RemoveFavourite from './RemoveFavourite';
import FavouriteMovieDetails from './FavouriteMovieDetails';

const Home = (props) => {
 
    const [movies, setMovies] = useState([]);
    const [AllMovies,setAllMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [text,setText] = useState(false);
    const [localStore, setLocalStorage] = useState([]);
    
    useEffect(() => {
      getMoviesRequest(search);
      getAllMovies();
      const data = localStorage.getItem('favourites');

      //automatically render fromm local storage
      if (data) {
        setLocalStorage(JSON.parse(data));
      }
  
  
  
  
    }, [search]);
    
  

    const getAllMovies = async () => {
              const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
              const response = await fetch(url);
              const responseJson = await response.json();
              if (responseJson.results) {
                setAllMovies(responseJson.results);
              }
            }

  
  
    const getMoviesRequest = async (search) => {
  
      const url = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${search}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson.results) {
        setText(true);
        setMovies(responseJson.results);
      }
  
  
  
  
    }
    const addFavourite = (movie) => {
  
      // add to local storage
      if (localStorage.getItem('favourites')) {
        if (localStorage.getItem('favourites').includes(movie.title)) {
          alert("Movie already in Favourites");
        }
        else {
          const oldFav = JSON.parse(localStorage.getItem('favourites'));
          const newFav = [...oldFav, movie];
          localStorage.setItem('favourites', JSON.stringify(newFav));
          setLocalStorage(newFav);
  
  
        }
      }
      else {
        localStorage.setItem('favourites', JSON.stringify([movie]));
        setLocalStorage([movie]);
  
      }
  
  
  
    }
    const RemoveFav = (movie) => {
      const oldFav = JSON.parse(localStorage.getItem('favourites'));
      const newFav = oldFav.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favourites', JSON.stringify(newFav));
      setLocalStorage(newFav);
    }
  
  
    if (text) {
      return (
        
          <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4 justify-content-between'>
              <MovieHeading MovieHeading="Sankar-Movies" />
              <SearchBox setSearch={setSearch} />
            </div>
            <div className='row'>
              <MoviesList movies={movies} favourites={AddFavourites} handleFav={addFavourite} />
            </div>
            <div className='row d-flex align-items-center mt-4 mb-4 justify-content-between'>
            <MovieHeading MovieHeading="Sankar-Favourites"/>
  
          </div>
            <div className='row'>
            <FavouriteMovieDetails movies={localStore} favourites={RemoveFavourite} handleremove={RemoveFav} />
          </div>
          </div>
         
          
  
  
  
  
  
        
      );
    }
    else {
      return (
        <>
          <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4 justify-content-between'>
              <MovieHeading MovieHeading="Sankar-Movies" />
              <SearchBox setSearch={setSearch} />
            </div>
            <div className='row'>
              <MoviesList movies={AllMovies} favourites={AddFavourites} handleFav={addFavourite} />
            </div>
            <div className='row d-flex align-items-center mt-4 mb-4 justify-content-between'>
            <MovieHeading MovieHeading="Sankar-Favourites" />
  
          </div>
          <div className='row'>
            <FavouriteMovieDetails movies={localStore} favourites={RemoveFavourite} handleremove={RemoveFav} />
          </div>
  
          </div>
        
        
  
        </>
  
      );
    }
  
  
}

export default Home
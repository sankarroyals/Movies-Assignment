import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import MovieHeading from './MovieHeading';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'




const MovieDetails = ({match}) => {
  
  const [MovieDetails , setMovieDetails] = useState([]);

  // used for add and remove icon
  const [present, setPresent] = useState(true);

  const getMoviesRequest = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
    
    const response = await fetch(url);
    const responseJson = await response.json();
 
    if (responseJson) {
      setMovieDetails(responseJson);
      
      
    }
  }
  useEffect( ()=>{
    getMoviesRequest(match.params.id);

    //check wheater the movie is in local storage or not
    if(localStorage.getItem('favourites').includes(match.params.id)){
      setPresent(false);
    }

    
    

  },[ match.params.id] )

  const chageLocalStorage = (movie) => {
    if (localStorage.getItem('favourites')) {
      if (localStorage.getItem('favourites').includes(movie.title)) {
        alert("Movie already in Favourites");
        
        setPresent(false);
      }
      else {
        const oldFav = JSON.parse(localStorage.getItem('favourites'));
        const newFav = [...oldFav, movie];
        localStorage.setItem('favourites', JSON.stringify(newFav));
        setTimeout(() => {
          alert("Movie added to Favourites. Go back to check it out");
          window.location.href = '/';
        }, 1000);
        setPresent(false);
      }
    }
  }

  const deleteLocalStorage = (movie) => {
    const oldFav = JSON.parse(localStorage.getItem('favourites'));
    const newFav = oldFav.filter(fav => fav.id !== movie.id);
    localStorage.setItem('favourites', JSON.stringify(newFav));
    setTimeout(() => {
      alert("Movie removed from Favourites. Go back to check it out");
      
      window.location.href = '/';
    }, 1000);

    setPresent(true);
  }

 

 
  return (
    
   <>
      <div className="col-md-4" style={{color:"black",fontSize:"20px",marginTop:"30px"}}>
      {/* add home icon */}
      <a href='/'>
        <Button variant="primary" style={{marginTop:"20px"}}>
          Home
        </Button>
      </a>
    </div>
  
    <div style={{marginTop:"30px"}}>
        
          
              
      
        <Row>
                <Col md={6}>
                    <Image src={`https://image.tmdb.org/t/p/w1280/${MovieDetails.backdrop_path}`} thumbnail />
                    
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <strong style={{
                                fontSize:"20px",
                                fontWeight:"bold"

                            }}>{MovieDetails.title}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <strong style={{
                                fontSize:"20px",
                                fontWeight:"bold"

                            }}>Budget :{MovieDetails.budget}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong
                            style={{
                                fontSize:"20px",
                                fontWeight:"bold"

                            }}
                            > Revenue :${MovieDetails.revenue}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong
                            style={{
                                fontSize:"20px",
                                fontWeight:"bold"

                            }}
                            
                            >{MovieDetails.overview}</strong>
                        </ListGroup.Item>
                       
                    </ListGroup>
                    {present ?
                      <ListGroup>
                      
                      <Button variant="primary" className="p-4"
                      onClick={()=>{
                        chageLocalStorage(MovieDetails);
                      }}
                      >
                            Add To Favourites
                      </Button>
                    

                    </ListGroup>
                    :
                    <ListGroup>
                      
                      <Button variant="primary" className="p-4"
                      onClick={()=>{
                        deleteLocalStorage(MovieDetails);
                      }}
                      >
                              Remove From Favourites
                      </Button>
                    
                    </ListGroup>
                    }
                </Col>
                
            </Row>
    </div>
   </>
  )
}

export default MovieDetails
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'



const FavouriteMovieDetails = (props) => {
  const Favourites = props.favourites;
  return (
   <>
    
    {props.movies.map((movie) => (
                <div className="image-container d-flex justify-content-start m-3 "
                key={movie.id}
                >
                
                
                    
                       <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} alt={movie.title} className="image" 
                            width={500} height={500} style={{objectFit:"cover"}}

                       />
                
                
                        <div className="overlay d-flex align-items-center justify-content-center text-align-center">
                            <div className="text" style={{color:"white",textAlign:"center" }}>
                                <h3 style={{color:"white"}}>{movie.title}</h3>
                                <p style={{textAlign:"center"}}>{movie.overview}</p>
                                <div className="d-flex justify-content-center" 
                                onClick={()=>props.handleremove(movie)} 
                                style={{cursor:"pointer"}}>
                                
                                    <Favourites />
                                </div>
                                {/* add button */}
                                <a 
                                  href={`/details/${movie.id}` 
                                  
                                  }
                                >
                                    <button className="btn btn-primary"
                                    style={{marginTop:"10px"}}
                                    >
                                        Show Details
                                    </button>
                                </a>
                                
                                
                        </div>
                        </div>
                    
                </div>
            )
            )}
    
   </>
  )
}

export default FavouriteMovieDetails
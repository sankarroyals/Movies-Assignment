import './App.css';
import React from 'react';


import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import MovieDetails from './components/MovieDetails';

import Home from './components/Home';






function App() {
  
  return(
   <>
      
      <Router>
        
        
        
          <Switch>
          <Route path="/" exact component={Home} />
            <Route path="/details/:id" component={MovieDetails} />
          </Switch>
         
        
       

    </Router>
   </>
  )

}
export default App;
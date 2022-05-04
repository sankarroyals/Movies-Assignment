import React from 'react'
import { Link } from 'react-router-dom';

const SearchBox = (props) => {
  return (
   <>
      <div>
      
      </div>
      <div className='col col-sm-4'>
         
         <input type='text' className='form-control' placeholder='Search...' 
         style={{backgroundColor:"none" ,outline:"none", border:"1px solid black" , borderRadius:"0px" , padding:"10px" , fontSize:"20px", fontWeight:"bold"}}
         onChange={(e)=>{
             props.setSearch(e.target.value);
            
         }}
         />
     </div>
   </>
  )
}

export default SearchBox
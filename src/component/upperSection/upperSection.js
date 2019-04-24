import React from 'react';
import './upperSection.css';



const upperSection = (props) => {  
return ( 
    <section className="upperSection">
        <form onSubmit={props.extractDataFromApi}>
            <div className="upperSectionGrid">
           
                <select  className="dropdown" id="searchType">
                    <option className="dropdown-content" value="Search By">Search By</option>
                    <option className="dropdown-content" value="City Name">City Name</option>
                    <option className="dropdown-content" value="City Zip">City Zip</option>
                </select>    
                 
                <input type="text" id="searchInput"></input>
            
                <button className="searchButton" type="submit">  <i className="fa fa-search"></i>  </button>
            </div>
        </form>
    </section>
    
    );
         
}

export default upperSection;
import React from 'react';

const weatherPanel= (props) =>{
  
const name =(e)=>
{
    props.day(e.currentTarget.getAttribute('data-value'));
}
   
return ( 
    
    <div data-value={ props.dayName} onClick={name}>
            <p className="weatherPanelHeading" >     { props.dayName}    </p>

            <div className="middleImgDiv">  <img src={ props.icon} alt="Today Weather"/>
            </div>

            <label className="min tempLabel">     {Math.floor( props.minTemp)} º </label>
            
            <label className="tempLabel"> {Math.floor( props.maxTemp)} º  </label>
    </div>
    
);  
}
export default weatherPanel;
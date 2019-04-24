import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  
    render() { 
        return ( 
            <section className="Header">
                <p className="text">WEATHER FORECAST (5 DAYS)</p>
            </section>
         );
    }
}
 
export default Header;
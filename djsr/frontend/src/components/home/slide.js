import React from 'react';
import css from './homeStyle.css';

import hero from './img/hero.jpg';
function Slide_home(props) {
    return (
        <div>
            <div>
                <img className="hero" src={hero} alt="hero" />
                    <div className="hero-text-box hero-txt">
                        <h1 className="text-uppercase display-1 font-weight-bold elegantshd h1text">get attendance</h1>
                            <p className="text-uppercase subtitle">your face will be your attedance</p>
                            
		            </div>
                </div>
           
        </div>
    )
}


export default Slide_home;
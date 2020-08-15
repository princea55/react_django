import React from 'react';
import css from './homeStyle.css';

import hero from './img/hero.jpg';
function Slide_home(props) {
    return (
        <div>
            <div>
                <img className="hero" src={hero} alt="hero" />
                <div className="hero-text-box">
                    <h1 className="text-capitalize">Website Name</h1>
                        <a className="btn btn-full" href="#" title="">Subtitle</a>
                        <a className="btn btn-ghost" href="#" title="">Other text</a>
		            </div>
                </div>
           
        </div>
    )
}


export default Slide_home;
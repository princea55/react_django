import React, { Component } from 'react'
import Slide_home from './slide';
import Service from './services';
// import Loader from 'react-loader-spinner'
import Testimonials from './testimonials';
import HomeFooter from './homeFooter';
import OurTeam from './ourTeam';
import Faq from './Faq';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
export default class Home extends Component {
    render() {
        return (
            <div>
                
                <Slide_home />

                <Service />

                <Faq />

                <Testimonials />

                <OurTeam />

                <HomeFooter />


            </div>

        )
    }
}

import React, { Component } from 'react'
import Slide_home from './slide';
import Service from './services';

import Testimonials from './testimonials';
import HomeFooter from './homeFooter';
import OurTeam from './ourTeam';
import Faq from './Faq';

export default class Home extends Component {
    render() {
        return (
            <div >

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
